import type { Request, Response } from 'express'
import DailyClosing from '../models/daily-closing.js'

export const createDailyClosing = async (req: Request, res: Response) => {
    try {
        const { actualTotal, systemAmount, cash, reason } = req.body
        const now = new Date()
        const startOfDay = new Date(now)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(now)
        endOfDay.setHours(23, 59, 59, 999)
        const existing = await DailyClosing.findOne({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Today already has a DailyClosing record',
            })
        }
        const dailyClosing = new DailyClosing({
            actualTotal,
            systemAmount,
            cash,
            reason,
        })
        await dailyClosing.save()
        res.status(201).json({
            success: true,
            data: dailyClosing,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating DailyClosing',
            error,
        })
    }
}
export const getClosingOfYesterday = async (req: Request, res: Response) => {
    try {
        const now = new Date()
        const yesterday = new Date(now)
        yesterday.setDate(yesterday.getDate() - 1)

        const startOfDay = new Date(yesterday)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(yesterday)
        endOfDay.setHours(23, 59, 59, 999)

        const closing = await DailyClosing.findOne({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
        res.json({
            success: true,
            data: {
                amount: closing ? closing.actualTotal : 0,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching yesterday closing',
            error,
        })
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
                runValidators: true,
                returnDocument: 'after',
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
//tính tổng thu nhập khác
//lay so tien daily-closing hom qua
