import express from "express"
import pizzasRoutes from "./src/routes/pizza.js"
import branchesRoutes from "./src/routes/branch.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"
import customersRoutes from "./src/routes/customer.js"
import registerCustomersRoutes from "./src/routes/registerCostumer.js"
import adminsRoutes from "./src/routes/admins.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import logoutRoute from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import providerRoutes from "./src/routes/provider.js"
import cartRoutes from "./src/routes/cart.js"
import wompiRoutes from "./src/routes/wompi.js"
import deliveriesRputes from "./src/routes/delivery.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import { validateAuthCookie } from "./src/middlewares/authMiddleware.js"

import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // permitir el envío de cookies y credenciales
    credentials: true
}))

app.use(cookieParser())

// Para que la Api acepte Json
app.use(express.json())

app.use("/api/pizzas", pizzasRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer", registerCustomersRoutes)
app.use("/api/admins", adminsRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/loginCustomers", loginCustomerRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)
app.use("/api/logout", logoutRoute)
app.use("/api/recoveryPassword", recoveryPasswordRoutes)
app.use("/api/providers", providerRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveries", deliveriesRputes)

export default app
