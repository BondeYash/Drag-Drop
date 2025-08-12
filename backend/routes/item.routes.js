import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { getItems, addItem, reorderItems } from '../controller/item.controller.js';

const router = express.Router();

router.use(auth);

router.get('/', getItems);
router.post('/', addItem);
router.put('/reorder', reorderItems);

export default router;
