import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function IndexPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Blast Banners 💥</h1>
            <div className="relative w-[1280px] h-[720px] flex flex-col items-center justify-center">
                <Image
                    src="/tweets/dvassallo_1.png"
                    alt="Putting a cookie banner in your website is weak."
                    width={442}
                    height={243}
                    className="rounded-lg shadow-lg absolute top-0 left-0 transform -rotate-3 -z-10"
                />
                <Image
                    src="/tweets/dvassallo_2.png"
                    alt="I am a conformist."
                    width={441}
                    height={609}
                    className="rounded-lg shadow-lg absolute top-0 left-3/4 transform rotate-2 -z-10"
                />
                <Image
                    src="/tweets/simon_sarris.png"
                    alt="Can we stop this?"
                    width={296}
                    height={372}
                    className="rounded-lg shadow-lg absolute bottom-0 left-0 transform rotate-6"
                />
                <div className="flex flex-col items-center justify-center border-1 border-gray-400 rounded-xl shadow-lg p-6 bg-white">
                    <div className="p-6 max-w-[500px] space-y-4">
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
                            Declining cookie banners gives you a higher score than
                            accepting them.
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/game/new">Accept</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
