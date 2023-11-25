import getListings from './_actions/getListings'
import { GetListingsType } from './_interfaces/interface'

export default async function sitemap() {
  const baseURL = 'https://ventileco-blog.vercel.app'

  const { postings }: GetListingsType = await getListings({
    type: 'all',
    page: 1,
    limit: 100,
  })

  const postURLs = postings.map((posting) => ({
    url: `${baseURL}/detail/${posting._id}`,
    lastModified: posting.updatedAt,
  }))

  return [
    { url: baseURL, lastModified: new Date() },
    { url: `${baseURL}/categories?search=React.JS`, lastModified: new Date() },
    { url: `${baseURL}/categories?search=Next.JS`, lastModified: new Date() },
    {
      url: `${baseURL}/categories?search=TypeScript`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/categories?search=컴퓨터과학`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/categories?search=라이브러리`,
      lastModified: new Date(),
    },

    ...postURLs,
  ]
}
