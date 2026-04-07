import express from "express"
import reviewsController from "../controllers/reviewsController.js"

const router = express.Router();

router.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.insertReview)

router.route("/:id")
.delete(reviewsController.deleteReview)
.put(reviewsController.updateReview)

export default router;