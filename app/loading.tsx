import React from 'react'
import Spinner from './components/common/Spinner'

export default function Loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center bg-slate-100">
      <Spinner width="w-8" height="w-8" fillColor="fill-gray-100" />
    </div>
  )
}
