import Game from "@/components/Game";
import { db } from "@/lib/db";
import { getGameSession } from "@/lib/game";
import { randomNumberGenerator } from "@/lib/utils";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function GamePage({
    params,
}: {
    params: { session: string };
}) {
    const { session } = params;

    const gameSession = await getGameSession(session);
    if (!gameSession) {
        return notFound();
    }

    const generator = randomNumberGenerator(gameSession.sessionKey);
    const screenshots = await db.screenshot.findMany();

    const randomScreenshots = [...screenshots].sort(() => generator() - 0.5);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Blast Banners 💥</h1>
            <div className="flex flex-col items-center justify-center">
                <Game
                    sessionKey={gameSession.sessionKey}
                    startedAt={gameSession.startedAt}
                    screenshots={randomScreenshots}
                />
            </div>
        </div>
    );
}
