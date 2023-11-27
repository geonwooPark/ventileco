import mongoose, { Schema, models } from 'mongoose'

const favoriteSchema = new Schema(
  {
    postingId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Array,
      // unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
)

export const Favorite =
  models.Favorite || mongoose.model('Favorite', favoriteSchema)
