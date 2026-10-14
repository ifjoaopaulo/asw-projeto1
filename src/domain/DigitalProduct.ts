import { IProduct } from './index';

export class DigitalProduct implements IProduct {
  type: string = "digital";

  constructor(
    public id: number,
    public name: string,
    public price: number,
  ) { }

  calculateFreight(): number {
    return 0;
  }
}
