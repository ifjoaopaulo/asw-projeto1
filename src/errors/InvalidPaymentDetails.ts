import { AppError } from '.';

export class InvalidPaymentDetailsError extends AppError {
  constructor(message: string = 'Detalhes de pagamento inválidos') {
    super(message, 400);
  }
}
