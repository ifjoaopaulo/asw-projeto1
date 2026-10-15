import { Request, Response } from "express";
import logger from "../lib/logger";
import { OrderService, OrderResult } from "../services";
import { AppError } from "../errors";

export class OrderController {
  constructor(private orderserv: OrderService) {}

  async startOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { customer, items, paymentMethod, paymentDetails } = req.body;

      const orderInfo: OrderResult = await this.orderserv.processOrder({
        customer,
        items,
        paymentMethod,
        paymentDetails,
      });

      return res.json({
        message: "Pedido processado com sucesso",
        orderId: orderInfo.orderId,
        emailPreview: orderInfo.previewUrl,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.httpCode).json({ error: error.message });
      }

      const message = error instanceof Error ? error.message : String(error);

      logger.error(`Um erro inesperado ocorreu: ${message}`);
      return res.status(500).json({ error: `Erro interno` });
    }
  }
}
