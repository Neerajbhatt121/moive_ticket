import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        default: null
    },

    googleId: {
        type: String,
        default: null
    }, 

    provider: {
        type:String,
        enum: ["local", "google"],
        default: "local"
    },

    profilePic: {
        type: String
    },
    token: {
        type: String,
        default: null,
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

export default mongoose.model("user", userSchema);