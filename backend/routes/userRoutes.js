import { Router} from "express";
import { protect, authorize } from '../middleware/auth.js';
import { getProfile, updateProfile, getUsers } from '../controllers/userController.js';

//const router = express.Router();
const userRouter = Router();

userRouter
    .get('/me', protect, getProfile)
    .put('/me', protect, updateProfile)
    .get('/', protect, authorize('admin', 'staff'), getUsers)  // admin-only

export default userRouter;
