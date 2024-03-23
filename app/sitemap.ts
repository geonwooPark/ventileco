import getAllBook from './actions/getAllBook'
import getAllListing from './actions/getAllListing'
import getAllListingCount from './actions/getAllListingCount'
import getAllStore from './actions/getAllStore'
import getCategoryListingCount from './actions/getCategoryListingCount'
import { LIMIT, categories } from './constants'

export default async function sitemap() {
  const baseURL = 'https://ventileco-blog.vercel.app'

  // 동기 함수
  const categoryURLs = categories.map((category) => ({
    url: `${baseURL}/blog/categories/${category}`,
    lastModified: new Date(),
  }))

  // 비동기 함수
  const getBlogDetailURLs = async () => {
    const listing = await getAllListing({
      page: 1,
      limit: 100,
    })
    const detailURLs = listing.map((listingItem) => ({
      url: `${baseURL}/blog/detail/${listingItem._id}`,
      lastModified: new Date(),
    }))
    return detailURLs
  }

  const getBlogPostingURLs = async () => {
    const listingCount = await getAllListingCount()
    const lastPageNum = Math.ceil(listingCount / LIMIT)
    const postingsURLs = Array.from({ length: lastPageNum - 1 }).map(
      (_, i) => ({
        url: `${baseURL}/blog/postings/${i + 2}`,
        lastModified: new Date(),
      }),
    )
    return postingsURLs
  }

  const getCategoryPageURLs = async () => {
    let categoryPageURLs: { url: string; lastModified: Date }[] = []
    for (const category of categories) {
      const listingCount = await getCategoryListingCount(category)
      const lastPageNum = Math.ceil(listingCount / LIMIT)
      const res = Array.from({ length: lastPageNum - 1 }).map((_, i) => {
        return {
          url: `${baseURL}/blog/${category}/${i + 2}`,
          lastModified: new Date(),
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
      lastModified: new Date(),
    }))
    return hotPlaceURLs
  }

  const getBookURLs = async () => {
    const books = await getAllBook()
    const bookURLs = books.map((book) => ({
      url: `${baseURL}/book/${book._id}`,
      lastModified: new Date(),
    }))
    return bookURLs
  }

  let URLs: {
    url: string
    lastModified: Date
  }[] = [
    { url: baseURL, lastModified: new Date() },
    { url: baseURL + '/book', lastModified: new Date() },
    { url: baseURL + '/about', lastModified: new Date() },
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
