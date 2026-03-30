import { Router } from 'express'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controllers/employee.js'
import authenticateToken from '../middlewares/auth.js'

const router = Router()

router.post('/', authenticateToken, createEmployee)
router.get('/', authenticateToken, getEmployees)
router.put('/:id', authenticateToken, updateEmployee)
router.delete('/:id', authenticateToken, deleteEmployee)

export default router
