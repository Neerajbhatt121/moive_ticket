import mongoose from 'mongoose';

const TicketSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId, ref: "user"
    },
    showId: {
        type: mongoose.Schema.ObjectId, ref: "showInstance"
    },
    seatNumbers: {
        type: [String]
    },
    bookedAt: new Date()
});

export default mongoose.Schema("Ticket", TicketSchema)