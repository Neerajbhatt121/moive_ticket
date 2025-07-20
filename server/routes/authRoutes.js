import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { findUserByEmail, loginController, registerController, testController } from "../controllers/authController.js";
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
    failureRedirect: "/login",
    session: false,
  }),

  (req, res) => {
    if (!req.user) {
      console.log("❌ No user from Google OAuth");
      return res.redirect('/login');
    }
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    const user = req.user
   // const token = user.token
    console.log("HERRRRRRRRRRRR", user)
    
    const redirectURL = `https://moive-ticket.onrender.com/oauth-success?token=${token}&name=${encodeURIComponent(user.name)}&email=${user.email}&profilePic=${user.profilePic}`;
    console.log("Redirecting to ..........",redirectURL)
    return res.redirect(redirectURL)

  }
);


// Register || Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController)

// Test Route
router.get("/test", requireSignIn, testController)


router.get("/findBymail/:umail", findUserByEmail)

export default router;
