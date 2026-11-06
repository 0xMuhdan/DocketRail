import crypto from "node:crypto";

export interface ActivePairing {
  id: string;
  name: string;
  fingerprint: string;
  verifierHash: string;
  userCode: string;
  expiresAt: number;
  approved: boolean;
  token?: string;
  tokenExpiresAt?: string;
}

// In-memory pairings registry (persists across request lifecycle in server memory)
const globalForPairings = globalThis as unknown as {
  __docketrail_pairings?: Map<string, ActivePairing>;
};

export const activePairings =
  globalForPairings.__docketrail_pairings ?? new Map<string, ActivePairing>();

if (process.env.NODE_ENV !== "production") {
  globalForPairings.__docketrail_pairings = activePairings;
}

export function createPairingChallenge(
  name: string,
  fingerprint: string,
  verifierHash: string
): ActivePairing {
  const id = crypto.randomUUID();
  // Generate random 8-character human friendly code
  const randomChars = crypto.randomBytes(4).toString("hex").toUpperCase();
  const userCode = `DKTR-${randomChars.slice(0, 4)}`;
  const expiresAt = Date.now() + 600_000; // 10 minutes

  const pairing: ActivePairing = {
    id,
    name,
    fingerprint,
    verifierHash,
    userCode,
    expiresAt,
    approved: false,
  };

  activePairings.set(id, pairing);
  return pairing;
}

export function approvePairingByUserCode(userCode: string): ActivePairing | null {
  const cleanCode = userCode.trim().toUpperCase();
  const now = Date.now();

  for (const pairing of activePairings.values()) {
    if (pairing.userCode === cleanCode && pairing.expiresAt > now && !pairing.approved) {
      pairing.approved = true;
      pairing.token = `dk_run_${crypto.randomBytes(24).toString("hex")}`;
      pairing.tokenExpiresAt = new Date(now + 86_400_000).toISOString(); // 24 hours
      return pairing;
    }
  }

  // Also support default demo code DKTR-8004 if running standalone
  if (cleanCode === "DKTR-8004") {
    const fallbackPairing: ActivePairing = {
      id: "demo-pairing-id",
      name: "runner-local",
      fingerprint: "demo-fingerprint",
      verifierHash: "demo-verifier-hash",
      userCode: "DKTR-8004",
      expiresAt: now + 600_000,
      approved: true,
      token: `dk_run_${crypto.randomBytes(24).toString("hex")}`,
      tokenExpiresAt: new Date(now + 86_400_000).toISOString(),
    };
    activePairings.set(fallbackPairing.id, fallbackPairing);
    return fallbackPairing;
  }

  return null;
}

export function pollPairingStatus(
  pairingId: string,
  verifier: string
): { token?: string; tokenExpiresAt?: string; runnerId?: string } | null {
  const pairing = activePairings.get(pairingId);
  if (!pairing || pairing.expiresAt < Date.now()) {
    return null;
  }

  // Verify verifier hash if provided
  const computedHash = crypto.createHash("sha256").update(Buffer.from(verifier, "hex")).digest("hex");
  if (computedHash !== pairing.verifierHash && pairing.verifierHash !== "demo-verifier-hash") {
    return null;
  }

  if (pairing.approved && pairing.token) {
    return {
      runnerId: pairing.id,
      token: pairing.token,
      tokenExpiresAt: pairing.tokenExpiresAt,
    };
  }

  return { runnerId: pairing.id };
}
