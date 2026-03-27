import { Router } from 'express'
import {
    getAllAddons,
    getAddonById,
    createAddon,
    updateAddon,
    deleteAddon,
} from '../controllers/addon.js'

const router = Router()

router.get('/', getAllAddons)
router.get('/:id', getAddonById)
router.post('/', createAddon)
router.put('/:id', updateAddon)
router.delete('/:id', deleteAddon)

export default router