export interface ItemsOrderedData {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  customer: string;
  items: ItemsOrderedData[];
  total: number;
  status: string;
}

export interface IOrderRepository {
  createOrder(data: OrderData): Promise<number>;
}
