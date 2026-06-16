import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

import {config} from "../../config.js"

import adminModel from "../models/admins.js"

// Array de funciones
const loginAdminController = {};

loginAdminController.login = async (req, res) => {
    try {
        // #1- Solicitar
        const {email, password} = req.body;

        // Verificar si el correo existe en la base de datos
        const foundEmail = await adminModel.findOne({email})

        // Si no existe el correo
        if (!foundEmail) {
            return res.status(400).json({message: "Admin not found"})
        }

        // Verificamos que la cuenta no esté bloqueada
        if (foundEmail.timeOut && foundEmail.timeOut > Date.now()) {
            return res.status(403).json({message: "Blocked account"})
        }

        // Validar la contraseña
        const isMatch = await bcrypt.compare(password, foundEmail.password)

        // Si la contraseña está incorrecta
        if (!isMatch){
            // Sumar 1 a la cantidad de intentos fallidos
            foundEmail.loginAttemps = (foundEmail.loginAttemps || 0) + 1

            if (foundEmail.loginAttemps >= 5) {
                foundEmail.timeOut = Date.now() + 5 * 60 * 1000;
                foundEmail.loginAttemps = 0;

                await foundEmail.save();

                return res.status(403).json({message: "Blocked account by many failed attempts"})
            }

            await foundEmail.save();

            return res.status(401).json({message: "Wrong password"})
        }

        // Reseteamos intentos si el login es correcto
        foundEmail.loginAttemps = 0;
        foundEmail.timeOut = null;

        // Generar el token
        const token = jsonwebtoken.sign(
            // #1- ¿Qué vamos a guardar?
            {id: foundEmail._id, userType: "admin"},

            // #2- Secret Key
            config.JWT.secret,

            // #3- Cuando expira
            {expiresIn: "30d"}
        )

        // El token lo guardamos en una cookie
        res.cookie("authCookie", token);

        return res.status(200).json({message: "Login success"})

    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default loginAdminController;
