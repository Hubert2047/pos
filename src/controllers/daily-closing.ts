import type { Request, Response } from 'express'
import DailyClosing from '../models/daily-closing.js'
import { getFromDayUntilNow, getFullDay } from '../utils/index.js'

export const createDailyClosing = async (req: Request, res: Response) => {
    try {
        const { actualTotal, systemAmount, cash, reason } = req.body

        const { start, end } = getFullDay(0)

        const existing = await DailyClosing.findOne({
            createdAt: { $gte: start, $lte: end },
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
            createdAt: new Date(), // optional, Mongo tự set createdAt
        })
        await dailyClosing.save()

        res.status(201).json({
            success: true,
            data: dailyClosing,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error creating DailyClosing',
            error,
        })
    }
}
export const getClosingOfYesterday = async (req: Request, res: Response) => {
    try {
        const { start, end } = getFullDay(1)
        const closing = await DailyClosing.findOne({
            createdAt: { $gte: start, $lte: end },
        })

        res.json({
            success: true,
            data: { amount: closing ? closing.actualTotal : 0 },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching yesterday closing',
            error,
        })
    }
}
export const getDailyClosings = async (req: Request, res: Response) => {
    try {
        const { days } = req.query
        const filter: any = {}
        if (days) {
            const daysNumber = Number(days)
            const { start } = getFromDayUntilNow(daysNumber)
            filter.createdAt = { $gte: start }
        } else {
            const { start, end } = getFromDayUntilNow(0)
            filter.createdAt = { $gte: start, $lte: end }
        }
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
