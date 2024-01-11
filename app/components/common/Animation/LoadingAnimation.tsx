import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '../../../../public/animation/loading-animation.json'

export default function Loading() {
  return (
    <div className="absolute -top-20 left-[50%] h-20 w-20 translate-x-[-50%]">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        className="h-20 w-20"
      />
    </div>
  )
}
