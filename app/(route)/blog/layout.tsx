import '../../styles/globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css'
import { BlogMetadata } from '@/constants/staticMetadata'

export const metadata: Metadata = BlogMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-auto min-h-[100%] pt-[64px]">{children}</div>
}
