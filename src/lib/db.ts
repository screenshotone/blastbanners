import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }

    prisma = global.cachedPrisma;
}

const initializePrisma = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    await prisma.$queryRaw`PRAGMA busy_timeout = 5000;`;
};
initializePrisma()
    .then(() => {})
    .catch((error) => console.error(error));

export type TransactionalPrismaClient = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export const db = prisma;
