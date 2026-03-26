import mongoose, { Schema, Document } from 'mongoose'
import { ModifierSchema, type Modifier } from './item.js'

export const PAYMENT_METHODS = ['cash', 'uber', 'linepay', 'bank'] as const
interface OrderItem {
    item_id: mongoose.Types.ObjectId
    name: string
    quantity: number
    basePrice: number
    modifiers: Modifier[]
    noteOptions: string[]
    note: string
}
export interface OrderItemModifier {
    name: string
    priceExtra: number
    amount: number
}
export interface IOrder extends Document {
    items: OrderItem[]
    totalPrice: number
    status: 'pending' | 'paid' | 'cancelled'
    paymentMethod: string
}
const OrderItemModifierSchema = new Schema<OrderItemModifier>(
    {
        name: String,
        priceExtra: Number,
        amount: Number,
    },
    { _id: false },
)
const OrderItemSchema = new Schema<OrderItem>(
    {
        item_id: Schema.Types.ObjectId,
        name: String,
        quantity: { type: Number, default: 1 },
        basePrice: Number,
        modifiers: [OrderItemModifierSchema],
        noteOptions: [String],
        note: String,
    },
    { _id: false },
)

const OrderSchema = new Schema<IOrder>(
    {
        items: [OrderItemSchema],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: PAYMENT_METHODS,
            required: true,
        },
    },
    { timestamps: true },
)

export default mongoose.model<IOrder>('Order', OrderSchema)
