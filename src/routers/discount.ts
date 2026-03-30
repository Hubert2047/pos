import { Router } from 'express'
import { createDiscount, deleteDiscount, getDiscounts, updateDiscount } from '../controllers/discount.js'
import authenticateToken from '../middlewares/auth.js'

const router = Router()

router.post('/', authenticateToken, createDiscount)
router.get('/', authenticateToken, getDiscounts)
router.put('/:id', authenticateToken, updateDiscount)
router.delete('/:id', authenticateToken, deleteDiscount)

export default router
