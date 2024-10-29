import Link from "next/link";
import Image from "next/image";
import { StartGameButton } from "@/components/StartGameButton";

export default function IndexPage() {
    return (
        <div className="flex flex-col md:gap-0 items-center md:justify-center md:h-screen">
            <h1 className="text-4xl font-bold mt-10 md:mt-0">
                Blast Banners 💥
            </h1>
            <div className="mt-10 md:mt-0 relative md:w-[1280px] md:h-[720px] flex flex-col items-center justify-center">
                <Image
                    src="/tweets/dvassallo_1.png"
                    alt="Putting a cookie banner in your website is weak."
                    width={442}
                    height={243}
                    priority
                    className="w-[90%] md:w-auto rounded-lg shadow-lg md:absolute md:top-0 md:-left-32 transform -rotate-3 z-10"
                />
                <Image
                    src="/tweets/dvassallo_2.png"
                    alt="I am a conformist."
                    width={353}
                    height={487}
                    priority
                    className="hidden md:block rounded-lg shadow-lg absolute top-16 -right-24 transform rotate-2 z-10"
                />
                <Image
                    src="/tweets/simon_sarris.png"
                    alt="Can we stop this?"
                    width={296}
                    priority
                    height={372}
                    className="hidden md:block rounded-lg shadow-lg absolute bottom-0 left-0 transform rotate-6"
                />
                <div className="mt-20 md:mt-0 max-w-[300px] md:max-w-[500px] flex flex-col items-center justify-center border-2 border-slate-600 rounded-xl shadow-lg p-6 bg-white z-20">
                    <div className="p-4 md:p-6 space-y-4">
                        <p>
                            Ever been trapped under the invasion of &quot;Accept
                            All Cookies&quot; pop-ups?
                        </p>
                        <p>
                            Your screen is crowded by &quot;Necessary and
                            Optional,&quot; &quot;Accept or Manage,&quot; and
                            all the &quot;Why are there so many?!&quot; banners?
                        </p>
                        <p>It is your payback time!</p>
                        <p className="font-bold">
                            Your mission is to annihilate every annoying cookie
                            banner that dares to invade your screen—no cookie
                            banners will survive this purge!
                        </p>
                        <p>
                            Declining cookie banners gives you a higher score
                            than accepting them.
                        </p>
                    </div>
                    <StartGameButton />
                    <p className="text-sm p-4">
                        By starting the game, you accept the BlastBanners.com{" "}
                        <Link
                            className="underline hover:no-underline"
                            href="/privacy"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
            <div className="py-10 md:p-0 md:absolute md:bottom-20 md:left-1/2 w-full">
                <p className="text-center md:text-left  text-sm md:text-base">
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
    );
}
