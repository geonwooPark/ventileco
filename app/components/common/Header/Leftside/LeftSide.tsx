'use client'

import React, { useState } from 'react'
import HamburgerIcon from './HamburgerIcon/HamburgerIcon'
import HeaderListSmallDevice from './HeaderList/HeaderListSmallDevice'
import HeaderList from './HeaderList/HeaderList'
import { usePathname } from 'next/navigation'

export default function LeftSide() {
  const path = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div>
      <HamburgerIcon
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        className={'sm:hidden'}
      />
      <HeaderListSmallDevice showMenu={showMenu} path={path} />
      <HeaderList path={path} />
    </div>
  )
}
