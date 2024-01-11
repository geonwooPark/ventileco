import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage', '/blog/write/*', '/blog/edit/*'],
    },
    sitemap: 'https://ventileco-blog.vercel.app/sitemap.xml',
  }
}
