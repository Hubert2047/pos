import { Router } from 'express'
import { checkIn, checkOut } from '../controllers/shift-attendance.js'
import authenticateToken from '../middlewares/auth.js'

const router = Router()

router.post('/check-in', authenticateToken, checkIn)
router.post('/check-out', authenticateToken, checkOut)

export default router
