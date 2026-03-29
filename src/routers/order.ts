import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getNextOrderNumber,
  cancelOrder,
  getSalesByPaymentMethod
} from "../controllers/order.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/next-order-number", getNextOrderNumber);
router.get("/sales-by-payment", getSalesByPaymentMethod);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/cancel", cancelOrder)

export default router;