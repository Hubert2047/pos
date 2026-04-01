import { Router } from 'express'
import { handleWebhook } from '../controllers/webhook.js'
import { lineMiddleware } from '../middlewares/line.js'

const router = Router()
router.post('/', lineMiddleware, handleWebhook)

export default router
