import mongoose, { Schema, Document } from 'mongoose'

export interface Addon extends Document {
    name: string
    priceExtra: number
    active: boolean
}

const AddonSchema = new Schema<Addon>(
    {
        name: { type: String, required: true },
        priceExtra: { type: Number, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true },
)

export default mongoose.model<Addon>('Addon', AddonSchema)