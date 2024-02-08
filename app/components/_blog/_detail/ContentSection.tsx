import EmptyState from '@/components/common/EmptyState'
import Section from '@/components/common/Section'
import dynamic from 'next/dynamic'
import React from 'react'

const Content = dynamic(() => import('@blog/common/Editor/Editor'), {
  ssr: false,
  loading: () => (
    <EmptyState label="에디터를 불러오고 있어요!" className="!h-[500px]" />
  ),
})

interface ContentSectionProps {
  content: string
}

export default function ContentSection({ content }: ContentSectionProps) {
  return (
    <Section>
      <Content content={content} theme="bubble" readOnly={true} />
    </Section>
  )
}
