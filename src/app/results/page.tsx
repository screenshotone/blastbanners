import { getGameSession, getTopResults } from "@/lib/game";
import { cn, getFlagEmoji } from "@/lib/utils";

export default async function ResultsPage({
    searchParams,
}: {
    searchParams: { session: string };
}) {
    const highlightSession = searchParams.session
        ? await getGameSession(searchParams.session)
        : null;

    const sessions = [
        ...(await getTopResults()).filter(
            (session) => session.sessionKey !== highlightSession?.sessionKey
        ),
        ...(highlightSession ? [highlightSession] : []),
    ];

    sessions.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Blast Banners 💥</h1>
            <div className="w-[1280px] h-[720px] flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4">
                    {sessions.map((session) => (
                        <div
                            key={session.sessionKey}
                            className={cn(
                                "bg-white text-xl font-bold flex justify-between items-center w-[400px] border-2 border-gray-400 rounded-xl shadow-lg p-4",
                                session.sessionKey ===
                                    highlightSession?.sessionKey
                                    ? "border-blue-400 shadow-blue-400 my-4"
                                    : ""
                            )}
                        >
                            <div>
                                {session.endedAt && session.startedAt
                                    ? Math.round(
                                          (session.endedAt.getTime() -
                                              session.startedAt.getTime()) /
                                              1000
                                      )
                                    : 0}{" "}
                                seconds
                            </div>
                            <div className="text-2xl text-blue-600">
                                {session.score}
                            </div>
                            <div>
                                {session.countryCode
                                    ? getFlagEmoji(session.countryCode)
                                    : "🔥"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
