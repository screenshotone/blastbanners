import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const totalGames = await db.gameSession.count();
        const gamesEnded = await db.gameSession.count({
            where: {
                endedAt: {
                    not: null,
                },
            },
        });
        const top3Scores = await db.gameSession.findMany({
            orderBy: {
                score: "desc",
            },
            take: 3,
        });

        return NextResponse.json({
            totalGames,
            gamesEnded,
            gamesEndedPercentage: (gamesEnded / totalGames) * 100,
            top3Scores: top3Scores.map((game) => {
                return { score: game.score, countryCode: game.countryCode };
            }),
        });
    } catch (error) {
        console.error("Error computing metrics:", error);

        return new Response("Failed to compute metrics.", {
            status: 500,
        });
    }
}
