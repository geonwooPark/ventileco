import React from 'react'
import Loading from './_components/common/Loading'

export default function loading() {
  return (
    <div className="bg-slate-100 w-full h-[100vh] flex justify-center items-center">
      <Loading width="w-10" height="w-10" />
    </div>
  )
}
