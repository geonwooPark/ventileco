import React from 'react'
import { RiArrowRightLine, RiListCheck } from 'react-icons/ri'

interface SideInfoButtonProps {
  showSideInfo: boolean
  setShowSideInfo: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SideInfoButton({
  showSideInfo,
  setShowSideInfo,
}: SideInfoButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setShowSideInfo((prev) => !prev)}
      className={`absolute right-[320px] top-4 z-[10] hidden h-11 w-11 items-center justify-center rounded-l-md text-gray-700 shadow-md duration-300 md:flex ${
        showSideInfo
          ? 'translate-x-0 bg-gray-100'
          : 'translate-x-[320px] bg-brown-dark'
      }`}
    >
      {showSideInfo ? (
        <RiArrowRightLine size={20} className="text-brown-dark" />
      ) : (
        <RiListCheck size={20} className="text-beige-light" />
      )}
    </button>
  )
}
