import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
    console.log('start connect db ...')
    const uri = process.env.MONGO_URI
    if (!uri) {
        throw new Error('MONGO_URI not set in .env')
    }

    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}
