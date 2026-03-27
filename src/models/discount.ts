import mongoose, { Schema, Document } from 'mongoose'

export interface IDiscount extends Document {
    name: string
    amount: number
    type: 'percent' | 'value'
    active: boolean
    note?: string
}

const DiscountSchema = new Schema<IDiscount>(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        active: { type: Boolean, default: true },
        type: {
            type: String,
            enum: ['percent', 'value'],
            default: 'percent',
        },
        note: String,
    },
    { timestamps: true },
)

export default mongoose.model<IDiscount>('Discount', DiscountSchema)
