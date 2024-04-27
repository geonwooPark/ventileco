import React from 'react'
import dynamic from 'next/dynamic'
import Spinner from '../../common/Spinner'
import CowboyHat from './CowboyHat'
import Signs from './Signs'
import Particle from './Particle'

const RenderModel = dynamic(
  () => import('@/components/_home/Three/RenderModel'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner width="w-8" height="w-8" />
      </div>
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
