import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import type { Application } from 'express'
import express from 'express'
import { connectDB } from './config/db.js'
import item from './routers/item.js'
import order from './routers/order.js'
import category from './routers/category.js'
import expense from './routers/expense.js'
dotenv.config()

const app: Application = express()
;(async () => {
    await connectDB()
    const port = process.env.SERVER_BACKUP_PORT || 8080

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.json())
    app.use('/api/item', item)
    app.use('/api/order', order)
    app.use('/api/category', category)
    app.use('/api/expense', expense)
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`)
    })
})()
