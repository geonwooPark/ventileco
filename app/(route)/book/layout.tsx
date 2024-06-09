import { BookMetadata } from '@/constants/staticMetadata'
import '../../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = BookMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-auto min-h-[100%] pt-[56px]">{children}</div>
}
