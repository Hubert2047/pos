import type { Request, Response } from 'express'
import ShiftAttendance from '../models/shift-attendance.js'
import Employee from '../models/employee.js'

const getTaiwanDateString = (): string => {
    const now = new Date()
    const taiwanTime = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    return taiwanTime.toISOString().split('T')[0] ?? ''
}

export const checkInOrOut = async (req: Request, res: Response) => {
    try {
        const { numberId } = req.body
        if (!numberId) {
            return res.status(400).json({ success: false, message: 'numberId is required' })
        }
        const employee = await Employee.findOne({ numberId })
        if (!employee) {
            return res.status(400).json({ success: false, message: 'Employee not found' })
        }
        const dateStr: string = getTaiwanDateString()

        let attendance = await ShiftAttendance.findOne({ numberId, date: dateStr })

        const now = new Date()

        if (!attendance) {
            attendance = new ShiftAttendance({
                employeeId: employee._id,
                numberId,
                checkIn: now,
                date: dateStr,
                status: 'working',
            })
            await attendance.save()
            return res.json({ success: true, message: 'Checked in successfully', data: attendance })
        }

        if (attendance.checkIn && !attendance.checkOut) {
            attendance.checkOut = now

            const hours = (attendance.checkOut.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60)
            attendance.workingHours = parseFloat(hours.toFixed(2))
            attendance.status = 'done'

            await attendance.save()
            return res.json({ success: true, message: 'Checked out successfully', data: attendance })
        }

        if (attendance.checkIn && attendance.checkOut) {
            return res.status(400).json({ success: false, message: 'Already checked out today' })
        }

        return res.status(400).json({ success: false, message: 'Invalid attendance state' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error', error })
    }
}
