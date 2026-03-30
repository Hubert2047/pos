import mongoose, { Schema, Document } from 'mongoose'

export interface IShiftAttendance extends Document {
    employeeId: Schema.Types.ObjectId
    numberId: string
    checkIn?: Date
    checkOuts: Date[]        // ← array
    workingHours?: number
    status: 'working' | 'done'
    date: string
}

const ShiftAttendanceSchema = new Schema<IShiftAttendance>(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        numberId: { type: String, required: true },
        checkIn: { type: Date },
        checkOuts: { type: [Date], default: [] },   // ← array
        workingHours: { type: Number },
        status: { type: String, enum: ['working', 'done'], default: 'working' },
        date: { type: String, required: true },
    },
    { timestamps: true },
)

ShiftAttendanceSchema.index({ numberId: 1, date: 1 }, { unique: true })

export default mongoose.model<IShiftAttendance>('ShiftAttendance', ShiftAttendanceSchema)