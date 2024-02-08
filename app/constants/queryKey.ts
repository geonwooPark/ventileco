// Home 페이지
export const homeKeys = {
  base: ['home'] as const,
  checkLists: () => [...homeKeys.base, 'checklist'] as const,
  checkList: (date: string) => [...homeKeys.checkLists(), { date }] as const,
  newArrivals: () => [...homeKeys.base, 'new-arrivals'] as const,
  weather: () => [...homeKeys.base, 'weather'] as const,
}

// Blog-Detail 페이지
export const detailKeys = {
  base: ['detail'] as const,
  comments: () => [...detailKeys.base, 'comments'] as const,
  comment: (postingId: string) =>
    [...detailKeys.comments(), { postingId }] as const,
  likes: () => [...detailKeys.base, 'likes'] as const,
  like: (postingId: string) => [...detailKeys.likes(), { postingId }] as const,
  views: () => [...detailKeys.base, 'views'] as const,
  view: (postingId: string) => [...detailKeys.views(), { postingId }] as const,
}

// Mypage 페이지
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

// Hot-Place 페이지
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
