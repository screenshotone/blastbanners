import nextEnv from "@next/env";
if (nextEnv && "loadEnvConfig" in nextEnv) {
    nextEnv.loadEnvConfig(process.cwd());
} else {
    // eslint-disable-next-line
    require("@next/env").loadEnvConfig(process.cwd());
}

import { db } from "@/lib/db";
import { renderScreenshot } from "@/lib/screenshots";
import fs from "fs";

export async function main() {
    if (await db.screenshot.count() > 0) {
        return;
    }

    const websites = [
        { url: "https://oscarstories.com/", name: "Oscar Stories" },
        { url: "https://shipixen.com/", name: "Shipixen" },
        { url: "https://logsnag.com/", name: "LogSnag" },
        { url: "https://nextjs.org/", name: "Next.js" },
        { url: "https://busy.bar/", name: "Busy Status Bar" },
        { url: "https://talkbase.io/", name: "Talkbase" },
        { url: "https://www.plutio.com/", name: "Plutio" },
        { url: "https://www.todesktop.com/", name: "ToDesktop" },
        { url: "https://unicornplatform.com/", name: "Unicorn Platform" },
        { url: "https://remix.run/", name: "Remix" },
    ];

    const screenshots = [];
    for (const website of websites) {
        const name = website.name.toLowerCase().replace(/ /g, "-");
        const path = `screenshots/${name}.jpeg`;
        const storePath = `public/${path}`;
        
        let buffer;
        try {
            await fs.promises.access(storePath);
        } catch {
            buffer = await renderScreenshot(new URL(website.url), "jpeg");
            await fs.promises.writeFile(storePath, Buffer.from(buffer));
        }

        screenshots.push({
            websiteUrl: website.url,
            path,
            name: website.name,
        });
    }

    await db.screenshot.createMany({
        data: screenshots,
    });
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
