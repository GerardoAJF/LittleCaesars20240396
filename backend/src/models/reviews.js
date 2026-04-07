import {Schema, model} from "mongoose"

const reviewSchema = new Schema({
    idEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employees"
    },
    idPizza: {
        type: Schema.Types.ObjectId,
        ref: "Pizzas"
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Reviews", reviewSchema);