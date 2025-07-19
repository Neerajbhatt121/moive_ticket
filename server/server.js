import chalk from 'chalk';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import session from "express-session";
import { createServer } from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { Server } from 'socket.io';
import instanceRoutes from '../server/routes/instanceRoutes.js';
import moiveRoutes from "../server/routes/moiveRoutes.js";
import ticketsRoutes from '../server/routes/ticketsRoutes.js';
import { connectDB } from './config/db.js';
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// For Socket.io 
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true 
    }
})


const selectedSeat = {}

io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id)

  socket.on('joinInstance', (instanceId) => {
    socket.join(instanceId)
    console.log(`🟢 Joined room: ${instanceId}`)
  })

  socket.on('leaveInstance', (instanceId) => {
    socket.leave(instanceId)
    console.log(`🔴 Left room: ${instanceId}`)
  })

  socket.on('selectSeat', ({ seatNumber, instanceId, userId }) => {
    console.log(`🎫 ${userId} selected seat ${seatNumber}`)
    io.to(instanceId).emit('seatSelected', { seatNumber, userId })
  })

  socket.on('unselectSeat', ({ seatNumber, instanceId }) => {
    console.log(`❌ Seat ${seatNumber} unselected`)
    io.to(instanceId).emit('seatUnselected', { seatNumber })
  })
})




connectDB();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use('/tickets', express.static(path.join(process.cwd(), 'tickets')));

app.use(passport.initialize())  // for the initalize 
app.use(passport.session())     // to maintain the session

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/moive', moiveRoutes)
app.use('/api/v1/instance', instanceRoutes)
app.use('/api/v1/tickets', ticketsRoutes)

app.get("/", (req,res) => {
    res.send({
        message: "server started"
    })
})

app.get("/google", (req, res) => {
    res.send(`<a href="https://moive-ticket-1.onrender.com/api/v1/auth/google">Login with Google</a>`);
  });

const port = process.env.PORT || 8080

server.listen(port, ()=> {
    console.log(chalk.bgYellow.bold(`Server started on ${port}`))
    console.log(chalk.bgYellow.bold(`Server (w/Socket.IO) started on ${port}`));
})