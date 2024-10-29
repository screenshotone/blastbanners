import { db } from "@/lib/db";
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator";

export async function endGameSession(sessionKey: string, score: number) {
    await db.$transaction(async (tx) => {
        if (
            (await tx.gameSession.count({
                where: {
                    sessionKey,
                    endedAt: { not: null },
                },
            })) > 0
        ) {
            throw new Error(`The game session "${sessionKey}" already ended`);
        }

        await tx.gameSession.update({
            where: { sessionKey },
            data: { score, endedAt: new Date() },
        });
    });
}

export async function getTopResults() {
    return db.gameSession.findMany({
        where: { endedAt: { not: null } },
        orderBy: { score: "desc" },
        take: 5,
    });
}

export async function createGameSession() {
    // TODO: add check per IP address
    // add fingerprint for security?!
    // add country code

    const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 2,
        separator: " ",
        style: "capital",
    });

    const sessionKey = crypto.randomUUID();
    const gameSession = await db.gameSession.create({
        data: {
            sessionKey,
            name: shortName,
        },
    });

    return gameSession.sessionKey;
}

export async function getGameSession(sessionKey: string) {
    return db.gameSession.findUnique({
        where: { sessionKey },
    });
}
