import { NextResponse } from "next/server";
import { generateSubmissionPackage } from "@docketrail/reporting";
import { RequestExportInputSchema } from "@docketrail/contracts";
import {
  SAMPLE_PROJECT,
  SAMPLE_METADATA,
  SAMPLE_RUN,
  SAMPLE_PLAN,
  SAMPLE_REQUIREMENTS,
  SAMPLE_ORIGINS,
  SAMPLE_CONTRACTS,
  SAMPLE_TRANSACTIONS,
} from "@/lib/sample-data";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const resolvedParams = await params;
    const json = await req.json();
    const parsed = RequestExportInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { code: "VALIDATION_ERROR", message: parsed.error.errors[0]?.message },
        { status: 422 }
      );
    }

    // Assemble deterministic package using @docketrail/reporting
    const result = await generateSubmissionPackage({
      projectName: SAMPLE_PROJECT.displayName,
      projectId: SAMPLE_PROJECT.id,
      runId: resolvedParams.runId,
      mode: SAMPLE_RUN.mode,
      applicationUrl: SAMPLE_PROJECT.applicationUrl,
      repoUrl: SAMPLE_PROJECT.repoUrl,
      submissionStage: SAMPLE_PROJECT.submissionStage,
      sourceCommit: SAMPLE_RUN.sourceCommit,
      metadata: SAMPLE_METADATA,
      plan: SAMPLE_PLAN,
      summary: SAMPLE_RUN.captureSummary,
      results: SAMPLE_REQUIREMENTS,
      origins: SAMPLE_ORIGINS,
      contracts: SAMPLE_CONTRACTS,
      transactions: SAMPLE_TRANSACTIONS,
      payments: [
        {
          attemptId: "att-001",
          purpose: "order_compute_vm",
          providerId: "usebuy_google_vm",
          tokenAddress: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
          decimals: 18,
          quotedAtomic: "67011000000000000",
          settledMicroUsd: 67011,
          state: "settled",
          txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          chainId: 42220,
        },
        {
          attemptId: "att-002",
          purpose: "cencori_completion",
          providerId: "cencori",
          tokenAddress: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
          decimals: 18,
          quotedAtomic: "10000000000000000",
          settledMicroUsd: 10000,
          state: "settled",
          txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          chainId: 42220,
        },
      ],
      evidenceItems: [],
    });

    // In a deployment with Supabase Storage, upload result.zipBuffer to bucket 'docketrail-exports'
    // and return signed download URL.
    return NextResponse.json({
      exportId: crypto.randomUUID(),
      runId: resolvedParams.runId,
      state: "ready",
      byteLength: result.byteLength,
      evidenceIndexHash: result.evidenceIndexHash,
      fileManifest: result.fileManifest,
      createdAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Export generation failed";
    return NextResponse.json({ code: "EXPORT_FAILED", message: msg }, { status: 500 });
  }
}
