import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) =>{
    return nanoid(length);
}

export const signToken = (payload) =>{
    return signAccessToken(payload)
}

export const signAccessToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "15m"})
}

export const signRefreshToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"})
}

export const verifyToken = (token) =>{
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    return decoded.id
}

export const verifyRefreshToken = (token) =>{
    const decoded = jsonwebtoken.verify(token, process.env.JWT_REFRESH_SECRET)
    return decoded.id
}