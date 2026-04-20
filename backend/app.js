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

import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())

// Para que la Api acepte Json
app.use(express.json())

app.use("/api/pizzas", pizzasRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer", registerCustomersRoutes)
app.use("/api/admins", adminsRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/loginCustomers", loginCustomerRoutes)
app.use("/api/logout", logoutRoute)

export default app
