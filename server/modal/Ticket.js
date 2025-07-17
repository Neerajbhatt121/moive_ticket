import mongoose from 'mongoose';

const TicketSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId, ref: "User",
        required: true
    },
    showId: {
        type: mongoose.Schema.ObjectId, ref: "showInstance"
    },
    seatNumbers: {
        type: [String]
    },
    price:{
        type: Number,
        required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Ticket", TicketSchema)