import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';

import uploadConfig from './config/upload';
import './database';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Caso um erro que foi setado detro da minha app
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  // Caso erro inesperado
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
