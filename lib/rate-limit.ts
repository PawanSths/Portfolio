type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 1000;

export type RateLimitResult = { allowed: boolean; retryAfterSeconds?: number };

/**
 * In-memory fixed-window rate limiter keyed by client identity.
 * Suitable for a single-instance portfolio deployment; not a substitute
 * for a distributed limiter behind a load balancer.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  pruneIfNeeded();

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  return { allowed: true };
}

/** Best-effort client identity from forwarded headers, falling back to "unknown". */
export function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function pruneIfNeeded() {
  if (buckets.size <= MAX_BUCKETS) return;
  const now = Date.now();
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
}
