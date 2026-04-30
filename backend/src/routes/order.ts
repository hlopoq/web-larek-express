import express from 'express';
import order from '../controllers/order';
import { validateOrderBody } from '../middlewares/validations';

const router = express.Router();

router.post('/', validateOrderBody, order);

export default router;
