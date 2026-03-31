import type { Request, Response } from 'express'
import Expense from '../models/expense.js'
import { getFromDayUntilNow } from '../utils/index.js'
export const createExpense = async (req: Request, res: Response) => {
    try {
        const { name, price, note } = req.body
        const expense = new Expense({ name, price, note })
        await expense.save()
        res.status(201).json({ success: true, data: expense })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating expense', error })
    }
}

export const getExpenses = async (req: Request, res: Response) => {
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
        const expenses = await Expense.find(filter).sort({ createdAt: -1 })
        res.json({ success: true, data: expenses })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Error fetching expenses', error })
    }
}
export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const expense = await Expense.findByIdAndDelete(id)

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found',
            })
        }

        res.json({
            success: true,
            message: 'Expense deleted successfully',
            data: expense,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting expense',
            error,
        })
    }
}

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu id',
            })
        }

        const updated = await Expense.findByIdAndUpdate(
            id,
            {
                ...data,
                price: Number(data.price),
            },
            {
                returnDocument: 'after',
                runValidators: true,
            },
        )

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy expense',
            })
        }

        return res.json({
            success: true,
            data: updated,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error,
        })
    }
}
