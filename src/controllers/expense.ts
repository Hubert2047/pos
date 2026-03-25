import type { Request, Response } from 'express'
import Expense from "../models/expense.js";

// tạo chi phí
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { label, amount, date, note } = req.body;
    const expense = new Expense({ label, amount, date, note });
    await expense.save();
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating expense", error });
  }
};

// lấy chi phí theo ngày
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const filter: any = {};
    if (date) {
      const d = new Date(date as string);
      d.setHours(0, 0, 0, 0);
      const dNext = new Date(d);
      dNext.setDate(dNext.getDate() + 1);
      filter.date = { $gte: d, $lt: dNext };
    }
    const expenses = await Expense.find(filter).sort({ date: 1 });
    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses", error });
  }
};