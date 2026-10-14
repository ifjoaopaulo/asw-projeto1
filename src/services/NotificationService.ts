import { IMailProvider, MailMessage, MailResult } from "../providers";

interface OrderConfirmationData {
  to: string;
  orderId: number;
  total: number;
  products: string[];
}

export class NotificationService {
  constructor(private provider: IMailProvider) { };

  buildHtml(order: OrderConfirmationData): string {
    return `
      <h1>Pedido Confirmado!</h1>
      <p>Olá, seu pedido <b>#${order.orderId}</b> foi processado com sucesso.</p>
      <p>Total: <strong>R$ ${order.total}</strong></p>
      <ul>
        ${order.products.map(p => `<li>${p}</li>`).join('')}
      </ul>
    `
  }

  buildNotification(data: OrderConfirmationData): MailMessage {
    let mail: MailMessage = {
      to: order.to,

    }
  }
}
