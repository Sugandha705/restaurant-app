
import { Router} from "express";
import { protect, authorize } from '../middleware/auth.js';
import { createOrder, getOrders, getOrder, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter
    .post('/', protect, createOrder)
    .get('/', protect, getOrders)
    .get('/:id', protect, getOrder)
    .put('/:id/status', protect, authorize('staff','admin'), updateOrderStatus)

export default orderRouter;
