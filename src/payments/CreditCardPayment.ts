import logger from '../lib/logger';
import { IPaymentMethod } from './IPaymentMethod';
import { CardDeniedError, InvalidPaymentDetailsError } from '../errors';

export class CreditCardPayment implements IPaymentMethod {
  process(details: any): void {
    if (
      details === undefined
      || details === null
      || typeof details.cardNumber !== 'string'
      || typeof details !== 'object'
      || typeof details.cvv !== 'string'
    ) {
      throw new InvalidPaymentDetailsError(`Detalhes de pagamento inválidos para Cartão de Crédito`);
    }

    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)}`);

    if (details.cvv === '000') {
      throw new CardDeniedError(`Cartão recusado`);
    }
  }
}
