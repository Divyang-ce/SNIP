import rateLimit from "express-rate-limit";

// Strict limiter for login/register — prevents brute-force & spam signups
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again in a while." },
});

// Moderate limiter for short URL creation — prevents abuse/spam link generation
export const createUrlLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many links created. Slow down a little." },
});

// Loose general limiter applied to the whole API as a safety net
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please slow down." },
});
