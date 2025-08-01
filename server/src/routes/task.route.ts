import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus ,
} from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';


const router = express.Router();
router.use(authenticate);
//所有路由都需要登入才能使用

router.get('/',getTasks);
router.post('/',createTask);
router.patch('/:id/status',updateTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;