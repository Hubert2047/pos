import { Router } from 'express'
import {
    createDailyClosing,
    deleteDailyClosing,
    getDailyClosings,
    updateDailyClosing,
} from '../controllers/daily-closing.js'
import authenticateToken, { Role } from '../middlewares/auth.js'
import authorizationPermissions from '../middlewares/permissions.js'

const router = Router()

router.post('/', authenticateToken, createDailyClosing)
router.get('/', authenticateToken, getDailyClosings)
router.put('/:id', authenticateToken, authorizationPermissions([Role.Admin, Role.SuperAdmin]), updateDailyClosing)
router.delete('/:id', authenticateToken, authorizationPermissions([Role.Admin, Role.SuperAdmin]), deleteDailyClosing)

export default router
