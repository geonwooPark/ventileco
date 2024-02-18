'use client'

import React, { RefObject, useEffect, useRef } from 'react'

export default function Canvas() {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawCharacter()
  }, [])

  const drawCharacter = () => {
    const canvasCur = canvasRef.current as HTMLCanvasElement
    const context = canvasCur.getContext('2d')

    const characterImage = new Image()
    characterImage.onload = function () {
      context?.drawImage(characterImage, 100, 500, 60, 60)
    }
    characterImage.src = '/svgs/Rabbit.svg'
  }

  return <canvas ref={canvasRef} width={1000} height={1000} />
}
