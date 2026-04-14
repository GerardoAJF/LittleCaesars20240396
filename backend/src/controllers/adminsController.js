const adminsController = {}

import adminsModel from "../models/admins.js"

adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find();
        return res.status(200).json(admins)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default adminsController;