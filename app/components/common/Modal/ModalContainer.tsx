import React from 'react'

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="absolute left-0 top-0 text-black">{children}</div>
}
