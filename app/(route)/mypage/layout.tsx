import { MypageMetadata } from '@/constants/staticMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = MypageMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full pt-[64px]">{children}</div>
}
