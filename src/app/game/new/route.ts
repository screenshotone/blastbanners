import { createGameSession } from "@/lib/game";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const gameSessionId = await createGameSession();

        const redirectUrl =
            process.env.NEXT_PUBLIC_BASE_URL + "/game/" + gameSessionId;

        return NextResponse.redirect(redirectUrl, { status: 303 });
    } catch (error) {
        console.error("Error creating game session:", error);

        return new Response("Failed to create new game session.", {
            status: 500,
        });
    }
}
