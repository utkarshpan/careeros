import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const getClient = () => {
  const adapter = new PrismaBetterSqlite3({
    url: "file:dev.db",
  });
  return new PrismaClient({ adapter });
};

export const prisma = globalThis.prisma || getClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
