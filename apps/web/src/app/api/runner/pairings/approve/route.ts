import { NextResponse } from "next/server";
import { PairingApproveInputSchema } from "@docketrail/contracts";
import { approvePairingByUserCode } from "@/lib/pairings-store";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = PairingApproveInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { code: "INVALID_USER_CODE", message: "User code must be 8 alphanumeric characters." },
        { status: 422 }
      );
    }

    const pairing = approvePairingByUserCode(parsed.data.userCode);

    if (!pairing) {
      return NextResponse.json(
        { code: "PAIRING_NOT_FOUND", message: "Invalid or expired verification code." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      approved: true,
      userCode: pairing.userCode,
      approvedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ code: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
