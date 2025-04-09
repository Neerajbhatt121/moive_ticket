import { JsonWebTokenError } from "jsonwebtoken";
import userSchema from "../modal/User"


export const registerController = (req, res) => {
    try {
        const {name, email, password, googleId, provider, profilePic} = req.body();

        if(googleId){
            return res.send({message: "Please login through google"});
        }
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }

        

    } catch (error) {
        console.log("Something wrong while SignUp")
    }
}