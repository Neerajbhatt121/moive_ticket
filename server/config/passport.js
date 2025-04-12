import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import pkg from 'passport-google-oauth20';
import user from "../modal/User.js";
dotenv.config();
const { Strategy: GoogleStrategy } = pkg;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      try {
        const existingUser = await user.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await user.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          provider: "google",
        });

        const token = await jwt.sign(
          { _id: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        newUser.token = token;

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser( async(id, done) => {
    try {
        const existingUser = await user.findById(id);
        done(null, existingUser)
    } catch (error) {
        done(error, null)
    }
})
