'use client'

import React, { useEffect, useState } from 'react'

interface SearchProps {
  isOpen: boolean
}

export default function Search({ isOpen }: SearchProps) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setFade(true)
    } else {
      timer = setTimeout(() => {
        setFade(false)
      }, 200)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div
      className={`transition duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {fade && (
        <div
          className={`absolute w-full h-[320px] md:h-[420px] bg-black top-0 left-0`}
        >
          <form className="h-full">
            <div className="h-full flex justify-center items-center">
              <input
                className="w-[60%] rounded-sm px-4 py-3 outline-none"
                placeholder="검색어를 입력하세요."
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
