import Canvas from '@/components/_test/Canvas'
import Main from '@/components/common/Main'
import React from 'react'

export default function page() {
  return (
    <Main className={`h-full w-full bg-red-400`}>
      <Canvas />
    </Main>
  )
}
