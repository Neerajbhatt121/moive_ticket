import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { loginController, registerController, testController } from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

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

// Test Route
router.get("/test", requireSignIn, testController)

export default router;
