import mongoose, { Schema, models } from 'mongoose'

const favoriteSchema = new Schema(
  {
    postingId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: Array,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
)

export const Favorite =
  models.Favorite || mongoose.model('Favorite', favoriteSchema)
