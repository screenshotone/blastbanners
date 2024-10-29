import { removeOutdatedIpHashes } from "./lib/privacy";

export function register() {
    setInterval(() => {
        removeOutdatedIpHashes().then(() => {});
    }, 1000 * 60);
}
