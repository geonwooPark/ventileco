import { HotPlaceMetadata } from '@/constants/staticMetadata'
import '../../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = HotPlaceMetadata

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="h-full pt-[56px]">
      {children}
      {modal}
    </div>
  )
}
