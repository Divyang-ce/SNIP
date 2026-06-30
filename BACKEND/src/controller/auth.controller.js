import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../config/config.js"
import { loginUser, registerUser } from "../services/auth.service.js"
import { findUserById } from "../dao/user.dao.js"
import { signAccessToken, verifyRefreshToken } from "../utils/helper.js"
import { UnauthorizedError } from "../utils/errorHandler.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, accessTokenCookieOptions)
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
}

export const register_user = wrapAsync( async (req, res) => {
    const {name, email, password} = req.body
    const {accessToken, refreshToken, user} = await registerUser(name, email, password)
    req.user = user
    setAuthCookies(res, accessToken, refreshToken)
    res.status(200).json({message:"register success"})
})

export const login_user = wrapAsync( async (req, res) => {
    const {email, password} = req.body
    const {accessToken, refreshToken, user} = await loginUser(email, password)
    req.user = user
    setAuthCookies(res, accessToken, refreshToken)
    res.status(200).json({user:user,message:"login success"})
})

export const logout_user = wrapAsync( async (req, res) => {
    res.clearCookie("accessToken", accessTokenCookieOptions)
    res.clearCookie("refreshToken", refreshTokenCookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync( async (req, res) => {
    res.status(200).json({user:req.user})
})

// Issues a fresh access token using a still-valid refresh token cookie.
// Lets the access token stay short-lived (15 min) without forcing the
// user to log in again every time it expires.
export const refresh_token = wrapAsync( async (req, res) => {
    const token = req.cookies.refreshToken
    if(!token) throw new UnauthorizedError("No refresh token, please log in again")

    let userId
    try {
        userId = verifyRefreshToken(token)
    } catch (error) {
        throw new UnauthorizedError("Refresh token expired, please log in again")
    }

    const user = await findUserById(userId)
    if(!user) throw new UnauthorizedError("User not found")

    const accessToken = signAccessToken({id: user._id})
    res.cookie("accessToken", accessToken, accessTokenCookieOptions)
    res.status(200).json({message:"token refreshed"})
})
