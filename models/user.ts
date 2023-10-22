import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    provider: {
      type: String,
      default: 'credentials',
    },
  },
  { timestamps: true, versionKey: false },
)

export const User = models.User || mongoose.model('User', userSchema)
