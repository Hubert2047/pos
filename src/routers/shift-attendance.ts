import { Router } from 'express'
import { checkInOrOut } from '../controllers/shift-attendance.js'
import authenticateToken from '../middlewares/auth.js'

const router = Router()

router.post('/check-in-out', authenticateToken, checkInOrOut)

export default router
