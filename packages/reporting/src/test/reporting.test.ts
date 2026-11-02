import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { escapeCsvCell, toCsvString, generateSubmissionPackage } from "../index.js";

describe("Reporting & CSV Security", () => {
  it("escapes spreadsheet formula injection characters", () => {
    // Formula characters: =, +, -, @, tab, CR
    assert.equal(escapeCsvCell("=1+1"), "'=1+1");
    assert.equal(escapeCsvCell("+cmd|' /C calc'!A0"), "'+cmd|' /C calc'!A0");
    assert.equal(escapeCsvCell("@SUM(A1:A10)"), "'@SUM(A1:A10)");
    assert.equal(escapeCsvCell("-20"), "'-20");

    // Regular strings should not be prefixed
    assert.equal(escapeCsvCell("Celo MiniPay"), "Celo MiniPay");
    assert.equal(escapeCsvCell("evidence_available"), "evidence_available");
  });

  it("handles commas and quotes properly in CSV", () => {
    const res = toCsvString(["ColA", "ColB"], [["Hello, World", 'Said "Hi"']]);
    const expected = `ColA,ColB\n"Hello, World","Said ""Hi"""`;
    assert.equal(res, expected);
  });

  it("generates deterministic submission package and valid hash", async () => {
    const pkg = await generateSubmissionPackage({
      projectName: "Test MiniPay App",
      projectId: "11111111-1111-1111-1111-111111111111",
      runId: "22222222-2222-2222-2222-222222222222",
      mode: "local",
      applicationUrl: "https://test.example.com",
      submissionStage: "readiness",
      metadata: {
        appName: { value: "Test MiniPay", source: "package.json", confirmedByOwner: true },
      },
      results: [
        {
          id: "res-1",
          runId: "22222222-2222-2222-2222-222222222222",
          requirementId: "REQ-HTTPS-ONLY",
          applicability: "applicable",
          status: "evidence_available",
          findingText: "Served over HTTPS",
          deterministicRule: "isHttps",
          evidenceIds: [],
        },
      ],
      origins: [
        {
          runId: "22222222-2222-2222-2222-222222222222",
          origin: "https://test.example.com",
          sourceKind: "browser",
        },
      ],
      contracts: [],
      transactions: [],
      payments: [],
      evidenceItems: [],
    });

    assert.ok(pkg.byteLength > 0);
    assert.ok(pkg.byteLength < 10_000_000); // <= 10 MB
    assert.equal(pkg.evidenceIndexHash.length, 64);
    assert.ok(pkg.fileManifest.includes("submission.md"));
    assert.ok(pkg.fileManifest.includes("requirements.csv"));
    assert.ok(pkg.fileManifest.includes("missing-items.md"));
    assert.ok(pkg.fileManifest.includes("coverage.md"));
    assert.ok(pkg.fileManifest.includes("evidence-index.json"));
  });
});
