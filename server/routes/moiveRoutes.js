import express from 'express';
import { createMoive, GetAllMoive, GetAllMoiveById } from '../controllers/moiveController.js';
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import upload from '../middleware/multer.js';

const router = express.Router()

// Adding moive to db
router.post("/createmoive",requireSignIn, isAdmin, upload.single('posterURL') ,createMoive);

// Getting all moives
router.get('/getAllmoives', GetAllMoive);

// Getting movie by id
router.get('/getMovieById/:movieId', GetAllMoiveById);

export default router;