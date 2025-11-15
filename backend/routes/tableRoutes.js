
import { Router} from "express";
import { protect, authorize } from '../middleware/auth.js';
import { createTable, listTables, getTable, updateTable, deleteTable } from '../controllers/tableController.js';

const tableRouter = Router();

tableRouter
    .get('/', listTables)
    .get('/:id', getTable)
    .post('/', protect, authorize('admin','staff'), createTable) // protected admin/staff operations
    .put('/:id', protect, authorize('admin','staff'), updateTable) // protected admin/staff operations
    .delete('/:id', protect, authorize('admin','staff'), deleteTable) // protected admin/staff operations

export default tableRouter;
