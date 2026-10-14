import { AppError } from './AppError';

export class UnsupportedPaymentMethodError extends AppError {
  constructor(message: string = 'Tipo de pagamento não suportado') {
    super(message, 400);
  }
}
