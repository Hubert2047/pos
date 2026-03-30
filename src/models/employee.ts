import mongoose, { Schema, Document } from 'mongoose'

export interface IEmployee extends Document {
    name: string
    numberId: string
    note: string
}

const EmployeeSchema = new Schema<IEmployee>(
    {
        name: { type: String, required: true },
        numberId: { type: String, required: true, unique: true },
        note: String,
    },
    { timestamps: true },
)

export default mongoose.model<IEmployee>('Employee', EmployeeSchema)
