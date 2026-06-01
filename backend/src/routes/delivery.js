import express from "express"
import deliveriesController from "../controllers/deliveriesController.js"
import upload from "../utils/CloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(deliveriesController.getAllDeliveries)
.post(upload.single("image"), deliveriesController.insertDeliveries)

router.route("/:id")
.delete(deliveriesController.deleteDeliveries)
.put(upload.single("image"), deliveriesController.updateDeliveries)

export default router