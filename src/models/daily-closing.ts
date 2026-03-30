import mongoose, { Schema, Document } from 'mongoose'

type CashData = {
    [denomination: number]: number
}

export interface IDailyClosing extends Document {
    actualTotal: number
    systemAmount: number
    cash: CashData
    reason: string
}

const DailyClosingSchema = new Schema<IDailyClosing>(
    {
        actualTotal: { type: Number, required: true },
        systemAmount: { type: Number, required: true },
        reason: String,
        cash: {
            type: Map,
            of: Number,
            default: {},
        },
    },
    { timestamps: true },
)

export default mongoose.model<IDailyClosing>('DailyClosing', DailyClosingSchema)
