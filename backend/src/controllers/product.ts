import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (err) {
    next(new Error(`Ошибка при получении товаров: ${(err as Error).message}`));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title, image, category, description, price,
  } = req.body;
  try {
    const createdProduct = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });
    const { _id } = createdProduct;
    res.status(201).json({
      title,
      image,
      category,
      description,
      price,
      _id,
    });
  } catch (err) {
    next(new Error(`Ошибка при создании товара: ${(err as Error).message}`));
  }
};
