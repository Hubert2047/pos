import { Router } from 'express'
import { deleteRecords, pickupItems, postRecords, putRecords } from '../controllers/item.js'

const router = Router()

router.post('', postRecords)
router.post('/pick-up', pickupItems)
router.put('', putRecords)
router.delete('', deleteRecords)


export default router
