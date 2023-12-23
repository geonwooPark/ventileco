import React, { PropsWithChildren } from 'react'

interface RefWrapperProps {
  innerRef: React.RefObject<HTMLDivElement>
  className?: string
}

export default function RefWrapper({
  innerRef,
  className,
  children,
}: PropsWithChildren<RefWrapperProps>) {
  return (
    <div ref={innerRef} className={className}>
      {children}
    </div>
  )
}
