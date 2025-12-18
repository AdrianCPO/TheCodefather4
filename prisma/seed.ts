import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }),
});

async function main() {
  await prisma.document.deleteMany(); // valfritt men bra
  await prisma.document.createMany({
    data: [
      { title: "Möte 1", content: "Beslut: Vi använder Next.js och SQLite." },
      { title: "Möte 2", content: "Budget: Vi håller det enkelt i MVP." },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
