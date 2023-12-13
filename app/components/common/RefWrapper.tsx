import React, { PropsWithChildren } from 'react'

interface RefWrapperProps {
  ref: React.RefObject<HTMLDivElement>
  className?: string
}

export default function RefWrapper({
  ref,
  className,
  children,
}: PropsWithChildren<RefWrapperProps>) {
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
