import type { Request, Response } from 'express'
import Order, { type OrderItemModifier } from '../models/order.js'
const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => {
        const modifierTotal =
            item.modifiers?.reduce(
                (sum: number, mod: OrderItemModifier) => sum + (mod.priceExtra || 0) * mod.amount,
                0,
            ) || 0

        return total + (item.base_price + modifierTotal) * item.quantity
    }, 0)
}
export const getCashOrders = async (req: Request, res: Response) => {
  try {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const cashOrders = await Order.find({
      createdAt: { $gte: start, $lte: end },
      status: 'paid',
      paymentMethod: 'cash' 
    })

    const totalCash = cashOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

    res.json({
      success: true,
      totalCash,
      count: cashOrders.length,
      data: cashOrders
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cash orders',
      error
    })
  }
}
export const getSalesByPaymentMethod = async (req: Request, res: Response) => {
  try {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const result = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: start, $lte: end },
          status: 'paid' 
        } 
      },
      { 
        $group: { 
          _id: '$paymentMethod', 
          totalSales: { $sum: '$totalPrice' },
          count: { $sum: 1 } 
        } 
      }
    ])

    const salesByMethod: Record<string, { totalSales: number, count: number }> = {}
    result.forEach(r => {
      salesByMethod[r._id] = { totalSales: r.totalSales, count: r.count }
    })

    res.json({
      success: true,
      data: salesByMethod
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales by payment method',
      error
    })
  }
}
export const getTodaySales = async (req: Request, res: Response) => {
    try {
        const start = new Date()
        start.setHours(0, 0, 0, 0)
        const end = new Date()
        end.setHours(23, 59, 59, 999)
        const orders = await Order.find({
            createdAt: { $gte: start, $lte: end },
            status: 'paid',
        })
        const totalSales = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
        res.json({
            success: true,
            totalSales,
            count: orders.length,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error calculating today's sales",
            error,
        })
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Items is required',
            })
        }

        const normalizedItems = items.map((item: any) => {
            const note = item.note_options?.join(', ') || ''

            return {
                item_id: item.item_id,
                name: item.name,
                quantity: item.quantity || 1,
                base_price: item.base_price,

                modifiers: item.modifiers || [],
                note_options: item.note_options || [],
                note,
            }
        })

        const total_price = calculateTotal(normalizedItems)

        const order = new Order({
            items: normalizedItems,
            total_price,
            status: 'pending',
        })

        await order.save()

        res.status(201).json({
            success: true,
            data: order,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error,
        })
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })

        res.json({
            success: true,
            data: orders,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error,
        })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            })
        }

        res.json({
            success: true,
            data: order,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error,
        })
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })

        res.json({
            success: true,
            data: updated,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating order',
            error,
        })
    }
}
