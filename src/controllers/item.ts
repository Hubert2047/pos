import type { Request, Response } from 'express'
import Item from "../models/item.js";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().populate("category_id");
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching items", error });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("category_id");
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching item", error });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating item", error });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error updating item", error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error deleting item", error });
  }
};