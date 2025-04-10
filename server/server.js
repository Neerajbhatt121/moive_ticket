import chalk from 'chalk';
import dotenv from 'dotenv';
import express from "express";
import session from "express-session";
import passport from 'passport';
import { connectDB } from './config/db.js';
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();



connectDB();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())  // for the initalize 
app.use(passport.session())     // to maintain the session

app.use('/auth', authRoutes)

app.get("/", (req,res) => {
    res.send({
        message: "server started"
    })
})

app.get("/google", (req, res) => {
    res.send(`<a href="/auth/google">Login with Google</a>`);
  });

const port = process.env.PORT || 8080

app.listen(port, ()=> {
    console.log(chalk.bgYellow.bold(`Server started on ${port}`))
})