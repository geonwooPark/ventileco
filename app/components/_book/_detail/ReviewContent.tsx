import React from 'react'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

interface ReviewContentProps {
  content: string
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify(new JSDOM('<!DOCTYPE html>').window).sanitize(
          content,
        ),
      }}
    />
  )
}
