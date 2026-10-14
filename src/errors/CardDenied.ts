import { AppError } from './AppError';

export class CardDeniedError extends AppError {
  constructor(message: string = 'Cartão recusado') {
    super(message, 400);
  }
}
