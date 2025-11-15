
import { Router} from "express";
import { protect, authorize } from '../middleware/auth.js';
import { getAllFoods, getFood, createFood, updateFood } from '../controllers/foodController.js';

const foodRouter = Router();

foodRouter
    
    .get('/', getAllFoods)
    .get('/:id', getFood)
    .post('/', protect, authorize('admin'), createFood)
    .put('/:id', protect, authorize('admin'), updateFood)

export default foodRouter;
