import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isPrivateOrBlockedHost,
  sanitizeUrl,
  extractOrigin,
  evaluateRequirements,
} from "../index.js";

describe("Scanner Security & Evaluators", () => {
  it("blocks private network hostnames and IP ranges (SSRF defense)", () => {
    // Localhost & loopback
    assert.equal(isPrivateOrBlockedHost("localhost"), true);
    assert.equal(isPrivateOrBlockedHost("127.0.0.1"), true);
    assert.equal(isPrivateOrBlockedHost("0.0.0.0"), true);
    assert.equal(isPrivateOrBlockedHost("::1"), true);

    // Private IPv4 ranges
    assert.equal(isPrivateOrBlockedHost("10.0.0.1"), true);
    assert.equal(isPrivateOrBlockedHost("192.168.1.100"), true);
    assert.equal(isPrivateOrBlockedHost("172.16.0.5"), true);
    assert.equal(isPrivateOrBlockedHost("172.31.255.255"), true);
    assert.equal(isPrivateOrBlockedHost("169.254.169.254"), true);

    // Internal suffixes
    assert.equal(isPrivateOrBlockedHost("server.local"), true);
    assert.equal(isPrivateOrBlockedHost("api.internal"), true);

    // Public addresses allowed
    assert.equal(isPrivateOrBlockedHost("app.example.com"), false);
    assert.equal(isPrivateOrBlockedHost("celo.org"), false);
  });

  it("sanitizes URLs by stripping credentials and sensitive tokens", () => {
    const raw = "https://user:password@app.example.com/api?token=secret123&session_id=xyz&view=summary";
    const sanitized = sanitizeUrl(raw);

    assert.ok(!sanitized.includes("user"));
    assert.ok(!sanitized.includes("password"));
    assert.ok(!sanitized.includes("token=secret123"));
    assert.ok(!sanitized.includes("session_id=xyz"));
    assert.ok(sanitized.includes("view=summary"));
  });

  it("extracts canonical origins correctly", () => {
    assert.equal(extractOrigin("https://app.celo.org/portal/swap"), "https://app.celo.org");
    assert.equal(extractOrigin("https://api.example.com:8443/v1"), "https://api.example.com:8443");
  });

  it("evaluates requirements deterministically into exact 4 statuses", () => {
    const runId = "test-run-123";
    const cleanResults = evaluateRequirements(runId, {
      targetUrl: "https://miniapp.example.com",
      isHttps: true,
      viewportWidth: 360,
      maxObservedScrollWidth: 360,
      hasHorizontalOverflow: false,
      consoleErrors: [],
      httpErrors: [],
      supportLinkStatus: 200,
      termsLinkStatus: 200,
      privacyLinkStatus: 200,
      observedOrigins: ["https://api.example.com"],
      isOpenInMiniPayBannerDetected: false,
      deviceEvidenceSupplied: true,
      celoChainIdObserved: 42220,
    });

    assert.equal(cleanResults.length, 8);
    const httpsRes = cleanResults.find((r) => r.requirementId === "REQ-HTTPS-ONLY");
    assert.equal(httpsRes?.status, "evidence_available");

    const viewportRes = cleanResults.find((r) => r.requirementId === "REQ-VIEWPORT-RESPONSIVE");
    assert.equal(viewportRes?.status, "evidence_available");

    const chainRes = cleanResults.find((r) => r.requirementId === "REQ-CHAIN-ID-CELO");
    assert.equal(chainRes?.status, "evidence_available");
  });

  it("detects horizontal overflow and flags needs_fix", () => {
    const runId = "test-run-overflow";
    const overflowResults = evaluateRequirements(runId, {
      targetUrl: "https://miniapp.example.com",
      isHttps: true,
      viewportWidth: 360,
      maxObservedScrollWidth: 420, // 420 > 360
      hasHorizontalOverflow: true,
      consoleErrors: [],
      httpErrors: [],
      observedOrigins: [],
      isOpenInMiniPayBannerDetected: false,
      deviceEvidenceSupplied: false,
    });

    const viewportRes = overflowResults.find((r) => r.requirementId === "REQ-VIEWPORT-RESPONSIVE");
    assert.equal(viewportRes?.status, "needs_fix");
  });
});
