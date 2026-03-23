import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/litlleCaesarDB")

const connection = mongoose.connection

connection.once("open", () => console.log("DB is connected") )
connection.once("disconnected", () => console.log("DB is disconnected"))
connection.once("error", (error) => console.log("Error found " + error))
