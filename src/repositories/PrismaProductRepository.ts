import { PrismaClient } from '@prisma/client';
import { IProduct, ProductFactory } from "../domain";
import { IProductRepository } from "./IProductRepository";

export class PrismaProductRepository implements IProductRepository {
  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async findProduct(searchId: number): Promise<IProduct | null> {
    const product = await this.prisma.product.findUnique({ where: { id: searchId } });

    if (product === null) {
      return null;
    }

    return ProductFactory.createProduct(product);
  }
}
