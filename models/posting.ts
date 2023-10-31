import mongoose, { Schema, models } from 'mongoose'

const postingSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnailURL: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
)

export const Posting =
  models.Posting || mongoose.model('Posting', postingSchema)
