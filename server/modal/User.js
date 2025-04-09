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
        enum: ["local", "google"],
        default: "local"
    },

    profilePic: {
        type: String
    }
});

export default mongoose.model("user", userSchema);