import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Navbar from './_components/navbar/Navbar'
import LoginModal from './_components/modals/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignUpModal from './_components/modals/SignUpModal'
import Footer from './_components/Footer'
import AuthSession from './_components/AuthSession'

const noto = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ventileco-blog.vercel.app/'),
  title: {
    default: 'Ventileco 개발 블로그',
    template: `%s | Ventileco 개발 블로그`,
  },
  description:
    '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그입니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <head>
        <meta
          name="google-site-verification"
          content="iB35_cjnMF8iid4q7riM-UjORPcfV0-9o-ZaoVFSXJM"
        />
        <meta
          name="naver-site-verification"
          content="1d20d1ea80cc378d93a73cd7ab538842d5cc82cd"
        />
      </head>
      <body className={noto.className}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
        <SignUpModal />
        <LoginModal />
        <AuthSession>
          <Navbar />
          <div className="h-auto min-h-[100%] pb-[56px]">{children}</div>
        </AuthSession>
        <Footer className="relative h-[56px] -translate-y-full w-full" />
      </body>
    </html>
  )
}
