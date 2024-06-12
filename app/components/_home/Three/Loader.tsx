import { useProgress } from '@react-three/drei'
import Image from 'next/image'
import React from 'react'
import Gun from '../../../../public/images/gun.png'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-beige-light/30 ${
        progress === 100 && 'hidden'
      }`}
    >
      <Image src={Gun} alt="gun" style={{ opacity: progress / 100 }} />
    </div>
  )
}
