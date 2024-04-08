import { BookMetadata } from '@/constants/staticMetadata'
import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = BookMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-auto min-h-[100%] pt-[64px]">{children}</div>
}
