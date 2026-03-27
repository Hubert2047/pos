import { Router } from "express";
import { createDiscount, deleteDiscount, getDiscounts, updateDiscount } from "../controllers/discount.js";

const router = Router();

router.post("/", createDiscount);
router.get("/", getDiscounts);
router.put("/:id", updateDiscount);     
router.delete("/:id", deleteDiscount); 

export default router;