import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  label: string;       
  amount: number;    
  date: Date;          
  note?: string;    
}

const ExpenseSchema = new Schema<IExpense>({
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: String
}, { timestamps: true });

export default mongoose.model<IExpense>("Expense", ExpenseSchema);