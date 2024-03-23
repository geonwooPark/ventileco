import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/mypage',
        '/blog/write',
        '/blog/edit/*',
        '/hot-place/create',
        '/hot-place/edit/*',
        '/hot-place/delete/*',
        '/book/write',
        '/book/edit/*',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_FE_URL}/sitemap.xml`,
  }
}
