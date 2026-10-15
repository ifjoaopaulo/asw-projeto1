import { AppError } from "./AppError";

export class EmptyCartError extends AppError {
  constructor(message: string = "Carrinho vazio") {
    super(message, 400);
  }
}
