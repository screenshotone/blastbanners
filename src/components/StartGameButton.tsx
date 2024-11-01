"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { hit } from "@/lib/pirsch";

export function StartGameButton() {
    const router = useRouter();

    return (
        <Button
            
            size="lg"
            className="text-xl font-bold p-6"
            onClick={async () => {
                try {
                    await hit();                    
                } catch (error) {
                    console.error(error);
                }
                
                router.push("/game/new");
            }}
        >
            Accept
        </Button>
    );
}
