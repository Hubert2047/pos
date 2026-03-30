import type { Request, Response } from 'express'
import ShiftAttendance from '../models/shift-attendance.js'
import Employee from '../models/employee.js'

const getTaiwanDateString = (): string => {
    const now = new Date()
    const taiwanTime = new Date(now.getTime() + 8 * 60 * 60 * 1000)
    return taiwanTime.toISOString().split('T')[0] ?? ''
}

// ✅ CHỈ ĐƯỢC CHECK IN 1 LẦN / NGÀY
export const checkIn = async (req: Request, res: Response) => {
    try {
        const { numberId } = req.body
        if (!numberId) {
            return res.status(400).json({ success: false, message: 'numberId is required' })
        }

        const employee = await Employee.findOne({ numberId })
        if (!employee) {
            return res.status(400).json({ success: false, message: 'Employee not found' })
        }

        const dateStr = getTaiwanDateString()
        const existing = await ShiftAttendance.findOne({ numberId, date: dateStr })

        if (existing) {
            return res.status(400).json({ success: false, message: 'Already checked in today' })
        }

        const attendance = new ShiftAttendance({
            employeeId: employee._id,
            numberId,
            checkIn: new Date(),
            checkOuts: [],
            date: dateStr,
            status: 'working',
        })

        await attendance.save()
        return res.json({ success: true, message: 'Checked in successfully', data: attendance })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error', error })
    }
}

// ✅ CÓ THỂ CHECK OUT NHIỀU LẦN, TÍNH GIỜ TỪ checkIn → checkOut CUỐI CÙNG
export const checkOut = async (req: Request, res: Response) => {
    try {
        const { numberId } = req.body
        if (!numberId) {
            return res.status(400).json({ success: false, message: 'numberId is required' })
        }

        const dateStr = getTaiwanDateString()
        const attendance = await ShiftAttendance.findOne({ numberId, date: dateStr })

        if (!attendance || !attendance.checkIn) {
            return res.status(400).json({ success: false, message: 'No check-in found for today' })
        }

        const now = new Date()
        if (!attendance.checkOuts) {
            attendance.checkOuts = []
        }
        attendance.checkOuts.push(now)

        const lastCheckOut = attendance.checkOuts[attendance.checkOuts.length - 1]!
        const hours = (lastCheckOut.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60)
        attendance.workingHours = parseFloat(hours.toFixed(2))
        attendance.status = 'done'

        await attendance.save()
        return res.json({
            success: true,
            message: `Checked out successfully (${attendance.checkOuts.length} time(s) today)`,
            data: attendance,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error', error })
    }
}
