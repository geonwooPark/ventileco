import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Search from './Search/Search'
import SearchIcon from './Search/SearchIcon'
import Menu from './Menu/Menu'
import { usePathname } from 'next/navigation'

export default function RightSide() {
  const pathName = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
      {pathName.startsWith('/blog') && (
        <SearchIcon isOpen={isOpen} toggleOpen={toggleOpen} />
      )}
      <Menu session={session} />
    </div>
  )
}
