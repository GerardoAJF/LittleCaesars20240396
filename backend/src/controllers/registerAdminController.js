import nodemailer from "nodemailer" // Enviar correos
import crypto from "crypto" // Generar código
import jsonwebtoken from "jsonwebtoken" // Token
import bcryptjs from "bcryptjs" // Encriptar contraseña

import adminModel from "../models/admins.js"

import {config} from "../../config.js"

const registerAdminController = {};

registerAdminController.register = async (req, res) => {
    try {
        const {name, lastName, email, password} = req.body;

        // Confirmamos correo no repetido
        const existsAdmin = await adminModel.findOne({email})
        if (existsAdmin) {
            return res.status(400).json({message: "Admin already exists"})
        }

        const hashedPassword =  await bcryptjs.hash(password, 10)
        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
           {randomCode, name, lastName, email, password: hashedPassword},
           config.JWT.secret,
           {"expiresIn": "15m"} 
        )

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000 })
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Código de verificación",
            text: "Su código de verificación para poder registrarse en el sistema es: " + randomCode
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: "Error sending mail"})
            }
            return res.status(200).json({message: "Email send"})
        })
    }
    catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
} 

registerAdminController.verifyCode = async (req, res) => {
    try {
        const {verificationCode} = req.body;

        const decoded = jsonwebtoken.verify(req.cookies.registrationCookie, config.JWT.secret)

        const {randomCode, name, lastName, email, password} = decoded

        if (verificationCode !== randomCode) {
            return res.status(400).json({message: "Invalid random code"})
        }

        const newAdmin = adminModel({
            name, lastName, email, password, isVerified: true
        })
        await newAdmin.save()

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Admin registered"})
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
     
    }
}

export default registerAdminController;