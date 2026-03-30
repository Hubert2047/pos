import { Router } from 'express'
import {
    createDailyClosing,
    deleteDailyClosing,
    getDailyClosings,
    updateDailyClosing,
} from '../controllers/daily-closing.js'

const router = Router()

router.post('/', createDailyClosing)
router.get('/', getDailyClosings)
router.put('/:id', updateDailyClosing)
router.delete('/:id', deleteDailyClosing)

export default router
