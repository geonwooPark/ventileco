import { ProjectMetadata } from '@/constants/staticMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = ProjectMetadata

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return [children]
}
