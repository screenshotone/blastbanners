import { Client, TakeOptions } from "screenshotone-api-sdk";

const client = new Client(
    process.env.SCREENSHOTONE_API_ACCESS_KEY!,
    process.env.SCREENSHOTONE_API_SECRET_KEY!
);

const cacheTtl = 2592000;

export async function renderScreenshot(websiteUrl: URL, format: "jpeg" | "png") {
    const screenshotUrl = await client.generateTakeURL(
        TakeOptions.url(websiteUrl.toString())
            .cache(true)
            .cacheTtl(cacheTtl)
            .blockCookieBanners(true)
            .blockBannersByHeuristics(true)
            .blockAds(true)
            .blockChats(true)
            .format(format)
    );

    const response = await fetch(screenshotUrl);
    const buffer = await response.arrayBuffer();

    return buffer;
}
