import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const resolveError = (err: Error) => {
  if (
    err instanceof BadRequestError
    || err instanceof NotFoundError
    || err instanceof ConflictError
  ) {
    return { status: err.statusCode, message: err.message };
  }
  if (err instanceof CelebrateError) {
    return { status: 400, message: 'Ошибка валидации данных' };
  }
  if (err.message?.includes('E11000')) {
    return { status: 409, message: 'Товар с таким названием уже существует' };
  }
  return { status: 500, message: 'На сервере произошла ошибка' };
};

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = resolveError(err);
  res.status(status).json({ message });
};

export default errorHandler;
