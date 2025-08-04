import * as dotenv from "dotenv";
import { PrismaClient } from "@/lib/generated/prisma";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

dotenv.config();

neonConfig.webSocketConstructor = ws;
const connectionString =
  `${process.env.DATABASE_URL}` ||
  "postgres://neondb_owner:npg_qtecB8ElOD2g@ep-aged-sea-ads02zv2-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString });

const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
