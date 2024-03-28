import { HotPlaceMetadata } from '@/constants/staticMetadata'
import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = HotPlaceMetadata

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
