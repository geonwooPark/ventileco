import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '../app/styles/globals.css'
import LoginModal from './components/common/Modal/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignUpModal from './components/common/Modal/SignUpModal'
import Header from './components/common/Header/Header'
import Script from 'next/script'
import RabbitGPT from './components/common/RabbitGPT/RabbitGPT'
import Firework from './components/common/Animation/FireworkAnimation'
import ConfirmModal from './components/common/Modal/ConfirmModal'
import AuthSession from './components/common/provider/AuthSession'
import TanstackProvider from './components/common/provider/TanstackProvider'
import { RootMetadata } from './constants/staticMetadata'

const noto = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = RootMetadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body className={noto.className}>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        />
        <AuthSession>
          <TanstackProvider>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
            />
            <SignUpModal />
            <LoginModal />
            <ConfirmModal />
            <Header />
            {children}
          </TanstackProvider>
          <Firework />
          <RabbitGPT />
        </AuthSession>
      </body>
    </html>
  )
}
