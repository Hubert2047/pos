import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getNextOrderNumber,
  cancelOrder
} from "../controllers/order.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/next-order-number", getNextOrderNumber);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/cancel", cancelOrder)

export default router;