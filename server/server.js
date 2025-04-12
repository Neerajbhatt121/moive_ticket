import chalk from 'chalk';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import session from "express-session";
import morgan from 'morgan';
import passport from 'passport';
import moiveRoutes from "../server/routes/moiveRoutes.js";
import { connectDB } from './config/db.js';
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

connectDB();

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())  // for the initalize 
app.use(passport.session())     // to maintain the session

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/moive', moiveRoutes)

app.get("/", (req,res) => {
    res.send({
        message: "server started"
    })
})

app.get("/google", (req, res) => {
    res.send(`<a href="/api/v1/auth/google">Login with Google</a>`);
  });

const port = process.env.PORT || 8080

app.listen(port, ()=> {
    console.log(chalk.bgYellow.bold(`Server started on ${port}`))
})