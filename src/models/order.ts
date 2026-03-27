import mongoose, { Schema, Document } from 'mongoose'

export const PAYMENT_METHODS = ['cash', 'uber', 'linepay', 'bank', 'foodpanda'] as const
interface OrderItemAddon {
    name: string
    priceExtra: number
    amount: number
}
interface OrderItem {
    itemId: mongoose.Types.ObjectId
    name: string
    quantity: number
    basePrice: number
    variant: string
    addon: string[]
    noteOptions: string[]
    note: string
}

export interface OrderDiscount {
    name: string
    amount: number
    type: 'percent' | 'value'
}
export interface IOrder extends Document {
    items: OrderItem[]
    totalPrice: number
    status: 'pending' | 'paid' | 'cancelled'
    type: 'dine_in' | 'takeaway'
    discount?: OrderDiscount
    paymentMethod: string
}
const OrderItemAddonSchema = new Schema<OrderItemAddon>(
    {
        name: String,
        priceExtra: Number,
        amount: Number,
    },
    { _id: false },
)
const OrderDiscountSchema = new Schema<OrderDiscount>(
    {
        name: { type: String },
        type: {
            type: String,
            enum: ['percent', 'value'],
        },
        amount: { type: Number },
    },
    { _id: false },
)
const OrderItemSchema = new Schema<OrderItem>(
    {
        itemId: Schema.Types.ObjectId,
        name: String,
        quantity: { type: Number, default: 1 },
        basePrice: Number,
        variant: String,
        addon: [OrderItemAddonSchema],
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
        type: {
            type: String,
            enum: ['dine_in', 'takeaway'],
            default: 'dine_in',
        },
        discount: {
            type: OrderDiscountSchema,
            default: null,
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
