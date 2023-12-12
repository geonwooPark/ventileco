import '../globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Footer from '../components/footer/Footer'
import 'react-toastify/dist/ReactToastify.css'

const noto = Noto_Sans_KR({ subsets: ['latin'] })

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
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'iB35_cjnMF8iid4q7riM-UjORPcfV0-9o-ZaoVFSXJM',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <div className="h-auto min-h-[100%] pb-[56px] bg-white">{children}</div>
      <Footer className="relative h-[56px] -translate-y-full w-full bg-[#070716]" />
    </div>
  )
}
