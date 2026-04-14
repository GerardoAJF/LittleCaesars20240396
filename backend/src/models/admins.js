import {Schema, model} from "mongoose"

const adminsSchema = new Schema({
    name : {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean}
}, {
    timestamps: true,
    strict: true
})

export default model("Admins", adminsSchema);
