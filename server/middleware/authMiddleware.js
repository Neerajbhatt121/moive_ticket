import jwt from "jsonwebtoken";
import userModal from '../modal/User.js';

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Token missing or invalid format");
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error while checking the error", error);
    return res.status(404).send({
      success: false,
      message: "Invalid token"
    })
  }
};


//  Admin Middleware
export const isAdmin = async (req,res, next) => {
    try {
        const user = await userModal.findById(req.user._id)
        if(user.role !== process.env.ADMIN_ROLE){
            return res.status(401).send({
                success: false,
                message: "Unauthorised Access"
            })
        } else {
            return next();
        }
    } catch (error) {
        console.log(error)
    }
}