import React from 'react'
import Spinner from '@/components/common/Spinner'

export default function loading() {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/50">
      <Spinner width="w-8" height="h-8" />
    </div>
  )
}
