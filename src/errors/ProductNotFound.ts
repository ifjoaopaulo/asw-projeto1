import { AppError } from "./AppError";

export class ProductNotFoundError extends AppError {
  constructor(message: string = "Produto não encontrado") {
    super(message, 400);
  }
}
