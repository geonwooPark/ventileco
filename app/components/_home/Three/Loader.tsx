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
      <div className="space-y-4">
        <Image src={Gun} alt="gun" />
        <div className="relative mx-auto h-[10px] w-[240px] overflow-hidden rounded-full bg-white">
          <div
            className="absolute inset-0 bg-brown-dark"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="text-center text-lg text-white">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  )
}
