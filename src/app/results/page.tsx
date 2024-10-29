import { Confetti } from "@/components/Confetti";
import { getGameSession, getTopResults } from "@/lib/game";
import { cn, getFlagEmoji } from "@/lib/utils";
import Link from "next/link";

const getMedalEmoji = (index: number) => {
    if (index == 0) {
        return "🥇";
    }
    if (index == 1) {
        return "🥈";
    }
    if (index == 2) {
        return "🥉";
    }

    return "";
};

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
        <>
            <div className="flex flex-col items-center justify-center md:h-screen">
                <Link href="/" prefetch={false}>
                    <h1 className="mt-10 md:mt-0 text-4xl font-bold">
                        Blast Banners 💥
                    </h1>
                </Link>
                <div className="mt-10 md:mt-0 md:w-[1280px] md:h-[720px] flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-4">
                        {sessions.map((session, i) => (
                            <div
                                key={session.sessionKey}
                                className={cn(
                                    "bg-white text-xl font-bold flex flex-col gap-4 md:gap-4 md:flex-row justify-between md:items-center w-[300px] md:w-[600px] border-2 border-gray-400 rounded-xl shadow-lg p-4",
                                    session.sessionKey ===
                                        highlightSession?.sessionKey
                                        ? "border-blue-400 shadow-blue-400 my-4"
                                        : ""
                                )}
                            >
                                <div className="min-w-[300px]">
                                    {getMedalEmoji(i)} {session.name}
                                </div>
                                <div className="grow justify-between flex flex-row items-center gap-10 md:gap-0">
                                    <div className="text-sm text-gray-500">
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
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 md:mt-0 md:absolute md:bottom-20 md:left-0 w-full">
                    <p className="text-center text-sm md:text-base">
                        All screenshots are provided by{" "}
                        <Link
                            href="https://screenshotone.com"
                            prefetch={false}
                            className="underline hover:no-underline"
                        >
                            ScreenshotOne
                        </Link>
                        , and the code is{" "}
                        <Link
                            href="https://github.com/screenshotone/blastbanners"
                            prefetch={false}
                            className="underline hover:no-underline"
                        >
                            open source
                        </Link>
                        .
                    </p>
                </div>
            </div>
            {highlightSession && <Confetti />}
        </>
    );
}
