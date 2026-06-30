import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js"
import { ConflictError, UnauthorizedError } from "../utils/errorHandler.js"
import { signAccessToken, signRefreshToken } from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const accessToken = signAccessToken({id: newUser._id})
    const refreshToken = signRefreshToken({id: newUser._id})
    return {accessToken, refreshToken, user: newUser}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new UnauthorizedError("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new UnauthorizedError("Invalid email or password")

    const accessToken = signAccessToken({id: user._id})
    const refreshToken = signRefreshToken({id: user._id})
    return {accessToken, refreshToken, user}
}
