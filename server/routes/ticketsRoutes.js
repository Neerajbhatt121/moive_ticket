import express from 'express'
import { GetAllTicketsOfUser } from '../controllers/TicketsController.js'

const router = express.Router()

router.get('/ticketAll/:userId', GetAllTicketsOfUser)

export default router