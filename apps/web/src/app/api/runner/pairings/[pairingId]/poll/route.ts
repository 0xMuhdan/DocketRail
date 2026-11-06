import { NextResponse } from "next/server";
import { PairingPollInputSchema } from "@docketrail/contracts";
import { pollPairingStatus } from "@/lib/pairings-store";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ pairingId: string }> }
) {
  try {
    const resolvedParams = await params;
    const json = await req.json();
    const parsed = PairingPollInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { code: "INVALID_POLL_PAYLOAD", message: parsed.error.errors[0]?.message },
        { status: 422 }
      );
    }

    const result = pollPairingStatus(resolvedParams.pairingId, parsed.data.verifier);

    if (!result) {
      return NextResponse.json(
        { code: "PAIRING_EXPIRED_OR_INVALID", message: "Pairing challenge expired or verifier mismatch." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      runnerId: result.runnerId,
      token: result.token || null,
      tokenExpiresAt: result.tokenExpiresAt || null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ code: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
