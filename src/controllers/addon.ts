import type { Request, Response } from 'express'
import AddonModel from '../models/addon.js'
// Get all addons
export const getAllAddons = async (req: Request, res: Response) => {
    try {
        const addons = await AddonModel.find()
        res.json(addons)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err })
    }
}

// Get single addon
export const getAddonById = async (req: Request, res: Response) => {
    try {
        const addon = await AddonModel.findById(req.params.id)
        if (!addon) return res.status(404).json({ message: 'Addon not found' })
        res.json(addon)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err })
    }
}

// Create addon
export const createAddon = async (req: Request, res: Response) => {
    try {
        const { name, priceExtra, active } = req.body
        const newAddon = new AddonModel({ name, priceExtra, active })
        const saved = await newAddon.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err })
    }
}
export const serverCreateAddon = async (name: string, priceExtra: number, active: boolean) => {
    try {
        const newAddon = new AddonModel({ name, priceExtra, active })
        await newAddon.save()
    } catch (err) {}
}
// Update addon
export const updateAddon = async (req: Request, res: Response) => {
    try {
        const updated = await AddonModel.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
        if (!updated) return res.status(404).json({ message: 'Addon not found' })
        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err })
    }
}

// Delete addon
export const deleteAddon = async (req: Request, res: Response) => {
    try {
        const deleted = await AddonModel.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: 'Addon not found' })
        res.json({ message: 'Addon deleted' })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err })
    }
}
