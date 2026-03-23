const pizzasController = {}

import pizzasModel from "../models/pizzas.js"

// Select 
pizzasController.getPizzas = async (req, res) => {
    const pizzas = await pizzasModel.find();
    res.json(pizzas)
}

// Insert
pizzasController.insertPizza = async (req, res) => {
    const {name, description, price, stock} = req.body
    const newPizza = new pizzasModel({name, description, price, stock})
    await newPizza.save()
    res.json({message: "product saved"})
}

// Delete
pizzasController.deletePizza = async (req, res) => {
    await pizzasModel.findByIdAndDelete(req.params.id)
    res.json({message: "pizza deleted"})
}

// Update
pizzasController.updatePizza = async (req, res) => {
    const {name, description, price, stock} = req.body
    const newPizza = await pizzasModel.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        price, 
        stock}, {returnDocument: "after"})

    res.json({message: "pizza updated", newPizza: newPizza})
}

export default pizzasController
