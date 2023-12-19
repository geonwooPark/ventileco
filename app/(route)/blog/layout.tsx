import Footer from '@/app/components/common/footer/Footer'
import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ventileco-blog.vercel.app/blog'),
  title: {
    default: 'Ventileco 개발 블로그',
    template: `%s | Ventileco 개발 블로그`,
  },
  description:
    '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그입니다.',
  openGraph: {
    title: {
      default: 'Ventileco 개발 블로그',
      template: `%s | Ventileco 개발 블로그`,
    },
    description:
      '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그입니다.',
    images:
      'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
    url: 'https://ventileco-blog.vercel.app/blog',
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
      <div className="h-auto min-h-[100%] bg-white pb-[56px]">{children}</div>
      <Footer className="relative h-[56px] w-full -translate-y-full bg-[#070716]" />
    </div>
  )
}
