import getAllListing from './_actions/getAllListing'
import getAllListingCount from './_actions/getAllListingCount'
import getCategoryListingCount from './_actions/getCategoryListingCount'
import { categories } from './_utils/categoryArr'

const LIMIT = 5

export default async function sitemap() {
  const baseURL = 'https://ventileco-blog.vercel.app'

  const listing = await getAllListing({
    page: 1,
    limit: 100,
  })
  const detailURLs = listing.map((listingItem) => ({
    url: `${baseURL}/detail/${listingItem._id}`,
    lastModified: new Date(),
  }))

  const listingCount = await getAllListingCount()
  const lastPageNum = Math.ceil(listingCount / LIMIT)
  const postingsURLs = Array.from({ length: lastPageNum - 1 }).map((_, i) => ({
    url: `${baseURL}/postings/${i + 2}`,
    lastModified: new Date(),
  }))

  const categoryURLs = categories.map((category) => ({
    url: `${baseURL}/categories/${category}`,
    lastModified: new Date(),
  }))

  let categoryPageURLs: { url: string; lastModified: Date }[] = []
  for (const category of categories) {
    const listingCount = await getCategoryListingCount(category)
    const lastPageNum = Math.ceil(listingCount / LIMIT)
    const res = Array.from({ length: lastPageNum - 1 }).map((_, i) => {
      return {
        url: `${baseURL}/${category}/${i + 2}`,
        lastModified: new Date(),
      }
    })
    categoryPageURLs = [...categoryPageURLs, ...res]
  }

  return [
    { url: baseURL, lastModified: new Date() },
    ...detailURLs,
    ...postingsURLs,
    ...categoryURLs,
    ...categoryPageURLs,
  ]
}
