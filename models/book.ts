import mongoose, { Schema, models } from 'mongoose'

const bookSchema = new Schema(
  {
    recommended: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authors: {
      type: Array,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
)

export const Book = models.Book || mongoose.model('Book', bookSchema)
