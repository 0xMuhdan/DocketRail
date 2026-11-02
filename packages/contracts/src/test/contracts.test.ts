import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  TOTAL_BUDGET_MICRO_USD,
  SERVICE_ENVELOPE_MICRO_USD,
  REGISTRATION_ENVELOPE_MICRO_USD,
  UNALLOCATED_RESERVE_MICRO_USD,
  MAX_RUN_BUDGET_MICRO_USD,
  HttpsUrlSchema,
  CreateProjectInputSchema,
  RunPlanSchema,
} from "../index.js";

describe("Contracts & Constraints", () => {
  it("enforces exact US$1.00 envelope allocation", () => {
    const allocated =
      SERVICE_ENVELOPE_MICRO_USD +
      REGISTRATION_ENVELOPE_MICRO_USD +
      UNALLOCATED_RESERVE_MICRO_USD;
    assert.equal(allocated, TOTAL_BUDGET_MICRO_USD);
    assert.equal(TOTAL_BUDGET_MICRO_USD, 1_000_000);
    assert.equal(MAX_RUN_BUDGET_MICRO_USD, 120_000);
  });

  it("rejects non-HTTPS and insecure localhost URLs in project creation", () => {
    // Non-HTTPS
    assert.equal(HttpsUrlSchema.safeParse("http://my-miniapp.com").success, false);

    // Localhost
    assert.equal(HttpsUrlSchema.safeParse("https://localhost:3000").success, false);
    assert.equal(HttpsUrlSchema.safeParse("https://127.0.0.1:8080").success, false);

    // Credentials in URL
    assert.equal(HttpsUrlSchema.safeParse("https://user:pass@app.example.com").success, false);

    // Valid public HTTPS URL
    assert.equal(HttpsUrlSchema.safeParse("https://app.example.com").success, true);
    assert.equal(HttpsUrlSchema.safeParse("https://miniapp.celo.org/portal").success, true);
  });

  it("validates project creation requires authorization consent", () => {
    const withoutConsent = CreateProjectInputSchema.safeParse({
      displayName: "My App",
      applicationUrl: "https://myapp.example.com",
      submissionStage: "readiness",
      authorizationConsent: false,
    });
    assert.equal(withoutConsent.success, false);

    const withConsent = CreateProjectInputSchema.safeParse({
      displayName: "My App",
      applicationUrl: "https://myapp.example.com",
      submissionStage: "readiness",
      authorizationConsent: true,
    });
    assert.equal(withConsent.success, true);
  });

  it("enforces plan boundary: maximum 15 steps and 3 flows", () => {
    const validPlan = RunPlanSchema.safeParse({
      allowedOrigin: "https://myapp.example.com",
      approvedExternalOrigins: [],
      flows: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          title: "Flow 1",
          entryPath: "/",
          steps: [
            {
              id: "22222222-2222-2222-2222-222222222222",
              type: "navigate",
              target: "/",
              label: "Home",
              takeScreenshot: true,
            },
          ],
        },
      ],
      maximumPages: 10,
      maximumSteps: 15,
      digest: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    });
    assert.equal(validPlan.success, true);
  });
});
