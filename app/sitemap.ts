import getAllListing from './actions/getAllListing'
import getAllListingCount from './actions/getAllListingCount'
import getAllStore from './actions/getAllStore'
import getCategoryListingCount from './actions/getCategoryListingCount'
import { LIMIT, categories } from './constants'

export default async function sitemap() {
  const baseURL = 'https://ventileco-blog.vercel.app'

  const listing = await getAllListing({
    page: 1,
    limit: 100,
  })
  const detailURLs = listing.map((listingItem) => ({
    url: `${baseURL}/blog/detail/${listingItem._id}`,
    lastModified: new Date(),
  }))

  const listingCount = await getAllListingCount()
  const lastPageNum = Math.ceil(listingCount / LIMIT)
  const postingsURLs = Array.from({ length: lastPageNum - 1 }).map((_, i) => ({
    url: `${baseURL}/blog/postings/${i + 2}`,
    lastModified: new Date(),
  }))

  const categoryURLs = categories.map((category) => ({
    url: `${baseURL}/blog/categories/${category}`,
    lastModified: new Date(),
  }))

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

  const hotPlaceListing = await getAllStore()
  const hotPlaceURLs = hotPlaceListing.map((listingItem) => ({
    url: `${baseURL}/hot-place/store/${listingItem._id}`,
    lastModified: new Date(),
  }))

  return [
    { url: baseURL, lastModified: new Date() },
    { url: baseURL + '/book', lastModified: new Date() },
    { url: baseURL + '/about', lastModified: new Date() },
    ...detailURLs,
    ...postingsURLs,
    ...categoryURLs,
    ...categoryPageURLs,
    ...hotPlaceURLs,
  ]
}
