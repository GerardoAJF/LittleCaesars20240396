import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

import {config} from "../../config.js"

import customerModel from "../models/customers.js"

// Array de funciones
const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {
        // #1- Solicitar
        const {email, password} = req.body;

        // Verificar si el correo existe en la base de datos
        const foundCustomer = await customerModel.findOne({email})

        // Si no existe el correo
        if (!foundCustomer) {
            return res.status(400).json({message: "Customer not found"})
        }

        // Verificamos que la cuenta no esté bloqueada
        if (foundCustomer.timeOut && foundCustomer.timeOut > Date.now()) {
            return res.status(403).json({message: "Blocked account"})
        }

        // Validar la contraseña
        const isMatch = await bcrypt.compare(password, foundCustomer.password)

        // Si la contraseña está incorrecta
        if (!isMatch){
            // Sumar 1 a la cantidad de intentos fallidos
            foundCustomer.loginAttemps = (foundCustomer.loginAttemps || 0) + 1

            if (foundCustomer.loginAttemps >= 5) {
                foundCustomer.timeOut = Date.now() + 5 * 60 * 1000;
                foundCustomer.loginAttemps = 0;

                await foundCustomer.save();

                return res.status(403).json({message: "Blocked account by many failed attempts"})
            }

            await foundCustomer.save();

            return res.status(401).json({message: "Wrong password"})
        }

        // Reseteamos intentos si el login es correcto
        foundCustomer.loginAttemps = 0;
        foundCustomer.timeOut = null;

        // Generar el token
        const token = jsonwebtoken.sign(
            // #1- ¿Qué vamos a guardar?
            {id: foundCustomer._id, userType: "customer"},

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

export default loginCustomerController;
