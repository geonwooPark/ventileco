import React, { PropsWithChildren } from 'react'

export default function ModalContent({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>
}
