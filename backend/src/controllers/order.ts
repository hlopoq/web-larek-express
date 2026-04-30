import { NextFunction, Request, Response } from 'express';
import { simpleFaker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const checkAllItemsExist = (products: unknown[], items: string[]) => {
  if (products.length !== items.length) {
    throw new BadRequestError('Некоторые товары не найдены');
  }
};

const computeTotal = (products: any[]) => products.reduce((sum, product) => {
  if (!product.price) {
    throw new BadRequestError('Товар не продается');
  }
  return sum + product.price;
}, 0);

export default async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  try {
    const products = await Product.find({ _id: { $in: items } });
    checkAllItemsExist(products, items);
    const totalPrice = computeTotal(products);

    if (totalPrice !== total) {
      return next(
        new BadRequestError(
          'Общая сумма заказа не совпадает со стоимостью товаров',
        ),
      );
    }

    const orderId = simpleFaker.string.uuid();
    return res.status(200).json({
      status: 'success',
      id: orderId,
      total: totalPrice,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return next(error);
    }
    return next(new Error(`Ошибка при создании заказа: ${(error as Error).message}`));
  }
};
