import mongoose, { Schema, Document } from 'mongoose'

export const PAYMENT_METHODS = ['cash', 'uber', 'linepay', 'bank', 'foodpanda'] as const
export interface OrderItemAddon {
    id: string
    name: string
    priceExtra: number
    amount: number
}
interface OrderItem {
    id: mongoose.Types.ObjectId
    itemId: string
    name: string
    quantity: number
    basePrice: number
    variant: string
    addons: OrderItemAddon[]
    noteOptions: string[]
    note: string
}

export interface OrderDiscount {
    name: string
    amount: number
    type: 'percent' | 'value'
}
interface Customer {
    name: string
    phone: string
}
export interface IOrder extends Document {
    number: number
    items: OrderItem[]
    totalPrice: number
    status: 'pending' | 'paid' | 'cancelled'
    type: 'dine_in' | 'takeaway'
    discount?: OrderDiscount
    paymentMethod: string
    customer: Customer | null
}
const CustomerSchema = new Schema<Customer>(
    {
        name: String,
        phone: String,
    },
    { _id: false },
)
const OrderItemAddonSchema = new Schema<OrderItemAddon>(
    {
        id: String,
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
        id: Schema.Types.ObjectId,
        itemId: String,
        name: String,
        quantity: { type: Number, default: 1 },
        basePrice: Number,
        variant: String,
        addons: [OrderItemAddonSchema],
        noteOptions: [String],
        note: String,
    },
    { _id: false },
)

const OrderSchema = new Schema<IOrder>(
    {
        number: { type: Number, required: true },
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
        customer: {
            type: CustomerSchema,
            default: null,
        },
    },
    { timestamps: true },
)

export default mongoose.model<IOrder>('Order', OrderSchema)
