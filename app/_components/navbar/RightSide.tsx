import React, { useState } from 'react'
import SearchIcon from './SearchIcon'
import Menu from './Menu'
import Search from './Search'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'
import { useSession } from 'next-auth/react'

export default function RightSide() {
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
      {session?.user?.role === 'admin' && (
        <Link href={'/write'} className="text-white z-50">
          <AiOutlineEdit size={24} />
        </Link>
      )}
      <SearchIcon isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu session={session} />
    </div>
  )
}
