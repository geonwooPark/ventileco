'use client'

import React, { PropsWithChildren, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import Loader from './Loader'

export default function RenderModel({ children }: PropsWithChildren) {
  const directionalRef1 = useRef<any>()
  const directionalRef2 = useRef<any>()

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 3] }}
        shadows
        className="relative h-screen w-screen pt-[56px]"
      >
        <directionalLight
          intensity={3}
          position={[5, 5, 5]}
          ref={directionalRef1}
          castShadow
        />
        <directionalLight
          intensity={3}
          position={[-5, 5, 5]}
          ref={directionalRef2}
          castShadow
        />
        <Suspense fallback={null}>{children}</Suspense>
        {/* <OrbitControls /> */}
        {/* <Stats />
        <axesHelper args={[5]} />
        <gridHelper /> */}
      </Canvas>
      <Loader />
    </>
  )
}
