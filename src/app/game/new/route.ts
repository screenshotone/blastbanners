import { createGameSession } from "@/lib/game";
import { NextResponse } from "next/server";

import requestIp from "request-ip";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        let ipAddress =
            request.headers.get("CF-Connecting-IP") ||
            requestIp.getClientIp({
                headers: Object.fromEntries(request.headers),
            });
        let countryCode = request.headers.get("CF-IPCountry") || null;

        if (
            ipAddress &&
            !ipAddress.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) &&
            !ipAddress.match(/^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/)
        ) {
            ipAddress = null;
        }
        if (countryCode && !countryCode.match(/^[A-Z]{2}$/)) {
            countryCode = null;
        }

        const gameSessionId = await createGameSession(ipAddress, countryCode);

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
