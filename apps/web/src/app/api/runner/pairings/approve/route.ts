import { NextResponse } from "next/server";
import { PairingApproveInputSchema } from "@docketrail/contracts";

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

    // In a live Supabase environment:
    // Update public.runner_pairings set approved_owner_id = auth.uid() where user_code_hash = sha256(userCode)
    return NextResponse.json({
      approved: true,
      userCode: parsed.data.userCode,
      approvedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ code: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
