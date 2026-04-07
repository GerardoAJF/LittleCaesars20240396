import express from "express"
import employeesController from "../controllers/employeesController.js"

const router = express.Router()

router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees)

router.route("/:id")
.delete(employeesController.deleteEmployee)
.put(employeesController.updateEmployee)

export default router