import mongoose, { Schema, models } from 'mongoose'

const replyCommentSchema = new Schema(
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
    user: {
      type: Array,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
)

export const ReplyComment =
  models.ReplyComment || mongoose.model('ReplyComment', replyCommentSchema)
