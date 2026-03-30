import { Router } from 'express';
import { getAllItems, addItem, deleteItem, updateItem } from '../controllers/ItemController.js';

const router = Router();

router.get('/', getAllItems);
router.post('/', addItem);
router.delete('/:name', deleteItem);
router.put('/:name', updateItem);

export default router;