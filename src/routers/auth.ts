import { Router } from 'express'
import authenticateToken from '../middlewares/auth.js'
import { login, logout } from '../controllers/auth.js'

const router = Router()

router.post('/login', login)
router.delete('/logout', authenticateToken, logout)

export default router