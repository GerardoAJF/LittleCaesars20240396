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

// SELECT por id (obtener solo un registro)
pizzasController.getPizzaById = async (req, res) => {
    try {
        const pizza = await pizzasModel.findById(req.params.id)

        if (!pizza) {
            return res.status(404).json({message: "Pizza not found"})
        }

        return res.status(200).json(pizza)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// Obtener pizzas con stock bajo
pizzasController.getLowStock = async (req, res) => {
    try {
        const pizzas = await pizzasModel.find({stock: {$lt: 5}})

        if (!pizzas) {
            return res.status(404).json({message: "There aren't pizzas with low stock"})
        }

        return res.status(200).json(pizzas)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// SELECT con filtros
pizzasController.getPizzaByPriceRange = async (req, res) => {
    try {
        const {min, max} = req.body

        const pizzas = await pizzasModel.find({
            price: {$gte: min, $lte: max}
        })

        if (!pizzas) {
            return res.status(404).json({message: "There aren't pizzas in that price range"})
        }
        
        return res.status(200).json(pizzas)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// Contar cuantos elementos hay en una colección
pizzasController.countPizzas = async (req, res) => {
    try {
        const count = await pizzasModel.countDocuments()
        return res.status(200).json(count)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// Buscar por nombre
pizzasController.searchByName = async (req, res) => {
    try {
        // Solicito los datos
        const {name} = req.body;

        const pizzas = await pizzasModel.find({
            name: { $regex: `${name}`, $options: "i"}
        })

        if (!pizzas) {
            return res.status(404).json({message: "Pizzas with this name not found"})
        }

        return res.status(200).json(pizzas)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export default pizzasController
