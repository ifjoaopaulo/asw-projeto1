import { IMailProvider, MailMessage, MailResult } from "../providers";

export interface OrderConfirmationData {
  to: string;
  orderId: number;
  total: number;
  products: string[];
}

export class NotificationService {
  constructor(private provider: IMailProvider) {}

  private buildHtml(data: OrderConfirmationData): string {
    return `
      <h1>Pedido Confirmado!</h1>
      <p>Olá, seu pedido <b>#${data.orderId}</b> foi processado com sucesso.</p>
      <p>Total: <strong>R$ ${data.total}</strong></p>
      <ul>
        ${data.products.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    `;
  }

  private buildNotification(data: OrderConfirmationData): MailMessage {
    let mail: MailMessage = {
      to: data.to,
      subject: `Pedido ${data.orderId} Confirmado!`,
      text: `Olá, seu pedido #${data.orderId} no valor de R$ ${data.total} foi confirmado.`,
      html: this.buildHtml(data),
    };

    return mail;
  }

  async sendNotification(data: OrderConfirmationData): Promise<MailResult> {
    let mail: MailMessage = this.buildNotification(data);

    return this.provider.sendMail(mail);
  }
}
