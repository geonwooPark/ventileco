import getAllBook from './actions/_book/getAllBook'
import getAllListing from './actions/_blog/getAllListing'
import getAllListingCount from './actions/_blog/getAllListingCount'
import getAllStore from './actions/_hot-place/getAllStore'
import getCategoryListingCount from './actions/_blog/getCategoryListingCount'
import { LIMIT, categories } from './constants'

export default async function sitemap() {
  const baseURL = process.env.NEXT_PUBLIC_FE_URL as string

  // 동기 함수
  const categoryURLs = categories.map((category) => ({
    url: `${baseURL}/blog/categories/${category}`,
  }))

  // 비동기 함수
  const getBlogDetailURLs = async () => {
    const listing = await getAllListing({
      page: 1,
      limit: 100,
    })
    const detailURLs = listing.map((listingItem) => ({
      url: `${baseURL}/blog/detail/${listingItem._id}`,
    }))
    return detailURLs
  }

  const getBlogPostingURLs = async () => {
    const listingCount = await getAllListingCount()
    const lastPageNum = Math.ceil(listingCount / LIMIT)
    const postingsURLs = Array.from({ length: lastPageNum - 1 }).map(
      (_, i) => ({
        url: `${baseURL}/blog/postings/${i + 2}`,
      }),
    )
    return postingsURLs
  }

  const getCategoryPageURLs = async () => {
    let categoryPageURLs: { url: string }[] = []
    for (const category of categories) {
      const listingCount = await getCategoryListingCount(category)
      const lastPageNum = Math.ceil(listingCount / LIMIT)
      const res = Array.from({ length: lastPageNum - 1 }).map((_, i) => {
        return {
          url: `${baseURL}/blog/${category}/${i + 2}`,
        }
      })
      categoryPageURLs = [...categoryPageURLs, ...res]
    }
    return categoryPageURLs
  }

  const getHotPlaceURLs = async () => {
    const hotPlaceListing = await getAllStore()
    const hotPlaceURLs = hotPlaceListing.map((listingItem) => ({
      url: `${baseURL}/hot-place/store/${listingItem._id}`,
    }))
    return hotPlaceURLs
  }

  const getBookURLs = async () => {
    const books = await getAllBook()
    const bookURLs = books.map((book) => ({
      url: `${baseURL}/book/${book._id}`,
    }))
    return bookURLs
  }

  let URLs: {
    url: string
  }[] = [
    { url: baseURL },
    { url: baseURL + '/book' },
    { url: baseURL + '/about' },
    ...categoryURLs,
  ]
  await Promise.all([
    getBlogDetailURLs(),
    getBlogPostingURLs(),
    getCategoryPageURLs(),
    getHotPlaceURLs(),
    getBookURLs(),
  ]).then(
    ([
      blogDetailURLs,
      blogPostingURLs,
      categoryPageURLs,
      hotPlaceURLs,
      bookURLs,
    ]) => {
      URLs = [
        ...URLs,
        ...blogDetailURLs,
        ...blogPostingURLs,
        ...categoryPageURLs,
        ...hotPlaceURLs,
        ...bookURLs,
      ]
    },
  )

  return URLs
}
