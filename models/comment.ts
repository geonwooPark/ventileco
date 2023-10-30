import mongoose, { Schema, models } from 'mongoose'

const commentSchema = new Schema(
  {
    postingId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Array,
    },
  },
  { versionKey: false },
)

export const Comment =
  models.Comment || mongoose.model('Comment', commentSchema)
