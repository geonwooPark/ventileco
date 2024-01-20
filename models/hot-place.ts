import mongoose, { Schema, models } from 'mongoose'

const hotPlaceSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    coordinate: {
      type: Object,
    },
    hashtags: {
      type: Array,
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
)

export const HotPlace =
  models.HotPlace || mongoose.model('HotPlace', hotPlaceSchema)
