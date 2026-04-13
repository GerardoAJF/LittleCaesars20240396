import express from "express"
import pizzasRoutes from "./src/routes/pizza.js"
import branchesRoutes from "./src/routes/branch.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"
import customersRoutes from "./src/routes/customer.js"

const app = express()

// Para que la Api acepte Json
app.use(express.json())

app.use("/api/pizzas", pizzasRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer")

export default app
