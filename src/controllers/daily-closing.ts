import type { Request, Response } from 'express'
import DailyClosing from '../models/daily-closing.js'

export const createDailyClosing = async (req: Request, res: Response) => {
    try {
        const { name, price, note } = req.body
        const dailyClosing = new DailyClosing({ name, price, note })
        await dailyClosing.save()
        res.status(201).json({ success: true, data: dailyClosing })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating DailyClosing', error })
    }
}

export const getDailyClosings = async (req: Request, res: Response) => {
    try {
        const { date } = req.query
        const targetDate = date ? new Date(date as string) : new Date()
        const start = new Date(targetDate)
        start.setHours(0, 0, 0, 0)

        const end = new Date(targetDate)
        end.setHours(23, 59, 59, 999)

        const filter = { createdAt: { $gte: start, $lte: end } }
        const dailyClosings = await DailyClosing.find(filter).sort({ createdAt: -1 })
        res.json({ success: true, data: dailyClosings })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Error fetching DailyClosing', error })
    }
}
export const deleteDailyClosing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const dailyClosing = await DailyClosing.findByIdAndDelete(id)

        if (!dailyClosing) {
            return res.status(404).json({
                success: false,
                message: 'DailyClosing not found',
            })
        }

        res.json({
            success: true,
            message: 'DailyClosing deleted successfully',
            data: dailyClosing,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting DailyClosing',
            error,
        })
    }
}

export const updateDailyClosing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu id',
            })
        }

        const updated = await DailyClosing.findByIdAndUpdate(
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
                message: 'Không tìm thấy DailyClosing',
            })
        }

        return res.json({
            success: true,
            data: updated,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating DailyClosing',
            error,
        })
    }
}
