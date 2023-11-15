import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignUpModal from './components/modals/SignUpModal'
import getCurrentUser from './actions/getCurrentUser'
import { UserType } from './interfaces/interface'
import Footer from './components/Footer'

const noto = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ventileco 개발 블로그',
  description:
    '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser: UserType = await getCurrentUser()

  return (
    <html lang="kr">
      <body className={noto.className}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
        <SignUpModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="h-auto min-h-[100%] pb-[56px]">{children}</div>
        <Footer className="relative h-[56px] -translate-y-full w-full bg-gray-800" />
      </body>
    </html>
  )
}
