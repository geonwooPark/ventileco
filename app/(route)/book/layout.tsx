import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import HeaderBgColor from '@common/Header/HeaderBgColor'

export const metadata: Metadata = {
  metadataBase: new URL('https://ventileco-blog.vercel.app/book'),
  title: {
    default: 'Ventileco 독서 리스트',
    template: `%s | Ventileco 독서 리스트`,
  },
  description: '그동안 읽었던 책들의 후기를 남깁니다.',
  openGraph: {
    title: {
      default: 'Ventileco 독서 리스트',
      template: `%s | Ventileco 독서 리스트`,
    },
    description: '그동안 읽었던 책들의 후기를 남깁니다.',
    images:
      'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
    url: 'https://ventileco-blog.vercel.app/hot-place',
    type: 'website',
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <HeaderBgColor />
      {children}
    </div>
  )
}
