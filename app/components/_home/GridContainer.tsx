import React, { PropsWithChildren } from 'react'

export default function GridContainer({ children }: PropsWithChildren) {
  return (
    <div className="grid h-full w-full max-w-[580px] grid-cols-1 grid-rows-4 gap-4 md:max-h-[504px] md:grid-cols-2 md:grid-rows-2">
      {children}
    </div>
  )
}
