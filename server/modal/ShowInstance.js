import mongoose from "mongoose";

export const seatSchema = new mongoose.Schema({
    seatNumber: String,     // Seat Number like that :- A1, A2, B1
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    bookedAt: { type: Date, default: null }
  });


const showInstance = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true
    },
    date:{
        type: Date,
        required: true
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
        type: [seatSchema],
    },
    price:{
        type: Number,
        default: 500
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
},{timestamps: true})

export default mongoose.model("showInstance", showInstance);