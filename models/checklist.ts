import mongoose, { Schema, models } from 'mongoose'

const checkListSchema = new Schema(
  {
    date: {
      type: String,
    },
    list: {
      type: Array,
    },
  },
  { timestamps: false, versionKey: false },
)

export const CheckList =
  models.CheckList || mongoose.model('CheckList', checkListSchema)
