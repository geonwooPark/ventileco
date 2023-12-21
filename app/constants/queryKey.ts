// Home 페이지
export const checkListKeys = {
  base: ['checklist'] as const,
  checkList: (date: string) => [...checkListKeys.base, { date }] as const,
}

export const newArrivalsKeys = {
  base: ['new-arrivals'] as const,
}

export const weatherKeys = {
  base: ['weather'] as const,
}

// Blog-Detail 페이지
export const commentsKey = {
  base: ['comments'] as const,
  comments: (postingId: string) =>
    [...commentsKey.base, { postingId }] as const,
}

export const isLikedKeys = {
  base: ['isLiked'] as const,
  isLiked: (postingId: string) => [...isLikedKeys.base, { postingId }] as const,
}

export const likeCountKeys = {
  base: ['likeCount'] as const,
  likeCount: (postingId: string) =>
    [...likeCountKeys.base, { postingId }] as const,
}

export const viewCountKeys = {
  base: ['viewCount'] as const,
  viewCount: (postingId: string) =>
    [...viewCountKeys.base, { postingId }] as const,
}

// Mypage 페이지
export const myCommentKeys = {
  base: ['my-comment'] as const,
  myComment: (user?: string) => [...myCommentKeys.base, { user }] as const,
}

export const myCommentedPostKeys = {
  base: ['my-commented-post'] as const,
  myCommentedPost: (user?: string) =>
    [...myCommentedPostKeys.base, { user }] as const,
}

export const myLikedPostKeys = {
  base: ['my-liked-post'] as const,
  myLikedPost: (user?: string) => [...myLikedPostKeys.base, { user }] as const,
}
