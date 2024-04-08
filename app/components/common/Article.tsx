import React, { PropsWithChildren } from 'react'

export default function Article({ children }: PropsWithChildren) {
  return <article className="w-full">{children}</article>
}
