import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '../../../../public/animation/firework-animation.json'

export default function Firework() {
  return (
    <div className="absolute inset-0 h-screen w-screen">
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        className="h-full w-full"
      />
    </div>
  )
}
