import React from 'react'

export default function DashedBox() {
  return (
    <div className="absolute inset-0 z-[10] hidden h-full w-full items-center justify-center pt-[56px] md:flex">
      <div className="h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-md border-4 border-dashed border-beige-dark"></div>
    </div>
  )
}
