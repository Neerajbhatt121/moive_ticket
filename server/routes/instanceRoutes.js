import express from 'express';
import { CreateShowInstances, GetInstanceForDay, GetInstanceForMoive, PostBookSeat } from '../controllers/showInstanceController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router()

// POST -- Creating the Instance
router.post("/createInstance", requireSignIn, isAdmin, CreateShowInstances);

// GET -- Getting all instance of that day
router.get("/getInstance",  GetInstanceForDay);

// GET -- Getting instance of particular movie for upcoming 7 days
router.get("/getAllInstanceOfmovie/:movieId", GetInstanceForMoive);


router.post("/bookMovie", PostBookSeat);


export default router;