import {Schema, model} from "mongoose"

const providerSchema = new Schema({
    name: {type: String},
    phone: {type: String},
    image: {type: String},
    public_id: {type: String}
}, {
    strict: false,
    timestamps: true
})

export default model("Providers", providerSchema);