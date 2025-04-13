import express from 'express';
import { CreateShowInstances, GetInstanceForDay } from '../controllers/showInstanceController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router()

// POST -- Creating the Instance
router.post("/createInstance", requireSignIn, isAdmin, CreateShowInstances);


router.get("/getInstance",  GetInstanceForDay);

export default router;