import { Text } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface SignProps {
  position: { x: number; y: number; z: number }
  label: string
  openModal: () => void
}

export default function Sign({ position, label, openModal }: SignProps) {
  const ref = useRef<any>()
  const [hovered, setHovered] = useState(false)

  const gltf = useLoader(GLTFLoader, './renderingModels/sign.glb')

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.getElapsedTime()) / 10
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <group ref={ref}>
      <Text
        fontSize={0.18}
        font="fonts/suit.ttf"
        position={[position.x, position.y + 0.07, position.z + 0.06]}
        color={'#c4beb6'}
      >
        {label}
      </Text>
      <primitive
        position={[position.x, position.y, position.z]}
        object={gltf.scene.clone()}
        children-0-castShadow
        userData={{ hoverable: true }}
        onPointerDown={openModal}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </group>
  )
}
