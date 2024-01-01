import React, { PropsWithChildren } from 'react'

interface HighLightProps {
  beforeBgColor: string
}

export default function HighLight({
  children,
  beforeBgColor,
}: PropsWithChildren<HighLightProps>) {
  return (
    <span
      className={`relative mr-2 inline-block before:absolute before:-inset-1.5 before:block before:-skew-y-2 ${beforeBgColor}`}
    >
      <span className="relative text-white">{children}</span>
    </span>
  )
}
