import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/mypage', '/write', '/edit/'],
    },
    sitemap: 'https://ventileco-blog.vercel.app/sitemap.xml',
  }
}
