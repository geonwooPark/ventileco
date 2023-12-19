import React from 'react'
import Logo from './Logo'
import HeaderList from './HeaderList/HeaderList'

export default function LeftSide() {
  return (
    <div className="flex items-center">
      <Logo className="mr-6" />
      <HeaderList />
    </div>
  )
}
