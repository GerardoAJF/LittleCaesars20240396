import jsonwebtoken from "jsonwebtoken"
import { config } from "../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {authCookie} = req.cookies;

            if (!authCookie) {
                return res.status(404).json({message: "No cookie found"})
            }

            // Extraer toda la información de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret)

            // Verificar si el rol que tiene la cookie puede pasar o no
            if (!allowedTypes.includes(decoded.userType)) {
                return res.status(404).json({message: "Access denied"})
            }

            next()
        } catch (error) {
            console.log("error: " + error)
            res.status(500).json({message: "Internal server error"})
        }
    }
}