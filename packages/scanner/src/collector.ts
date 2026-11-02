import { chromium, type Browser, type BrowserContext, type Page } from "playwright-core";
import type { RunPlan, PlanStep, PlanFlow } from "@docketrail/contracts";
import {
  MAX_SCREENSHOTS_COUNT,
  MAX_SCREENSHOT_BYTES,
  MAX_REQUEST_METADATA_COUNT,
  NAVIGATION_TIMEOUT_SECONDS,
  STEP_TIMEOUT_SECONDS,
  SCREENSHOT_TIMEOUT_SECONDS,
  DEFAULT_VIEWPORT,
} from "@docketrail/contracts";
import { isPrivateOrBlockedHost, sanitizeUrl, extractOrigin } from "./sanitizer.js";
import { type ScanObservations } from "./evaluators.js";

export interface ScanRunOptions {
  plan: RunPlan;
  runId: string;
  chromiumPath?: string; // Optional custom Chromium binary path
}

export interface ScanRunOutput {
  observations: ScanObservations;
  screenshots: Record<string, Uint8Array>;
  originsList: string[];
}

export async function executeScanner(options: ScanRunOptions): Promise<ScanRunOutput> {
  const { plan, runId, chromiumPath } = options;
  const screenshots: Record<string, Uint8Array> = {};
  const observedOrigins = new Set<string>();
  const consoleErrors: string[] = [];
  const httpErrors: { url: string; status: number }[] = [];

  let requestCount = 0;
  let screenshotCount = 0;
  let maxObservedScrollWidth: number = DEFAULT_VIEWPORT.width;
  let hasHorizontalOverflow = false;
  let isOpenInMiniPayBannerDetected = false;

  // Launch browser
  const browser: Browser = await chromium.launch({
    executablePath: chromiumPath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const context: BrowserContext = await browser.newContext({
    viewport: plan.viewport || DEFAULT_VIEWPORT,
    timezoneId: "UTC",
    locale: "en-US",
    userAgent: "Mozilla/5.0 (Linux; Android 13; Mobile) DocketRailScanner/1.0",
  });

  const page: Page = await context.newPage();
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT_SECONDS * 1000);
  page.setDefaultTimeout(STEP_TIMEOUT_SECONDS * 1000);

  // Intercept requests for origin tracking & private network blocking
  await page.route("**/*", (route) => {
    const req = route.request();
    const url = req.url();
    requestCount++;

    if (requestCount > MAX_REQUEST_METADATA_COUNT) {
      route.abort("blockedbyclient");
      return;
    }

    try {
      const parsedUrl = new URL(url);
      if (isPrivateOrBlockedHost(parsedUrl.hostname)) {
        route.abort("blockedbyclient");
        return;
      }

      const origin = extractOrigin(url);
      if (origin) {
        observedOrigins.add(origin);
      }
    } catch {
      route.abort("blockedbyclient");
      return;
    }

    route.continue();
  });

  // Track console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text().slice(0, 300));
    }
  });

  // Track failed HTTP responses
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      httpErrors.push({
        url: sanitizeUrl(res.url()),
        status,
      });
    }
  });

  try {
    for (const flow of plan.flows) {
      const initialUrl = new URL(flow.entryPath, plan.allowedOrigin).toString();
      await page.goto(initialUrl, { waitUntil: "domcontentloaded" });

      // Settle wait
      await page.waitForTimeout(1000);

      // Check overflow
      const metrics = await page.evaluate(() => {
        const scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
        const innerWidth = window.innerWidth;
        const bodyText = document.body.innerText.toLowerCase();
        const hasMiniPayBanner =
          bodyText.includes("open in minipay") ||
          bodyText.includes("minipay browser required") ||
          bodyText.includes("minipay only");

        return {
          scrollWidth,
          innerWidth,
          hasOverflow: scrollWidth > innerWidth,
          hasMiniPayBanner,
        };
      });

      if (metrics.scrollWidth > maxObservedScrollWidth) {
        maxObservedScrollWidth = metrics.scrollWidth;
      }
      if (metrics.hasOverflow) {
        hasHorizontalOverflow = true;
      }
      if (metrics.hasMiniPayBanner) {
        isOpenInMiniPayBannerDetected = true;
      }

      // Execute steps
      for (const step of flow.steps) {
        if (step.type === "navigate") {
          const stepUrl = new URL(step.target, plan.allowedOrigin).toString();
          await page.goto(stepUrl, { waitUntil: "domcontentloaded" }).catch(() => {});
        } else if (step.type === "read-text") {
          await page.locator(step.target).first().textContent().catch(() => {});
        } else if (step.type === "click-safe-link") {
          await page.locator(step.target).first().click({ timeout: 5000 }).catch(() => {});
        }

        if (step.takeScreenshot && screenshotCount < MAX_SCREENSHOTS_COUNT) {
          const pngBuffer = await page.screenshot({
            type: "png",
            timeout: SCREENSHOT_TIMEOUT_SECONDS * 1000,
          });

          if (pngBuffer.byteLength <= MAX_SCREENSHOT_BYTES) {
            const fileName = `screenshot-${flow.id}-${step.id}.png`;
            screenshots[fileName] = pngBuffer;
            screenshotCount++;
          }
        }
      }
    }
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }

  const isHttps = plan.allowedOrigin.startsWith("https://");

  const observations: ScanObservations = {
    targetUrl: plan.allowedOrigin,
    isHttps,
    viewportWidth: plan.viewport?.width || DEFAULT_VIEWPORT.width,
    maxObservedScrollWidth,
    hasHorizontalOverflow,
    consoleErrors,
    httpErrors,
    observedOrigins: Array.from(observedOrigins),
    isOpenInMiniPayBannerDetected,
    deviceEvidenceSupplied: false,
  };

  return {
    observations,
    screenshots,
    originsList: Array.from(observedOrigins).sort(),
  };
}
