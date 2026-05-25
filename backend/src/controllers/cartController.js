import cartModel from "../models/cart.js"
import pizzasModel from "../models/pizzas.js"

// Array de funciones
const cartController = {}

// SELECT
cartController.getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name")

        return res.status(200).json(carts)
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// INSERT
cartController.insertCart = async (req, res) => {
    try {
        
        // #1 - Solicito los datos
        const {customerId, products, status} = req.body;

        // Variable para guardar el total:
        let total = 0;

        // Arreglo de productos
        let newProducts = []

        for (const element of products) {
            // Buscar el producto en la base de datos
            const pizzaFound = await pizzasModel.findById(element.productId)

            // Calcular el subtotal
            const subtotal = pizzaFound.price * element.quantity;

            // Calcular el total
            total += subtotal

            // Guardamos el producto junto 
            newProducts.push({
                productId: element.productId,
                quantity: element.quantity,
                subtotal: subtotal
            })
        }

        // Llenamos el modelo
        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total,
            status
        })

        await newCart.save()

        return res.status(200).json({message: "Cart created"})

    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// UPDATE
cartController.updateCart = async (req, res) => {
    try {
        const {customerId, products, status} = req.body;

        let total = 0;

        let newProducts = []

        // Recorrer todos los productos
        for (const element of products) {
            // Buscar el producto
            const pizzaFound = await pizzasModel.findById(element.productId)

            // Calcular el subtotal
            const subtotal = pizzaFound.price * element.quantity
            
            // Sumar total
            total += subtotal

            // Guardamos el producto junto con su subtotal
            newProducts.push({
                productId: element.productId,
                quantity: element.quantity,
                subtotal: subtotal
            })
        }

        // Actualizamos el carrito en la base de datos
        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                customerId,
                products: newProducts,
                total,
                status
            }, {
                returnDocument: "after"
            }
        )

        return res.status(200).json({message: "Cart updated"})

    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// DELETE 
cartController.deleteCart = async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Cart deleted"})

    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default cartController;