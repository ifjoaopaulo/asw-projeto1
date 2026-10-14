import { PrismaClient } from '@prisma/client';
import { PrismaProductRepository } from '../repositories/';
import { PrismaOrderRepository } from '../repositories/';

async function main() {
  const prisma = new PrismaClient();
  const productRepo = new PrismaProductRepository(prisma);
  const orderRepo = new PrismaOrderRepository(prisma);

  console.log('--- Produtos ---');
  const book = await productRepo.findProduct(1);
  const ebook = await productRepo.findProduct(2);
  const missing = await productRepo.findProduct(999);

  console.log('Produto 1:', book);
  console.log('Frete produto 1 (esperado 10):', book?.calculateFreight());
  console.log('Produto 2:', ebook);
  console.log('Frete produto 2 (esperado 0):', ebook?.calculateFreight());
  console.log('Produto 999 (esperado null):', missing);

  console.log('--- Pedido ---');
  const orderId = await orderRepo.createOrder({
    customer: 'teste@ethereal.email',
    items: [
      { id: 1, name: 'Livro Teste', price: 50, type: 'physical', quantity: 2 },
    ],
    total: 110,
    status: 'confirmed',
  } as any);

  console.log('Pedido criado com id:', orderId);

  const saved = await prisma.order.findUnique({ where: { id: orderId } });
  console.log('Linha gravada no banco:', saved);
  console.log('Tipo de items (esperado string):', typeof saved?.items);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Falhou:', err);
  process.exit(1);
});
