import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '../app/styles/globals.css'
import LoginModal from './components/common/modals/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignUpModal from './components/common/modals/SignUpModal'
import AuthSession from './components/provider/AuthSession'
import TanstackProvider from './components/provider/TanstackProvider'
import Header from './components/common/header/Header'

const noto = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ventileco-blog.vercel.app/'),
  title: {
    default: 'Ventileco',
    template: `%s | Ventileco`,
  },
  description: '신입 웹 프론트엔드 개발자 박건우입니다.',
  openGraph: {
    title: {
      default: 'Ventileco',
      template: `%s | Ventileco`,
    },
    description: '신입 웹 프론트엔드 개발자 박건우입니다.',
    images:
      'https://dynamic-og-image-generator.vercel.app/api/generate?title=Ventilco&author=Study+Log&websiteUrl=&avatar=&theme=default',
    url: 'https://ventileco-blog.vercel.app/',
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
    <html lang="kr">
      <body className={noto.className}>
        <AuthSession>
          <TanstackProvider>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={true}
            />
            <SignUpModal />
            <LoginModal />
            <Header />
            {children}
          </TanstackProvider>
        </AuthSession>
      </body>
    </html>
  )
}
