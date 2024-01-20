import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import HeaderBgColor from '@common/Header/HeaderBgColor'

export const metadata: Metadata = {
  metadataBase: new URL('https://ventileco-blog.vercel.app/hot-place'),
  title: {
    default: 'Ventileco 맛집 리스트',
    template: `%s | Ventileco 맛집 리스트`,
  },
  description: '자주 방문하는 지역의 맛집을 소개합니다.',
  openGraph: {
    title: {
      default: 'Ventileco 맛집 리스트',
      template: `%s | Ventileco 맛집 리스트`,
    },
    description: '자주 방문하는 지역의 맛집을 소개합니다.',
    images:
      'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
    url: 'https://ventileco-blog.vercel.app/hot-place',
    type: 'website',
  },
}

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="h-full">
      <HeaderBgColor />
      {children}
      {modal}
    </div>
  )
}
