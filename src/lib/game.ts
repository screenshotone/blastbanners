import { db } from "@/lib/db";
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator";

const maxActiveGameSessions = 60;
export const maxActiveGameSessionWindowSeconds = 60 * 60; // 1 hour

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

export async function createGameSession(
    ipAddress: string | null,
    countryCode: string | null
) {
    return await db.$transaction(async (tx) => {
        let ipHash: string | null = null;
        if (ipAddress) {
            const encoder = new TextEncoder();
            const data = encoder.encode(ipAddress);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            ipHash = hashArray
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
        }

        const activeSessionCount = await tx.gameSession.count({
            where: {
                ipHash,
                endedAt: null,
            },
        });
        if (activeSessionCount > maxActiveGameSessions) {
            throw new Error(
                `The IP address "${ipAddress}" already has more than ${maxActiveGameSessions} active game sessions in the last ${maxActiveGameSessionWindowSeconds} seconds.`
            );
        }

        const shortName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
            length: 2,
            separator: " ",
            style: "capital",
        });

        const sessionKey = crypto.randomUUID();
        const gameSession = await tx.gameSession.create({
            data: {
                sessionKey,
                name: shortName,
                ipHash: ipHash,
                countryCode,
            },
        });

        return gameSession.sessionKey;
    });
}

export async function getGameSession(sessionKey: string) {
    return db.gameSession.findUnique({
        where: { sessionKey },
    });
}

export async function getActiveGameSession(sessionKey: string) {
    return db.gameSession.findUnique({
        where: { sessionKey, endedAt: null },
    });
}
