import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'

export default function HotPlaceAddButton() {
  return (
    <Link href={'/hot-place/create'} className="fixed bottom-8 left-8 z-[100]">
      <Button type="button" level="primary" size="s" label="맛집 등록" />
    </Link>
  )
}
