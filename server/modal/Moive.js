import mongoose from 'mongoose';

const moiveSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    posterURL: {
       type: String
    },
    genre: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export default mongoose.model("movie", moiveSchema);