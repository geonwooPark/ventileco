import React, { PropsWithChildren } from 'react'

interface MainProps {
  className?: string
}

export default function Main({
  className,
  children,
}: PropsWithChildren<MainProps>) {
  return <main className={`h-full bg-white ${className}`}>{children}</main>
}
