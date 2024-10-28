import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Blast Banners 💥</h1>
            <div className="w-[1280px] h-[720px] flex flex-col items-center justify-center">
                <Button asChild size="lg">
                    <Link href="/game/new">Play</Link>
                </Button>
            </div>
        </div>
    );
}
