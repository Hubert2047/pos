import type { Request, Response } from 'express'
import Expense from '../models/expense.js'

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
        const { date } = req.query
        const filter: any = {}
        if (date) {
            const d = new Date(date as string)
            d.setHours(0, 0, 0, 0)
            const dNext = new Date(d)
            dNext.setDate(dNext.getDate() + 1)
            filter.date = { $gte: d, $lt: dNext }
        }
        const expenses = await Expense.find(filter).sort({ date: 1 })
        res.json({ success: true, data: expenses })
    } catch (error) {
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
        const { name, price, note } = req.body

        const expense = await Expense.findByIdAndUpdate(
            id,
            { name, price, note },
            { new: true, runValidators: true }, 
        )

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found',
            })
        }

        res.json({
            success: true,
            message: 'Expense updated successfully',
            data: expense,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error,
        })
    }
}
