'use client'

import React from 'react'
import DOMPurify from 'dompurify'

interface ReviewContentProps {
  content: string
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></div>
  )
}
