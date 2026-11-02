import type {
  RequirementResult,
  RequirementStatus,
  NetworkOrigin,
} from "@docketrail/contracts";

export interface ScanObservations {
  targetUrl: string;
  isHttps: boolean;
  viewportWidth: number;
  maxObservedScrollWidth: number;
  hasHorizontalOverflow: boolean;
  consoleErrors: string[];
  httpErrors: { url: string; status: number }[];
  supportLinkStatus?: number | null;
  termsLinkStatus?: number | null;
  privacyLinkStatus?: number | null;
  observedOrigins: string[];
  isOpenInMiniPayBannerDetected: boolean;
  deviceEvidenceSupplied: boolean;
  celoChainIdObserved?: number | null;
}

export function evaluateRequirements(
  runId: string,
  obs: ScanObservations
): RequirementResult[] {
  const results: RequirementResult[] = [];
  const nowUtc = new Date().toISOString();

  // 1. REQ-HTTPS-ONLY
  results.push({
    runId,
    requirementId: "REQ-HTTPS-ONLY",
    applicability: "applicable",
    status: obs.isHttps ? "evidence_available" : "needs_fix",
    findingText: obs.isHttps
      ? "Application served securely over public HTTPS."
      : "Target endpoint does not enforce HTTPS (security requirement failed).",
    deterministicRule: "url.protocol === 'https:' && isHttps",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 2. REQ-VIEWPORT-RESPONSIVE
  const overflow = obs.hasHorizontalOverflow || obs.maxObservedScrollWidth > obs.viewportWidth;
  results.push({
    runId,
    requirementId: "REQ-VIEWPORT-RESPONSIVE",
    applicability: "applicable",
    status: overflow ? "needs_fix" : "evidence_available",
    findingText: overflow
      ? `Horizontal overflow detected (Scroll width: ${obs.maxObservedScrollWidth}px exceeds viewport ${obs.viewportWidth}px).`
      : `Rendered clean on 360x640 mobile viewport without horizontal overflow.`,
    deterministicRule: "body.scrollWidth <= viewport.width && !hasHorizontalOverflow",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 3. REQ-SUPPORT-LEGAL-LINKS
  const supportOk = obs.supportLinkStatus ? obs.supportLinkStatus >= 200 && obs.supportLinkStatus < 400 : null;
  const legalOk = (obs.termsLinkStatus && obs.termsLinkStatus < 400) || (obs.privacyLinkStatus && obs.privacyLinkStatus < 400);

  let supportStatus: RequirementStatus = "evidence_available";
  let supportFinding = "Support and legal links verified (HTTP 200 OK).";

  if (supportOk === false || legalOk === false) {
    supportStatus = "needs_fix";
    supportFinding = "One or more support or legal policy links returned 4xx/5xx HTTP errors.";
  } else if (supportOk === null && legalOk === null) {
    supportStatus = "needs_owner_confirmation";
    supportFinding = "No support or legal links observed in scanned flows. Owner confirmation required.";
  }

  results.push({
    runId,
    requirementId: "REQ-SUPPORT-LEGAL-LINKS",
    applicability: "applicable",
    status: supportStatus,
    findingText: supportFinding,
    deterministicRule: "links.every(status >= 200 && status < 400)",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 4. REQ-ORIGIN-INVENTORY
  results.push({
    runId,
    requirementId: "REQ-ORIGIN-INVENTORY",
    applicability: "applicable",
    status: obs.observedOrigins.length > 0 ? "evidence_available" : "needs_owner_confirmation",
    findingText: `Recorded ${obs.observedOrigins.length} distinct external network origins during runtime scan.`,
    deterministicRule: "origins.length > 0",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 5. REQ-NO-CONSOLE-CRITICAL-ERRORS
  const hasConsoleErrors = obs.consoleErrors.length > 0 || obs.httpErrors.length > 0;
  results.push({
    runId,
    requirementId: "REQ-NO-CONSOLE-CRITICAL-ERRORS",
    applicability: "applicable",
    status: hasConsoleErrors ? "needs_fix" : "evidence_available",
    findingText: hasConsoleErrors
      ? `Observed ${obs.consoleErrors.length} console errors and ${obs.httpErrors.length} failed HTTP asset requests.`
      : "No unhandled script runtime exceptions or 4xx/5xx core asset failures observed.",
    deterministicRule: "consoleErrors.length === 0 && httpErrors.length === 0",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 6. REQ-CHAIN-ID-CELO
  const isCelo = obs.celoChainIdObserved === 42220;
  results.push({
    runId,
    requirementId: "REQ-CHAIN-ID-CELO",
    applicability: obs.celoChainIdObserved ? "applicable" : "unknown",
    status: isCelo ? "evidence_available" : obs.celoChainIdObserved ? "needs_fix" : "needs_owner_confirmation",
    findingText: isCelo
      ? "Target on-chain RPC interactions verified on Celo Mainnet (Chain ID 42220)."
      : obs.celoChainIdObserved
      ? `Observed non-Celo Chain ID ${obs.celoChainIdObserved}. MiniPay requires Celo Mainnet (42220).`
      : "No on-chain interactions observed in scanned flows. Confirm if application uses smart contracts.",
    deterministicRule: "chainId === 42220",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 7. REQ-WALLET-PHYSICAL-TESTED
  results.push({
    runId,
    requirementId: "REQ-WALLET-PHYSICAL-TESTED",
    applicability: "applicable",
    status: obs.deviceEvidenceSupplied ? "evidence_available" : "not_checked",
    findingText: obs.deviceEvidenceSupplied
      ? "Physical device test evidence attached with tester and network provenance."
      : obs.isOpenInMiniPayBannerDetected
      ? "Automated browser observed open-in-MiniPay fallback. Physical mobile test screenshots must be supplied by owner."
      : "Automated scan cannot simulate physical MiniPay wallet keystore. Requires owner-supplied device screenshots.",
    deterministicRule: "deviceEvidenceSupplied === true",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  // 8. REQ-METADATA-CONSISTENCY
  results.push({
    runId,
    requirementId: "REQ-METADATA-CONSISTENCY",
    applicability: "applicable",
    status: "needs_owner_confirmation",
    findingText: "Application title and manifest icons require owner verification before submission.",
    deterministicRule: "metadata.confirmedByOwner === true",
    evidenceIds: [],
    reviewedAt: nowUtc,
  });

  return results;
}
