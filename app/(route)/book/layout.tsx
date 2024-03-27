import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FE_URL}/book`),
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
    images: '/images/og-image.png',
    url: `${process.env.NEXT_PUBLIC_FE_URL}/book`,
    type: 'website',
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-auto min-h-[100%] bg-white pt-[82px] md:pt-[102px]">
      {children}
    </div>
  )
}
