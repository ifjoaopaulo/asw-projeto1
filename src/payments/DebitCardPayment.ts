import logger from '../lib/logger';
import { IPaymentMethod } from './IPaymentMethod';
import { InvalidPaymentDetailsError } from '../errors';

export class DebitCardPayment implements IPaymentMethod {
  process(details: any): void {
    if (typeof details?.cvv !== 'string') {
      throw new InvalidPaymentDetailsError('Detalhes de pagamento inválidos para Cartão de Débito');
    }
    logger.info('Processando débito...');
  }
}
