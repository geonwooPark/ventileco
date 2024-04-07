import React from 'react'
import Spinner from '../common/Spinner'

export default function LoadingUI() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner width="w-6" height="h-6" fillColor="fill-brown-normal" />
    </div>
  )
}
