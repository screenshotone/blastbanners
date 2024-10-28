import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Rand from "rand-seed";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Do not use it for security-sensitive purposes.
 *
 * @param seed {string} The seed for random numbers.
 */
export function randomNumberGenerator(seed = "") {
    const r = new Rand(seed);

    return () => r.next();
}

export function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char: string) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
}
