import mongoose from "mongoose";

export interface IUserToken {
    id: string;
    account: string;
    token: string;
    createdAt: Date;
}
const Schema = mongoose.Schema;

const userTokenSchema = new Schema<IUserToken>(
    {
        account: { type: String, required: true },
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
    },
    { timestamps: true });

const UserToken = mongoose.model<IUserToken>("UserToken", userTokenSchema);

export default UserToken;