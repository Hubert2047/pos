import jwt from "jsonwebtoken";
import type { Role } from "../middlewares/auth.js";
import UserToken from "../models/user-token.js";
export type T_generateToken = {
    account: string;
    role: Role;
};
export function customError({
    msg,
    status,
    statusCode,
    data = {},
}: {
    msg: string
    status: string
    statusCode: number
    data?: any
}) {
    console.log("error", msg)
    const err: any = new Error(msg)
    err.status = status
    err.statusCode = statusCode
    err.data = data
    return err
}
export function Err(next: any, error: any) {
    console.log('err', error.message)
    return next(
        customError({
            msg: error.message,
            status: 'failed',
            statusCode: 500,
        })
    )
}


export const generateTokens = async (payload: T_generateToken) => {
    try {
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
            { expiresIn: "30m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
            { expiresIn: "30d" }
        );

        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export const verifyRefreshToken = (refreshToken: string) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise(async (resolve, reject) => {
        try {
            const token = await UserToken.findOne({ token: refreshToken });
            if (!token) {
                return reject({
                    error: true,
                    message: "Invalid refresh token",
                });
            }
            const tokenDetails = jwt.verify(refreshToken, privateKey as string);
            resolve({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        } catch (error) {
            return reject({
                error: true,
                message: "Invalid refresh token",
            });
        }
    });
};