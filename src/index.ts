import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import type { Application } from 'express'
import express from 'express'
import { connectDB } from './config/db.js'
import itemInstance from './router/itemInstance.js'
dotenv.config()

const app: Application = express()
;(async () => {
    await connectDB()
    const port = process.env.SERVER_BACKUP_PORT || 8800

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.json())
    app.use('/api/item-instance', itemInstance)
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`)
    })
})()
