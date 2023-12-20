import React, { ReactNode } from 'react'

export default function Main({ children }: { children: ReactNode }) {
  return <main className="bg-white">{children}</main>
}
