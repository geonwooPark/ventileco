import React, { PropsWithChildren } from 'react'

interface ContainerProps {
  className?: string
}

export default function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-2 md:px-10 xl:px-20 ${className}`}
    >
      {children}
    </div>
  )
}
