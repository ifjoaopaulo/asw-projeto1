import { IProduct } from "./index";

export class PhysicalProduct implements IProduct {
  type: string = "physical";

  constructor(
    public id: number,
    public name: string,
    public price: number,
  ) {}

  calculateFreight(): number {
    return 10;
  }
}
