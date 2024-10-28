import { endGameSession } from "@/lib/game";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
    request: Request,
    { params }: { params: { session: string } }
) {
    try {
        const data = (await request.json()) as { score: number };

        await endGameSession(params.session, data.score);

        const redirectUrl =
            process.env.NEXT_PUBLIC_BASE_URL +
            "/results?" +
            new URLSearchParams({ session: params.session }).toString();

        return NextResponse.json({ redirectUrl });
    } catch (error) {
        console.error("Error updating the game session:", error);

        return new Response("Failed to update the game session.", {
            status: 500,
        });
    }
}
