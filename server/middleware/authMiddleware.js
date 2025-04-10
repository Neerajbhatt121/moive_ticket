import jwt from "jsonwebtoken";
import userModal from '../modal/User.js';

export const requireSignIn = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.send("please login to acces the page");
    }
    const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
    )
    req.user = decode;
    next();
  } catch (error) {
    console.log("error while checking the error", error);
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