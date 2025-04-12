import mongoose from "mongoose";

const showInstance = new mongoose.Schema({
    moive: {
        type: String,
        ref: 'moive'
    },
    date:{
        type: Date,
        requrired: true
    },
    slotTime: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'night'],
        required: true
    },
    totalSeats: {
        type: Number,
        default: 50
    },
    bookedSeats: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

export default mongoose.model("showInstance", showInstance);