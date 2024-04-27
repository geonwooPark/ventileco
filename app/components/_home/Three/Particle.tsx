'use client'

import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'

export default function Particle() {
  const ref = useRef<any>()

  const count = 1000
  const particleTexture = useTexture('/textures/3.png')

  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    return [positions]
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.02 * delta
    ref.current.position.y = Math.sin(state.clock.getElapsedTime()) / 20
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        color={'#D9BF8F'}
        size={0.05}
        alphaMap={particleTexture}
        transparent={true}
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  )
}
