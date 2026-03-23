const branchesController = {}

import branchesModel from "../models/branches.js"

// SELECT
branchesController.getBranches = async (req, res) => {
    const branches = await branchesModel.find()
    res.json(branches)
}

// INSERT 
branchesController.insertBranches = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
    const newBranch = new branchesModel({name, address, schedule, isActive})
    await newBranch.save();
    res.json({message: "branch saved"})
}

// DELETE
branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id)
    res.json({message: "branch deleted"})
}

// UPDATE
branchesController.updateBranches = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
    const newBranch = await branchesModel.findByIdAndUpdate(req.params.id, {
        name, 
        address, 
        schedule, 
        isActive}, {returnDocument: "after"})
    res.json({message: "branch updated", new: newBranch})
}

export default branchesController;