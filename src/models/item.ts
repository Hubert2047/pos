import mongoose, { Schema, Document } from "mongoose";

interface Modifier {
  name: string;
  price_extra: number;
}

interface NoteOption {
  label: string;
  value: string;
}

export interface IItem extends Document {
  name: string;
  base_price: number;
  category_id: mongoose.Types.ObjectId;
  modifiers: Modifier[];
  note_options: NoteOption[];
}

const ModifierSchema = new Schema<Modifier>({
  name: { type: String, required: true },
  price_extra: { type: Number, default: 0 },
}, { _id: false });

const NoteOptionSchema = new Schema<NoteOption>({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  base_price: { type: Number, required: true },

  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  modifiers: [ModifierSchema],
  note_options: [NoteOptionSchema]

}, { timestamps: true });

export default mongoose.model<IItem>("Item", ItemSchema);