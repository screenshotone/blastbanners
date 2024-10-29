import { db } from "./db";
import { maxActiveGameSessionWindowSeconds } from "./game";

export async function removeOutdatedIpHashes() {
    try {
        await db.gameSession.updateMany({
            data: { ipHash: null },
            where: {
                ipHash: { not: null },
                endedAt: {
                    lt: new Date(
                        Date.now() - maxActiveGameSessionWindowSeconds * 1000
                    ),
                },
            },
        });
    } catch (e) {
        console.error("Failed to remove outdated IP hashes:", e);
    }
}
