import { Router } from 'express'
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/category.js'
import authenticateToken from '../middlewares/auth.js'

const router = Router()

router.get('/', authenticateToken, getCategories)
router.post('/', authenticateToken, createCategory)
router.get('/:id', authenticateToken, getCategoryById)
router.put('/:id', authenticateToken, updateCategory)
router.delete('/:id', authenticateToken, deleteCategory)

export default router
