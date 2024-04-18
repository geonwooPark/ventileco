import React, { PropsWithChildren } from 'react'

export default function DashedBox({ children }: PropsWithChildren) {
  return (
    <div className="h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-md border-4 border-dashed border-beige-light">
      {children}
    </div>
  )
}
