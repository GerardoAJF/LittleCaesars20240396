import {Schema, model} from "mongoose"

const employeesSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    DUI : {
        type: String
    },
    birthDate: {
        type: Date
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status : {
        type: String
    },
    idBranches : {
        type: Schema.Types.ObjectId,
        ref: "Branches"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Employees", employeesSchema)