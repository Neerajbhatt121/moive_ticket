import chalk from 'chalk';
import dotenv from 'dotenv';
import express from "express";
import { connectDB } from './config/db.js';
const app = express();

dotenv.config();


connectDB();

app.get("/", (req,res) => {
    res.send({
        message: "server started"
    })
})

const port = process.env.PORT || 8080

app.listen(port, ()=> {
    console.log(chalk.bgYellow.bold(`Server started on ${port}`))
})