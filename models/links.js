import mongoose from 'mongoose';


const linkSchema = new mongoose.Schema({
    originalUrl: String,
    clicks: [
        {
            insertedAt:Date,
            ipAddress: String,
            targetParamValue: String
        }
    ],
    targetParamName: String,
    targetValues: [
        {
            name: String,
            value: String
        }
    ]
})

export default mongoose.model("links", linkSchema);