import logger from "../lib/logger";
import { IPaymentMethod } from "./IPaymentMethod";
import { InvalidPaymentDetailsError } from "../errors";

export class PixPayment implements IPaymentMethod {
  process(details: any): void {
    if (
      typeof details?.pixKey !== "string" ||
      details?.pixKey.trim().length === 0
    ) {
      throw new InvalidPaymentDetailsError(
        `Detalhes de pagamento inválidos para PIX`,
      );
    }

    logger.info(`Processando PIX de chave ${details.pixKey}...`);
  }
}
