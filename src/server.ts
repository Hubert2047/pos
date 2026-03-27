import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import type { Application } from 'express'
import express from 'express'
import { connectDB } from './config/db.js'
import item from './routers/item.js'
import order from './routers/order.js'
import category from './routers/category.js'
import cors from 'cors'
import expense from './routers/expense.js'
import discount from './routers/discount.js'
import addon from './routers/addon.js'
dotenv.config()

const app: Application = express()
;(async () => {
    await connectDB()
    const port = process.env.SERVER_BACKUP_PORT || 8080
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.json())
    app.use('/api/items', item)
    app.use('/api/orders', order)
    app.use('/api/categories', category)
    app.use('/api/expenses', expense)
    app.use('/api/discounts', discount)
    app.use('/api/addons', addon)
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`)
    })
})()
