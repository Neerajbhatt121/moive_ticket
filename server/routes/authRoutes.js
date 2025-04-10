import express from 'express';
import passport from 'passport';
import { registerController } from '../controllers/authController.js';


const router = express.Router();

// Register || Post
router.post("/register", registerController);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));


  router.get("/google/callback",
    passport.authenticate("google", { 
      failureRedirect: "/",
      session: false
     }), 
    (req, res) => {
      res.send(`
        <h2>Login Success ✅</h2>
        <p>Welcome, ${req.user.name}</p>
        <p>Welcome, ${req.user.provider}</p>
        <img src="${req.user.profilePic}" width="100"/>
      `);
    }
  );
  
  

export default router