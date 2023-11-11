import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignUpModal from './components/modals/SignUpModal'
import getCurrentUser, { UserType } from './actions/getCurrentUser'
import YesNoModal from './components/modals/DeleteModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '내 블로그',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser: UserType = await getCurrentUser()

  return (
    <html lang="kr">
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
        <SignUpModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
