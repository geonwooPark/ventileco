import React, { useState } from 'react'
import HamburgerIcon from './HamburgerIcon/HamburgerIcon'
import HeaderListSmallDevice from './HeaderList/HeaderListSmallDevice'
import HeaderList from './HeaderList/HeaderList'

interface LeftSideProps {
  path: string
}

export default function LeftSide({ path }: LeftSideProps) {
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
