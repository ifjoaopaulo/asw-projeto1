import { PrismaClient } from "@prisma/client";
import { IOrderRepository, OrderData } from "./IOrderRepository";

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOrder(data: OrderData): Promise<number> {
    const order = await this.prisma.order.create({
      data: {
        customer: data.customer,
        items: JSON.stringify(data.items),
        total: data.total,
        status: data.status,
      },
    });

    return order.id;
  }
}
