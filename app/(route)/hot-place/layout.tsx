import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
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
    images: '/images/og-image.png',
    url: `${process.env.NEXT_PUBLIC_FE_URL}/hot-place`,
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
      {children}
      {modal}
    </div>
  )
}
