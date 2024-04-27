'use client'

import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function CowboyHat() {
  const ref = useRef<any>()

  const gltf = useLoader(GLTFLoader, './renderingModels/cowboy-hat.glb')

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.1 * delta
    ref.current.position.y = Math.sin(state.clock.getElapsedTime()) / 5
  })

  return (
    <group scale={[1.8, 1.8, 1.8]}>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={[0, 0, 0]}
        children-0-castShadow
      />
    </group>
  )
}
