
import mongoose from "mongoose"
import linksSchema from './links.js'

const usersSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    links: [{type: mongoose.Schema.Types.ObjectId, ref: 'links'}]
})

export default mongoose.model("users", usersSchema);
