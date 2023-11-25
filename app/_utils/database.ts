import mongoose from 'mongoose'

const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URL as string

if (!MONGO_URI) throw new Error('MONGO_URI is not defined.')

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null }

export const connectMongo = async () => {
  if (cached.conn) return cached.conn

  mongoose.set('strictQuery', false)
  cached.conn = await mongoose.connect(MONGO_URI)

  return cached.conn
}
