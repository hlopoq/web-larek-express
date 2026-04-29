import winston from 'winston';
import expressWinston from 'express-winston';

const createFileTransport = (filename: string) =>
  new winston.transports.File({ filename });

const requestLogger = expressWinston.logger({
  transports: [createFileTransport('request.log')],
  format: winston.format.json(),
  msg: '{{req.method}} {{req.url}}',
});

const errorLogger = expressWinston.errorLogger({
  transports: [createFileTransport('error.log')],
  format: winston.format.json(),
  msg: '{{req.method}} {{req.url}}',
});

export { requestLogger, errorLogger };