import express from 'express';
import { getAllProducts, createProduct } from '../controllers/product';
import { validateProductBody } from '../middlewares/validations'

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validateProductBody, createProduct);

export default router;
