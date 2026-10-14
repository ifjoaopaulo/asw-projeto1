import { IProduct } from "../domain";

export interface IProductRepository {
  findProduct(searchId: number): Promise<IProduct | null>;
}
