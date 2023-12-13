import React from 'react'

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="absolute top-0 left-0 text-black">{children}</div>
}
