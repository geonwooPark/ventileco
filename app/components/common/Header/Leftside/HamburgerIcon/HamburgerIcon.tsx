import React from 'react'

interface HamburgerIconProps {
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  className: string
}

export default function HamburgerIcon({
  showMenu,
  setShowMenu,
  className,
}: HamburgerIconProps) {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center px-2 py-3 ${className}`}
      onClick={() => setShowMenu(!showMenu)}
    >
      <div
        className={`mb-2 h-[2px] w-6 rounded-xl bg-black transition duration-200 ease-in-out ${
          showMenu && 'translate-y-[5px] rotate-45'
        }`}
      />
      <div
        className={`h-[2px] w-6 rounded-xl bg-black transition duration-200 ease-in-out ${
          showMenu && 'translate-y-[-5px] -rotate-45'
        }`}
      />
    </div>
  )
}
