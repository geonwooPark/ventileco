// Home
export const homeKeys = {
  base: ['home'] as const,
  checkLists: () => [...homeKeys.base, 'checklist'] as const,
  checkList: (date: string) => [...homeKeys.checkLists(), { date }] as const,
  newArrivals: () => [...homeKeys.base, 'new-arrivals'] as const,
  weather: () => [...homeKeys.base, 'weather'] as const,
  newUpdates: () => [...homeKeys.base, 'new-updates'] as const,
}

// Blog
export const detailKeys = {
  base: ['blog'] as const,
  comments: () => [...detailKeys.base, 'comments'] as const,
  comment: (postingId: string) =>
    [...detailKeys.comments(), { postingId }] as const,
  views: () => [...detailKeys.base, 'views'] as const,
  view: (postingId: string) => [...detailKeys.views(), { postingId }] as const,
}

// Mypage
export const myPageKeys = {
  base: ['mypage'] as const,
  myComments: () => [...myPageKeys.base, 'my-comment'] as const,
  myComment: (user?: string) => [...myPageKeys.myComments(), { user }] as const,
  myCommentedPosts: () => [...myPageKeys.base, 'my-commented-post'] as const,
  myCommentedPost: (user?: string) =>
    [...myPageKeys.myCommentedPosts(), { user }] as const,
  myLikedPosts: () => [...myPageKeys.base, 'my-liked-post'] as const,
  myLikedPost: (user?: string) =>
    [...myPageKeys.myLikedPosts(), { user }] as const,
}

// Hot-Place
export const hotPlaceKeys = {
  base: ['hot-place'] as const,
  hotPlaceListing: (search?: string, category?: string, gu?: string) =>
    [
      ...hotPlaceKeys.base,
      {
        search: search ? search : '',
        category: category ? category : '',
        gu: gu ? gu : '',
      },
    ] as const,
}

// Common
export const commonKeys = {
  base: ['common'] as const,
  likes: () => [...commonKeys.base, 'likes'] as const,
  like: (postingId: string) => [...commonKeys.likes(), { postingId }] as const,
  comments: () => [...commonKeys.base, 'comments'] as const,
  comment: (postingId: string) =>
    [...commonKeys.comments(), { postingId }] as const,
}
