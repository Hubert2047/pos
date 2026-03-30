import mongoose, { Schema, Document } from 'mongoose'

export interface IShiftAttendance extends Document {
    employeeId: Schema.Types.ObjectId
    numberId: string // ID nhân viên dạng string
    checkIn?: Date
    checkOut?: Date
    workingHours?: number
    status: 'working' | 'done'
    date: string // YYYY-MM-DD
}

const ShiftAttendanceSchema = new Schema<IShiftAttendance>(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // optional
        numberId: { type: String, required: true },
        checkIn: { type: Date },
        checkOut: { type: Date },
        workingHours: { type: Number },
        status: { type: String, enum: ['working', 'done'], default: 'working' },
        date: { type: String, required: true },
    },
    { timestamps: true },
)

// 1 nhân viên / 1 ngày duy nhất
ShiftAttendanceSchema.index({ numberId: 1, date: 1 }, { unique: true })

export default mongoose.model<IShiftAttendance>('ShiftAttendance', ShiftAttendanceSchema)
