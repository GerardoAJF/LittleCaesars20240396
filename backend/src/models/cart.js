/*
    customerId
    products:
        productID
        quantity
        subtotal
    total
    status
*/

import {Schema, model} from "mongoose"

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customers"
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Pizzas"
            },
            quantity: {type: Number},
            subtotal: {type: Number}
        }
    ],
    total: {type: Number},
    status: {type: String}
}, {
    timestamps: true, 
    strict: false
})

export default model("Cart", cartSchema)

