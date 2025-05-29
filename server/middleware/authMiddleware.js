import jwt from "jsonwebtoken";
import userModal from '../modal/User.js';

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader",authHeader)
    if (!authHeader ) {  // || !authHeader.startsWith("Bearer ")
      return res.status(401).send({
        success: false,
        message: "Token missing or invalid format"
      });
    }


    const token = authHeader;   // .split(" ")[1]  using while postman
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
        if(user.role == process.env.ADMIN_ROLE){
          console.log("here")
          return next();
        } else {
            return res.status(404).send({
              message1: process.env.ADMIN_ROLE,
              success: false,
              message: "Unauthorised Access admin"
          })
        }
    } catch (error) {
        console.log("Catch me error h",error)
    }
}