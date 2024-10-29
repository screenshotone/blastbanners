import { Pirsch } from "pirsch-sdk/web";

const client = process.env.NEXT_PUBLIC_PIRSCH_CODE
    ? new Pirsch({
          identificationCode: process.env.NEXT_PUBLIC_PIRSCH_CODE,
      })
    : null;

export async function hit() {
    if (!client) {
        return;
    }

    await client.hit();
}
