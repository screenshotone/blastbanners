"use client";

import { Screenshot } from "@prisma/client";
import { Banner } from "./Banner";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { randomNumberGenerator } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BannerOptions {
    position: {
        top: number;
        left: number;
    };
    show: boolean;
    acceptedFirst: boolean;
    swapVariants: boolean;
    language: "en" | "de";
}

interface Response {
    time: number;
    accepted: boolean;
}

export default function Game({
    startedAt,
    screenshots,
    sessionKey,
}: {
    startedAt: Date;
    screenshots: Screenshot[];
    sessionKey: string;
}) {
    const router = useRouter();
    const animationFrameRef = useRef<number>();

    const generator = useMemo(
        () => randomNumberGenerator(sessionKey),
        [sessionKey]
    );

    const [responses, setResponses] = useState<Response[]>([]);

    const [currentRoundStartedAt, setCurrentRoundStartedAt] =
        useState<Date>(startedAt);

    const [elapsedTime, setElapsedTime] = useState<number>(0);
    useEffect(() => {
        const updateElapsedTime = () => {
            const now = new Date();
            const elapsedSeconds = (now.getTime() - startedAt.getTime()) / 1000;
            setElapsedTime(elapsedSeconds);
        };

        const timer = setInterval(updateElapsedTime, 1);
        updateElapsedTime();

        return () => clearInterval(timer);
    }, [startedAt]);

    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [processing, setProcessing] = useState(false);

    const moveBanner = () => {
        setCurrentBanner((prev) => {
            const newTop = prev.position.top + (generator() * 2 - 1) * 5;
            const newLeft = prev.position.left + (generator() * 2 - 1) * 5;

            const boundedTop = Math.max(0, Math.min(400, newTop));
            const boundedLeft = Math.max(0, Math.min(700, newLeft));

            return {
                ...prev,
                position: {
                    top: boundedTop,
                    left: boundedLeft,
                },
            };
        });

        animationFrameRef.current = requestAnimationFrame(moveBanner);
    };

    const onResponded = async (accepted: boolean) => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (processing) {
            return;
        }

        if (currentIndex === screenshots.length - 1) {
            setProcessing(true);

            const response = await fetch(`/game/${sessionKey}/end`, {
                method: "POST",
                body: JSON.stringify({
                    score,
                }),
            });

            if (!response.ok) {
                console.error("Failed to end the game session");
                setProcessing(false);
                return;
            }

            const data = (await response.json()) as { redirectUrl: string };

            router.push(data.redirectUrl);
            return;
        }

        setCurrentIndex((currentIndex) => currentIndex + 1);
        setCurrentRoundStartedAt(new Date());
        setResponses([
            ...responses,
            {
                time: new Date().getTime() - currentRoundStartedAt.getTime(),
                accepted,
            },
        ]);

        const randomTop = Math.floor(generator() * 400);
        const randomLeft = Math.floor(generator() * 700);

        setCurrentBanner({
            position: { top: randomTop, left: randomLeft },
            show: true,
            acceptedFirst: generator() < 0.5,
            swapVariants: generator() < 0.5,
            language: generator() < 0.5 ? "en" : "de",
        });

        animationFrameRef.current = requestAnimationFrame(moveBanner);
    };

    useEffect(() => {
        if (responses.length === 0) {
            return;
        }

        const totalScore = responses.reduce((s, response) => {
            const baseScore = response.accepted ? 50 : 100;
            const timeMultiplier = Math.max(0.8, 1 - response.time / 2000);

            return s + baseScore * timeMultiplier;
        }, 0);

        setScore(totalScore);
    }, [responses]);

    const [progress, setProgress] = useState(
        (currentIndex / screenshots.length) * 100
    );
    const [currentScreenshot, setCurrentScreenshot] = useState<Screenshot>(
        screenshots[currentIndex]
    );
    useEffect(() => {
        setCurrentScreenshot(screenshots[currentIndex]);
        setProgress((currentIndex / screenshots.length) * 100);
    }, [currentIndex, screenshots]);

    const [currentBanner, setCurrentBanner] = useState<BannerOptions>({
        position: { top: 28, left: 32 },
        show: true,
        acceptedFirst: false,
        swapVariants: false,
        language: "en",
    });

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(moveBanner);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div className="py-6 flex justify-between text-2xl">
                <div className="font-bold text-blue-600">{score}</div>
                <div
                    className={`font-bold ${
                        elapsedTime < 10
                            ? "text-green-600"
                            : elapsedTime < 20
                            ? "text-orange-600"
                            : "text-red-600 animate-pulse"
                    }`}
                >
                    {elapsedTime.toFixed(1)}
                </div>
            </div>
            <div className="relative">
                <Image
                    src={`/${currentScreenshot.path}`}
                    alt={`A screenshot of ${currentScreenshot.name}`}
                    key={currentScreenshot.websiteUrl}
                    className="rounded-xl border-2 border-gray-400 shadow-lg "
                    width={1280}
                    height={720}
                    priority
                />
                <div
                    style={{
                        position: "absolute",
                        top: `${currentBanner.position.top}px`,
                        left: `${currentBanner.position.left}px`,
                        transition: "all 0.1s ease-out",
                    }}
                >
                    {currentBanner.show && (
                        <Banner
                            language={currentBanner.language}
                            key={currentScreenshot.path}
                            onResponded={onResponded}
                            swapVariants={currentBanner.swapVariants}
                            acceptedFirst={currentBanner.acceptedFirst}
                        />
                    )}
                </div>
            </div>
            <div className="py-6">
                <Progress value={progress} className="w-[100%]" />
            </div>
        </div>
    );
}
