'use client'

import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from './SearchIcon'
import Menu from './Menu'
import Search from './Search'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'
import { UserType } from '@/app/actions/getCurrentUser'

interface RightSideProps {
  currentUser?: UserType | null
}
export default function RightSide({ currentUser }: RightSideProps) {
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
      {currentUser?.role === 'admin' && (
        <Link href={'/write'} className="text-white z-50">
          <AiOutlineEdit size={24} />
        </Link>
      )}
      <SearchIcon isOpen={isOpen} toggleOpen={toggleOpen} />
      <Menu currentUser={currentUser} />
    </div>
  )
}
