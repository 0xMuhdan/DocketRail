import { NextResponse } from "next/server";
import { PairingInitInputSchema } from "@docketrail/contracts";
import { createPairingChallenge } from "@/lib/pairings-store";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = PairingInitInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { code: "INVALID_PAIRING_INPUT", message: parsed.error.errors[0]?.message },
        { status: 422 }
      );
    }

    const { name, fingerprint, verifierHash } = parsed.data;
    const challenge = createPairingChallenge(name, fingerprint, verifierHash);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    return NextResponse.json({
      pairingId: challenge.id,
      userCode: challenge.userCode,
      verificationUrl: `${baseUrl}/runner/pair`,
      expiresAt: new Date(challenge.expiresAt).toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ code: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
