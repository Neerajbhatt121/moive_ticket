import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router();



router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),

  (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      message: "Login successful",
      token: token,
      user: {
        name: req.user.name,
        email: req.user.email,
        profilePic: req.user.profilePic,
      },
    });
  }
);


// Register || Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController)


export default router;
