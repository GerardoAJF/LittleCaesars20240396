import express from "express"
import pizzasController from "../controllers/pizzasController.js"

const router = express.Router()

router.route("/")
.get(pizzasController.getPizzas)
.post(pizzasController.insertPizza)

router.route("/low-stock")
.get(pizzasController.getLowStock)

router.route("/price-range")
.post(pizzasController.getPizzaByPriceRange)

router.route("/count")
.get(pizzasController.countPizzas)

router.route("/search")
.post(pizzasController.searchByName)

router.route("/:id")
.put(pizzasController.updatePizza)
.delete(pizzasController.deletePizza)
.get(pizzasController.getPizzaById)

export default router
