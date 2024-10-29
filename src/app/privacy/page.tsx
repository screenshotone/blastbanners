import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <div className="mt-10 md:mt-0 bg-white p-6 rounded-lg shadow-md max-w-[300px] md:max-w-[500px] border-slate-600 border-2 space-y-4">
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <p>
                    By accepting and starting the game, you accept the privacy
                    policy:
                </p>
                <p>
                    1. Your IP address is hashed and will be stored for a
                    limited period of time to prevent abuse of the service. It
                    is only used to for rate limiting.
                </p>
                <p>
                    2. Your country code is stored to show the country of the
                    player in the leaderboard.
                </p>
                <p>
                    3.{" "}
                    <Link
                        href="https://pirsch.io/privacy"
                        className="underline hover:no-underline"
                    >
                        A GDPR-compliant analytics software
                    </Link>{" "}
                    is used to analyze website usage by visitors.
                </p>
                <p>
                    In case of any concerns, or questions, please, reach out
                    immediately at{" "}
                    <Link href="mailto:support@blastbanners.com">
                        support@blastbanners.com
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
