import React from 'react'
import dynamic from 'next/dynamic'
import CowboyHat from './CowboyHat'
import Signs from './Signs'
import Particle from './Particle'

const RenderModel = dynamic(
  () => import('@/components/_home/Three/RenderModel'),
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
