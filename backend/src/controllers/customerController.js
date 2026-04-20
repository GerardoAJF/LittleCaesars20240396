const customersController = {}

import customersModel from "../models/customers.js"

// SELECT
customersController.getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.find();
        return res.status(200).json(customers);

    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

// UPDATE
customersController.updateCustomer = async (req, res) => {
    try {
        let {name, lastName, birthdate, email, password, isVerified, loginAttemps, timeOut} = req.body;
        
        //Validaciones
        //Sanitizar
        name = name?.trim();
        email = email?.trim();

        // Validar campos required
        if(!name || !email || !password) {
            return res.status(400).json({message: "Fields required"})
        }

        // Longitud de carácteres
        if (name.length < 3 || name.length > 15) {
            return res.status(400).json({message: "Insert a valid name"})
        }

        // Actualizamos en la base de datos
        const customerUpdated = await customersModel.findByIdAndUpdate(req.params.id, {name, lastName, birthdate, email, password, isVerified, loginAttemps, timeOut}, {new: true})

        if (!customerUpdated) {
            return res.status(404).json({message: "Customer not found"})
        }

        return res.status(200).json({message: "Customer updated"})

    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

// DELETE
customersController.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customersModel.findByIdAndDelete(req.params.id);

        if (!deletedCustomer) {
            return res.status(404).json({message: "Customer not found"})
        }

        return res.status(200).json({message: "Customer deleted"})

    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export default customersController;