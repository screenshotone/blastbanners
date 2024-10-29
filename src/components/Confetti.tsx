"use client";

import ReactConfettiBoom from "react-confetti-boom";

export function Confetti() {
    return (
        <ReactConfettiBoom
            mode="fall"
            shapeSize={8}
            particleCount={200}
        />
    );
}
