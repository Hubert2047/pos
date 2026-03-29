import type { Request, Response } from 'express'
import Revenue from '../models/revenue.js'

export const createRevenue = async (req: Request, res: Response) => {
    try {
        const { name, price, note } = req.body
        const revenue = new Revenue({ name, price, note })
        await revenue.save()
        res.status(201).json({ success: true, data: revenue })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating Revenue', error })
    }
}

export const getRevenues = async (req: Request, res: Response) => {
    try {
        const { date } = req.query
        const targetDate = date ? new Date(date as string) : new Date()
        const start = new Date(targetDate)
        start.setHours(0, 0, 0, 0)

        const end = new Date(targetDate)
        end.setHours(23, 59, 59, 999)

        const filter = { createdAt: { $gte: start, $lte: end } }
        const revenues = await Revenue.find(filter).sort({ createdAt: -1 })
        res.json({ success: true, data: revenues })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Error fetching Revenue', error })
    }
}
export const deleteRevenue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const revenue = await Revenue.findByIdAndDelete(id)

        if (!revenue) {
            return res.status(404).json({
                success: false,
                message: 'Revenue not found',
            })
        }

        res.json({
            success: true,
            message: 'Revenue deleted successfully',
            data: revenue,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting Revenue',
            error,
        })
    }
}

export const updateRevenue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        console.log('id', id)
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu id',
            })
        }

        const updated = await Revenue.findByIdAndUpdate(
            id,
            {
                ...data,
                price: Number(data.price),
            },
            {
                new: true,
                runValidators: true,
            },
        )

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy Revenue',
            })
        }

        return res.json({
            success: true,
            data: updated,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating Revenue',
            error,
        })
    }
}
