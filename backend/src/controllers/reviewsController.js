const reviewsController = {}

import reviewsModel from "../models/reviews.js"

reviewsController.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find();
        return res.status(200).json(reviews)
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({"message": "Internal server error"})
    }
}

reviewsController.insertReview = async (req, res) => {
    try {
        let {idEmployee, idPizza, rating, comment} = req.body;

        //Sanitizar
        comment = comment?.trim();

        // Validaciones
        if (!idEmployee || !idPizza || !rating) {
            return res.status(400).json({"message": "Fields required"})
        }

        if (Number(rating) > 5 || Number(rating) < 1) {
            return res.status(400).json({"message": "Invalid rating"})
        }

        if (comment.length < 5 || comment.length > 200) {
            return res.status(400).json({"message": "Invalid comment"})
        }

        const newReview = new reviewsModel({idEmployee, idPizza, rating, comment})
        await newReview.save()

        return res.status(200).json({"message": "Review saved"})
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({"message": "Internal server error"})
    }
}

reviewsController.deleteReview = async (req, res) => {
    try {
        const deleteReview = await reviewsModel.findByIdAndDelete(req.params.id);

        if (!deleteReview) {
            return res.status(400).json({"message": "Review not found"})
        }
        return res.status(200).json({"message": "Review deleted"})

    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({"message": "Internal server error"})
    }
}

reviewsController.updateReview = async (req, res) => {
    try {
        let {idEmployee, idPizza, rating, comment} = req.body;

        //Sanitizar
        comment = comment?.trim();

        // Validaciones
        if (!idEmployee || !idPizza || !rating) {
            return res.status(400).json({"message": "Fields required"})
        }

        if (Number(rating) > 5 || Number(rating) < 1) {
            return res.status(400).json({"message": "Invalid rating"})
        }

        if (comment.length < 5 || comment.length > 200) {
            return res.status(400).json({"message": "Invalid comment"})
        }

        const updateReview = await reviewsModel.findByIdAndUpdate(req.params.id, {idEmployee, idPizza, rating, comment}, {new: true})
        if (!updateReview) {
            return res.status(400).json({"message": "Review not found"})
        }

        return res.status(200).json({"message": "Review updated"})
    } catch (error) {
        console.error("error: " + error)
        return res.status(500).json({"message": "Internal server error"})
    }
}
export default reviewsController;