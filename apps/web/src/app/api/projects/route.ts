import { NextResponse } from "next/server";
import { CreateProjectInputSchema } from "@docketrail/contracts";
import { SAMPLE_PROJECT } from "@/lib/sample-data";

export async function GET() {
  // In a full Supabase environment, query public.projects where owner_id = auth.uid()
  return NextResponse.json({
    projects: [SAMPLE_PROJECT],
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = CreateProjectInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          code: "INVALID_TARGET",
          message: parsed.error.errors[0]?.message || "Validation failed",
          details: parsed.error.format(),
        },
        { status: 422 }
      );
    }

    const newProject = {
      id: crypto.randomUUID(),
      displayName: parsed.data.displayName,
      applicationUrl: parsed.data.applicationUrl,
      canonicalOrigin: new URL(parsed.data.applicationUrl).origin,
      repoUrl: parsed.data.repoUrl || null,
      repoSubdir: parsed.data.repoSubdir || null,
      submissionStage: parsed.data.submissionStage,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ code: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
