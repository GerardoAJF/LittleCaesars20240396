const employeesController = {}

import employeesModel from "../models/employees.js"

// SELECT
employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await employeesModel.find();
        return res.status(200).json(employees);
    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({"message": "Internal server error"});
    }
}

// INSERT 
employeesController.insertEmployees = async (req, res) => {
    try {
        let {name, lastName, DUI, birthDate, email, password, isVerified, status, idBranches} = req.body;
        
        // Validaciones

        // Sanitizar - Eliminar los espacios al final
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({"message": "Fields required"})
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({"message": "Name must be real"})
        }

        if (birthDate > new Date || birthDate < new Date("1901-01-01")) {
            return res.status(400).json({"message": "Invalid date"})
        }

        if (DUI.length > 10 || DUI.length < 9) {
            return res.status(400).json({"message": "Invalid DUI"})
        }

        const newEmployee = new employeesModel({name, lastName, DUI, birthDate, email, password, isVerified, status, idBranches});
        await newEmployee.save();

        return res.status(201).json({"message": "Employee saved"})
    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({"message": "Internal server error"})
    }
}

// DELETE
employeesController.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id)

        if (!deleteEmployee) {
            return res.status(404).json({"message": "Employee not found"})
        }

        return res.status(200).json({"message": "Employee deleted"})

    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({"message": "Internal server error"});
    }
}

// UPDATE
employeesController.updateEmployee = async (req, res) => {
    try {
        let {name, lastName, DUI, birthDate, email, password, isVerified, status, idBranches} = req.body;

        // Validaciones

        // Sanitizar - Eliminar los espacios al final
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({"message": "Field required"})
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({"message": "Name must be real"})
        }

        if (birthDate > new Date || birthDate < new Date("1901-01-01")) {
            return res.status(400).json({"message": "Invalid date"})
        }

        if (DUI.length > 10 || DUI.length < 9) {
            return res.status(400).json({"message": "Invalid DUI"})
        }

        const employeeUpdated = await employeesModel.findByIdAndUpdate(req.params.id, {name, lastName, DUI, birthDate, email, password, isVerified, status, idBranches}, {new: true})
    
        if (!employeeUpdated) {
            return res.status(404).json({"message": "Employee not found"})

        }
        return res.status(200).json({"message": "Employee updated"})
    } catch (error) {
        console.error("error: " + error);
        return res.status(500).json({"message": "Internal server error"});
    }
}

export default employeesController;