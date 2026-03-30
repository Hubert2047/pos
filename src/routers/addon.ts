import { Router } from 'express'
import { getAllAddons, getAddonById, createAddon, updateAddon, deleteAddon } from '../controllers/addon.js'
import authenticateToken, { Role } from '../middlewares/auth.js'
import authorizationPermissions from '../middlewares/permissions.js'

const router = Router()

router.get('/', authenticateToken, getAllAddons)
router.post('/', authenticateToken, createAddon)
router.get('/:id', authenticateToken, getAddonById)
router.put('/:id', authenticateToken, authorizationPermissions([Role.Admin, Role.SuperAdmin]), updateAddon)
router.delete('/:id', authenticateToken, authorizationPermissions([Role.Admin, Role.SuperAdmin]), deleteAddon)

export default router
