import Section from '@/app/components/common/Section'
import React from 'react'
import DeleteAndEdit from './DeleteAndEdit'

interface AdminControlSectionProps {
  postingId: string
}

export default function AdminControlSection({
  postingId,
}: AdminControlSectionProps) {
  return (
    <Section className="!pb-10">
      <DeleteAndEdit postingId={postingId} />
    </Section>
  )
}
