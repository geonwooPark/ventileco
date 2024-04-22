'use client'

import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

interface GeometryProps {
  name: string
  position: any
}

export default function Geometry({ name, ...props }: GeometryProps) {
  const ref = useRef<any>()
  const [move, setMove] = useState(true)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    console.log(ref.current.uuid)
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.5 * delta

    if (move) {
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) / 3
    }
  })

  useControls(name, {
    wireframe: {
      value: false,
      onChange: (v) => {
        ref.current.material.wireframe = v
      },
    },
    flatShading: {
      value: true,
      onChange: (v) => {
        ref.current.material.flatShading = v
        ref.current.material.needsUpdate = true
      },
    },
    color: {
      value: 'lime',
      onChange: (v) => {
        ref.current.material.color = new THREE.Color(v)
      },
    },
  })

  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      receiveShadow
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={(e) => {
        e.stopPropagation()
        setMove((prev) => !prev)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
    >
      <sphereGeometry />
      <meshStandardMaterial color={hovered ? 0xff0000 : 0x00ff00} />
    </mesh>
  )
}
