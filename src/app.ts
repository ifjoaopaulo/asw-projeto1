import express from "express";
import { PrismaClient } from "@prisma/client";
import { EtherealMailProvider } from "./providers";
import { NotificationService } from "./services";
import {
  CreditCardPayment,
  DebitCardPayment,
  IPaymentMethod,
  PixPayment,
} from "./payments";
import { OrderService } from "./services";
import { OrderController } from "./controllers";
import { PrismaProductRepository, PrismaOrderRepository } from "./repositories";

const app = express();
app.use(express.json());

const prisma: PrismaClient = new PrismaClient();

const prismaProductRepo: PrismaProductRepository = new PrismaProductRepository(
  prisma,
);
const prismaOrderRepo: PrismaOrderRepository = new PrismaOrderRepository(
  prisma,
);

const ethereal: EtherealMailProvider = new EtherealMailProvider();

const notificationService: NotificationService = new NotificationService(
  ethereal,
);

const paymentMethods: Map<string, IPaymentMethod> = new Map<
  string,
  IPaymentMethod
>([
  ["credit_card", new CreditCardPayment()],
  ["debit_card", new DebitCardPayment()],
  ["pix", new PixPayment()],
]);

const orderService: OrderService = new OrderService(
  prismaProductRepo,
  prismaOrderRepo,
  paymentMethods,
  notificationService,
);

const orderController: OrderController = new OrderController(orderService);

app.post("/orders", (req, res) => orderController.startOrder(req, res));

export default app;
