import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

// Fix for "too many clients"
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (!global.prisma) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  prisma = global.prisma;
}

prisma.$connect();
