import mongoose from 'mongoose'
import { Role } from '../middlewares/auth.js'

export interface IUser {
    id: string
    account: string
    password: string
    role: Role
    isOnline: boolean
    lastTimeOnline: Date
}
const Schema = mongoose.Schema

const userSchema = new Schema<IUser>({
    account: {
        type: String,
        required: true,
        unique: true,
    },
     password: {
        type: String,
        required: true,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastTimeOnline: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: Object.values(Role),
    },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
