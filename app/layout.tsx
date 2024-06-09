import type { Metadata } from 'next'
import { Outfit, Rye } from 'next/font/google'
import '../app/styles/globals.css'
import Header from './components/common/Header/Header'
import Script from 'next/script'
import RabbitGPT from './components/common/RabbitGPT/RabbitGPT'
import Firework from './components/common/Animation/FireworkAnimation'
import AuthSession from './components/common/provider/AuthSession'
import TanstackProvider from './components/common/provider/TanstackProvider'
import { RootMetadata } from './constants/staticMetadata'
import localFont from 'next/font/local'
import ModalContainer from './components/common/Modals/ModalContainer'
import AlertContainer from './components/common/Alerts/AlertContainer'

const classic = localFont({
  src: [
    {
      path: '../public/fonts/classicB.ttf',
    },
  ],
  variable: '--font-classic',
})

const simplehae = localFont({
  src: [
    {
      path: '../public/fonts/simplehae.woff2',
    },
  ],
  variable: '--font-simplehae',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})
const rye = Rye({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rye',
})

export const metadata: Metadata = RootMetadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body
        className={`${simplehae.variable} ${rye.variable} ${outfit.variable} ${classic.variable} bg-brown-dark font-normal`}
      >
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        />
        <AuthSession>
          <TanstackProvider>
            <Header />
            {children}
            <ModalContainer />
            <AlertContainer />
          </TanstackProvider>
          <Firework />
          <RabbitGPT />
        </AuthSession>
      </body>
    </html>
  )
}
