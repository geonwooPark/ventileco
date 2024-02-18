import React from 'react'
import Spinner from '@/components/common/Spinner'

export default function loading() {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/30">
      <Spinner width="w-10" height="h-10" fillColor="fill-blue-400" />
    </div>
  )
}
