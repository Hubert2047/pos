import mongoose, { Schema, Document } from "mongoose";

interface OrderItemModifier {
  name: string;
  price_extra: number;
}

interface OrderItem {
  item_id: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  base_price: number;
  modifiers: OrderItemModifier[];
  note_options: string[];
  note: string;
}

export interface IOrder extends Document {
  items: OrderItem[];
  total_price: number;
  status: "pending" | "paid" | "cancelled";
}

const OrderItemModifierSchema = new Schema<OrderItemModifier>({
  name: String,
  price_extra: Number
}, { _id: false });

const OrderItemSchema = new Schema<OrderItem>({
  item_id: Schema.Types.ObjectId,
  name: String,
  quantity: { type: Number, default: 1 },
  base_price: Number,

  modifiers: [OrderItemModifierSchema],

  note_options: [String],
  note: String

}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  items: [OrderItemSchema],

  total_price: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model<IOrder>("Order", OrderSchema);