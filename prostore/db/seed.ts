import { PrismaClient } from "@/lib/generated/prisma";
import SampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: SampleData.products,
  });

  console.log("Database successfully seeded");
}

main();
