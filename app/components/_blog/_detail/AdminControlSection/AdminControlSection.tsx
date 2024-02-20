'use client'

import Section from '@common/Section'
import React from 'react'
import { useSession } from 'next-auth/react'
import PostingEditButton from './PostingEditButton'
import PostingDeleteButton from './PostingDeleteButton'

interface AdminControlSectionProps {
  postingId: string
}

export default function AdminControlSection({
  postingId,
}: AdminControlSectionProps) {
  const { data: session } = useSession()

  if (!session || session.user.role !== 'admin') return null

  return (
    <Section className="!pb-10">
      <div className="flex gap-4">
        <PostingEditButton postingId={postingId} />
        <PostingDeleteButton postingId={postingId} />
      </div>
    </Section>
  )
}
