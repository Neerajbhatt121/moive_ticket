import express from 'express';
import { registerController } from '../controllers/authController';


const router = express.Router();

// Register || Post
router.post("/register", registerController);