import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Banner({
    language,
    onResponded,
    acceptedFirst,
    swapVariants,
}: {
    language: "en" | "de";
    onResponded: (accepted: boolean) => Promise<void>;
    acceptedFirst: boolean;
    swapVariants: boolean;
}) {
    const [isExploding, setIsExploding] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const onClick = (accepted: boolean) => {
        setIsExploding(true);
        setTimeout(() => {
            setIsVisible(false);
            onResponded(accepted);
        }, 500);
    };

    const texts = (() => {
        switch (language) {
            case "de":
                return {
                    title: "Wir schätzen Ihre Privatsphäre",
                    content:
                        "Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu gewährleisten.",
                    accept: "Akzeptieren",
                    decline: "Ablehnen",
                };
            default:
                return {
                    title: "We value your privacy",
                    content:
                        "We use cookies to ensure you get the best experience on our website.",
                    accept: "Accept",
                    decline: "Decline",
                };
        }
    })();

    return (
        isVisible && (
            <Card
                className={cn(
                    "max-w-[280px] md:max-w-[300px] transition-all duration-500 text-sm md:text-base",
                    isExploding && "scale-150 opacity-0",
                    !isVisible && "hidden"
                )}
            >
                <CardHeader>
                    <CardTitle>{texts.title}</CardTitle>
                </CardHeader>
                <CardContent>{texts.content}</CardContent>
                <CardFooter className="flex justify-between">
                    {acceptedFirst ? (
                        <>
                            <Button
                                variant={swapVariants ? "outline" : "default"}
                                onClick={() => onClick(true)}
                            >
                                {texts.accept}
                            </Button>
                            <Button
                                variant={swapVariants ? "default" : "outline"}
                                onClick={() => onClick(false)}
                            >
                                {texts.decline}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant={swapVariants ? "outline" : "default"}
                                onClick={() => onClick(false)}
                            >
                                {texts.decline}
                            </Button>
                            <Button
                                variant={swapVariants ? "default" : "outline"}
                                onClick={() => onClick(true)}
                            >
                                {texts.accept}
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        )
    );
}
