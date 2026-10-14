import { AppError } from ".";

export class ProductNotFoundError extends AppError {
  constructor(message: string = 'Produto não encontrado') {
    super(message, 400);
  }
}
