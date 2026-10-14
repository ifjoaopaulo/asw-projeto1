import logger from "../lib/logger";
import { IProductRepository, IOrderRepository, ItemsOrderedData, OrderData } from "../repositories";
import { IPaymentMethod } from "../payments";
import { NotificationService } from "./NotificationService";
import { MailResult } from "../providers";
import { EmptyCartError, ProductNotFoundError, UnsupportedPaymentMethodError } from "../errors";

export interface OrderInfo {
  customer: string,
  items: { productId: number, quantity: number }[],
  paymentMethod: string,
  paymentDetails: any,
}

export interface OrderResult {
  orderId: number,
  previewUrl?: string,
}

export class OrderService {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly orderRepo: IOrderRepository,
    private readonly paymentMap: Map<string, IPaymentMethod>,
    private readonly notifications: NotificationService,
  ) { }

  async processOrder(order: OrderInfo): Promise<OrderResult> {
    if (!order.items || order.items.length === 0) {
      logger.error('Tentativa de compra com carrinho vazio.');
      throw new EmptyCartError();
    }

    const paying = this.paymentMap.get(order.paymentMethod);
    if (paying === undefined) {
      logger.error('Método de pagamento não suportado');
      throw new UnsupportedPaymentMethodError();
    }

    let orderTotal: number = 0;
    const productsInfo: ItemsOrderedData[] = [];
    const productsName: string[] = [];
    for (const i of order.items) {
      const product = await this.productRepo.findProduct(i.productId);

      if (product === null) {
        logger.error(`Produto ${i.productId} não encontrado`);
        throw new ProductNotFoundError(`Produto ${i.productId} não encontrado`);
      }

      orderTotal += (product.price * i.quantity) + product.calculateFreight();

      productsName.push(product.name);
      productsInfo.push({ productId: product.id, name: product.name, price: product.price, quantity: i.quantity });
    }

    paying.process(order.paymentDetails);

    const toOrder: OrderData = { customer: order.customer, items: productsInfo, total: orderTotal, status: 'confirmed' }
    const processedId: number = await this.orderRepo.createOrder(toOrder);

    const notificationOutput: MailResult = await this.notifications.sendNotification({ to: order.customer, orderId: processedId, total: orderTotal, products: productsName });

    return { orderId: processedId, previewUrl: notificationOutput.previewUrl };
  }
}
