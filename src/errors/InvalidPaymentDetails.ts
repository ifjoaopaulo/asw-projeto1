import { AppError } from "./AppError";

export class InvalidPaymentDetailsError extends AppError {
  constructor(message: string = "Detalhes de pagamento inválidos") {
    super(message, 400);
  }
}
