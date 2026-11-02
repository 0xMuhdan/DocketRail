/**
 * Network Origin and URL Sanitizer
 * Defends against SSRF, private network leakage, and strips credentials/query tokens.
 */

const PRIVATE_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "169.254.169.254", // Cloud metadata service
];

export function isPrivateOrBlockedHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();

  if (PRIVATE_HOSTS.includes(lower)) {
    return true;
  }

  // Check IPv4 private ranges (10.x.x.x, 192.168.x.x, 172.16.x.x - 172.31.x.x)
  const ipv4Match = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const octet1 = parseInt(ipv4Match[1], 10);
    const octet2 = parseInt(ipv4Match[2], 10);

    if (octet1 === 10) return true;
    if (octet1 === 127) return true;
    if (octet1 === 192 && octet2 === 168) return true;
    if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) return true;
    if (octet1 === 169 && octet2 === 254) return true; // Link-local
  }

  // Check intranet domain endings
  if (
    lower.endsWith(".local") ||
    lower.endsWith(".internal") ||
    lower.endsWith(".lan") ||
    lower.endsWith(".corp")
  ) {
    return true;
  }

  return false;
}

export function sanitizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);

    // Strip credentials
    url.username = "";
    url.password = "";

    // Keep pathname, but strip sensitive query parameters like tokens or keys
    const allowedSearchParams = new URLSearchParams();
    url.searchParams.forEach((val, key) => {
      const lowerKey = key.toLowerCase();
      if (
        !lowerKey.includes("token") &&
        !lowerKey.includes("key") &&
        !lowerKey.includes("secret") &&
        !lowerKey.includes("auth") &&
        !lowerKey.includes("session")
      ) {
        allowedSearchParams.set(key, val);
      }
    });

    url.search = allowedSearchParams.toString();
    return url.toString();
  } catch {
    return rawUrl.split("?")[0]; // Fallback
  }
}

export function extractOrigin(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    return url.origin;
  } catch {
    return null;
  }
}
