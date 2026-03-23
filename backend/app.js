import express from "express"
import pizzaRoutes from "./src/routes/pizza.js"

const app = express()

// Para que la Api acepte Json
app.use(express.json())

app.use("/api/pizzas", pizzaRoutes)

export default app
