import type { Request, Response } from 'express'
import Employee from '../models/employee.js'

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, numberId, note } = req.body
        const employee = await Employee.findOne({ numberId })
        if (employee) {
            return res.status(400).json({ success: false, message: 'Employee already exists' })
        }
        const newEmployee = new Employee({ name, numberId, note })
        await newEmployee.save()
        res.status(201).json({ success: true, data: newEmployee })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating Employee', error })
    }
}
export const createServerEmployee = async (name: string, numberId: string, note: string) => {
    try {
        const employee = await Employee.findOne({ numberId })
        if (employee) return

        const newEmployee = new Employee({ name, numberId, note })
        await newEmployee.save()
    } catch (error) {
        console.log('Error creating Employee', error)
    }
}

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 })
        res.json({ success: true, data: employees })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Error fetching Employee', error })
    }
}
export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const employee = await Employee.findByIdAndDelete(id)

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            })
        }

        res.json({
            success: true,
            message: 'Employee deleted successfully',
            data: employee,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting Employee',
            error,
        })
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu id',
            })
        }

        const updated = await Employee.findByIdAndUpdate(
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
                message: 'Không tìm thấy Employee',
            })
        }

        return res.json({
            success: true,
            data: updated,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating Employee',
            error,
        })
    }
}
