import '../../styles/globals.css'
import type { Metadata } from 'next'
import { BlogMetadata } from '@/constants/staticMetadata'

export const metadata: Metadata = BlogMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-auto min-h-[100%] pt-[56px]">{children}</div>
}
