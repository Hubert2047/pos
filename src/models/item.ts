import mongoose, { Schema, Document } from 'mongoose'

export interface IItem extends Document {
    name: string
    variants: string[] | null
    basePrice: number
    categoryId: mongoose.Types.ObjectId
    addons: mongoose.Types.ObjectId[]
    noteOptions: string[]
    active: boolean
}


const ItemSchema = new Schema<IItem>(
    {
        name: { type: String, required: true },
        basePrice: { type: Number, required: true },
        variants: {
          type: [String],
          default: [],
        },
        addons: [{ type: Schema.Types.ObjectId, ref: 'Addon' }],
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        noteOptions: [String],
        active: { type: Boolean, required: false, default: true },
    },
    { timestamps: true },
)

export default mongoose.model<IItem>('Item', ItemSchema)
