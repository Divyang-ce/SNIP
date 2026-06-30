
export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 1000 * 60 * 15, // 15 minutes
}

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/api/auth", // only sent to auth routes (refresh/logout)
}

// Kept for backwards compatibility with any existing imports
export const cookieOptions = accessTokenCookieOptions