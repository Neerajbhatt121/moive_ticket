import jwt from "jsonwebtoken";
import { comparedPassword, hashedpassword } from "../helper/authHelper.js";
import userModal from "../modal/User.js";

// Controller for Registration
export const registerController = async (req, res) => {
  try {
    const { name, email, password, googleId } = req.body;
    console.log(req.body);
    if (googleId) {
      return res.send({ message: "Please login through google" });
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

    const existingUser = await userModal.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        sucess: true,
        message: "Already exist user",
      });
    }

    const hashedPassword = await hashedpassword(password);

    const newUser = await new userModal({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      sucess: true,
      message: "Account created sucessfully",
      newUser,
    });
  } catch (error) {
    console.log("Something wrong while SignUp", error);
    return res.status(500).send({
      succuss: false,
      message: "Somthing went wrong while creating account",
      error,
    });
  }
};

// Controller for login manually

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user exist or not
    const user = await userModal.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not valid",
      })
    }

    if(user.googleId){
        return res.status(404).send({
            success:false,
            message:"Please use google to login"
        })
    }

    // check is email or password correct or not
    const match = await comparedPassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invlid email or password",
      });
    }

    // token Generation
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      succuss: false,
      message: "No Account found",
      error,
    });
  }
};
