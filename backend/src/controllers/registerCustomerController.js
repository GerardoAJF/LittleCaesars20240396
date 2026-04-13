import nodemailer from "nodemailer" // Enviar correos
import crypto from "crypto" // Generar código
import jsonwebtoken from "jsonwebtoken" // Token
import bcryptjs from "bcryptjs" // Encriptar contraseña

import customersModel from "../models/customers.js"

import {config} from "../../config.js"

// array de funciones
const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
    try {
        // #1 - Solicitar los datos a guardar
        const {name, lastName, birthdate, email, password, isVerified, loginAttempts, timeOut} = req.body;

        // #2 - Validar si el correo existe en la base de datos
        const existsCustomer = await customersModel.findOne({email})
        if(existsCustomer) {
            return res.status(400).json({message: "Customer already exists"})
        }

        // Encriptar la contraseña
        const passwordHashed = await bcryptjs.hash(password, 10)

        // Generar un código aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        // Guardamos todo en un token
        const token = jsonwebtoken.sign(
            // #1 - ¿Qué vamos a guardar?
            {randomCode, name, lastName, birthdate, email, password: passwordHashed, isVerified, loginAttempts, timeOut},
            // #2 - Secret Key
            config.JWT.secret,
            // #3 - ¿Cúando expira?
            {expiresIn: "15m"}
        )
        // Guardamos el token en una cookie
        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

    } catch (error) {
        
    }
}


