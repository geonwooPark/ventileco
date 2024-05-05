import React, { PropsWithChildren } from 'react'

export default function ModalHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-between p-4 text-beige-normal">{children}</div>
  )
}
