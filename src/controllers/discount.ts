import type { Request, Response } from 'express'
import Discount from '../models/discount.js'
// CREATE
export const createDiscount = async (req: Request, res: Response) => {
    try {
        const { name, amount, type, note, active } = req.body

        // validate basic
        if (!name || amount === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name and amount are required',
            })
        }

        if (type === 'percent' && amount > 100) {
            return res.status(400).json({
                success: false,
                message: 'Percent cannot exceed 100',
            })
        }

        const discount = await Discount.create({
            name,
            amount,
            type,
            note,
            active,
        })

        res.status(201).json({
            success: true,
            data: discount,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
export const createDiscount1 = async (name: string, amount: number, type: string, note: string, active: boolean) => {
    try {
        await Discount.create({
            name,
            amount,
            type,
            note,
            active,
        })
    } catch {}
}

// READ ALL
export const getDiscounts = async (_req: Request, res: Response) => {
    try {
        const discounts = await Discount.find().sort({ createdAt: -1 })

        res.json({
            success: true,
            count: discounts.length,
            data: discounts,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// READ ONE
export const getDiscountById = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findById(req.params.id)

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Discount not found',
            })
        }

        res.json({
            success: true,
            data: discount,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Invalid ID',
        })
    }
}

// UPDATE
export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const { amount, type } = req.body

        // validate update
        if (type === 'percent' && amount > 100) {
            return res.status(400).json({
                success: false,
                message: 'Percent cannot exceed 100',
            })
        }

        const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true,
        })

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Discount not found',
            })
        }

        res.json({
            success: true,
            data: discount,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// DELETE
export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id)

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Discount not found',
            })
        }

        res.json({
            success: true,
            message: 'Deleted successfully',
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
