import mongoose, { Schema, Document } from 'mongoose'

export interface IEmployee extends Document {
    name: string
    numberId: number
    note: string
}

const EmployeeSchema = new Schema<IEmployee>(
    {
        name: { type: String, required: true },
        numberId: { type: Number, required: true, unique: true },
        note: String,
    },
    { timestamps: true },
)

export default mongoose.model<IEmployee>('Employee', EmployeeSchema)
