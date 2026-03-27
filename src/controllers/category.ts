import type { Request, Response } from 'express'
import Category from '../models/category.js'

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ name: 1 })
        res.json({ success: true, data: categories })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching categories', error })
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' })
        }
        res.json({ success: true, data: category })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching category', error })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const existing = await Category.findOne({ name })
        if (existing) {
            return res.status(400).json({ success: false, message: 'Category already exists' })
        }
        const category = new Category({ name })
        await category.save()
        res.status(201).json({ success: true, data: category })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating category', error })
    }
}
export const createCategory1 = async (name: string) => {
    try {
        const existing = await Category.findOne({ name })
        if (existing) return
        const category = new Category({ name })
        await category.save()
    } catch (error) {}
}
export const updateCategory = async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const updated = await Category.findByIdAndUpdate(id, { name }, { new: true })
        res.json({ success: true, data: updated })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating category', error })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Category.findByIdAndDelete(id)
        res.json({ success: true, message: 'Category deleted' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting category', error })
    }
}
