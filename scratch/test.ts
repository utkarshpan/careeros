import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:dev.db"
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Checking DB connection with adapter...");
  const users = await prisma.user.findMany();
  console.log("Success! Users in database:", users);
}

main()
  .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
