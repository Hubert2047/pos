import mongoose, { Schema, Document } from "mongoose";

export interface Modifier {
  name: string;
  priceExtra: number;
}

export interface NoteOption {
  label: string;
}

export interface IItem extends Document {
  name: string;
  basePrice: number;
  categoryId: mongoose.Types.ObjectId;
  modifiers: Modifier[];
  noteOptions: NoteOption[];
}

export const ModifierSchema = new Schema<Modifier>({
  name: { type: String, required: true },
  priceExtra: { type: Number, default: 0 },
}, { _id: false });

export const NoteOptionSchema = new Schema<NoteOption>({
  label: { type: String, required: true },
}, { _id: false });

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  modifiers: [ModifierSchema],
  noteOptions: [NoteOptionSchema]

}, { timestamps: true });

export default mongoose.model<IItem>("Item", ItemSchema);