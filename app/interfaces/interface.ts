export interface PostingType {
  _id: string
  category: string
  title: string
  description: string
  thumbnailURL: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface CommentUserType {
  commentId: string
  userImage: string
  userId: string
  userName: string
  createdAt: Date
  text: string
}

export interface CommentType {
  _doc?: any
  _id: string
  postingId: string
  title: string
  user: CommentUserType[]
  createdAt: Date
  updatedAt: Date
}

export interface FavoriteType {
  createdAt: string
  postingId: string
  title: string
  updatedAt: string
  userId: string[]
  _id: string
}
