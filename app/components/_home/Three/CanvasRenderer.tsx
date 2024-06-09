import React from 'react'
import dynamic from 'next/dynamic'
import CowboyHat from './CowboyHat'
import Signs from './Signs'
import Particle from './Particle'

const RenderModel = dynamic(
  () => import('@/components/_home/Three/RenderModel'),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center" />
    ),
  },
)

export default function CanvasRenderer() {
  return (
    <RenderModel>
      <CowboyHat />
      <Signs />
      <Particle />
    </RenderModel>
  )
}
