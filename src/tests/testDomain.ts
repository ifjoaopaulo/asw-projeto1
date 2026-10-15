import { PhysicalProduct, DigitalProduct, ProductFactory } from "../domain";

let physBook: PhysicalProduct = ProductFactory.createProduct({
  id: 1,
  name: "Clean Code",
  price: 10,
  type: "physical",
});
let digiBook: DigitalProduct = ProductFactory.createProduct({
  id: 2,
  name: "The pragmatic engineer",
  price: 10,
  type: "digital",
});
let unknownBook = ProductFactory.createProduct({
  id: 3,
  name: "Hello?",
  price: 5,
  type: "subscription",
});

console.log(physBook, `Freight: ${physBook.calculateFreight()}`);
console.log(digiBook, `Freight: ${digiBook.calculateFreight()}`);
console.log(unknownBook, `Freight: ${unknownBook.calculateFreight()}`);
