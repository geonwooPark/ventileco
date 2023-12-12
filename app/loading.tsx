import React from 'react'
import Spinner from './components/common/Spinner'

export default function loading() {
  return (
    <div className="bg-slate-100 w-full h-[100vh] flex justify-center items-center">
      <Spinner width="w-8" height="w-8" fillColor="fill-gray-100" />
    </div>
  )
}
