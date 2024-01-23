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
      className={`absolute right-[320px] top-[96px] z-[11] hidden h-11 w-11 items-center justify-center rounded-l-md text-gray-700 transition-transform duration-200 ease-in-out md:top-[118px] md:flex ${
        showSideInfo
          ? 'translate-x-[320px] bg-blue-600'
          : 'translate-x-0 bg-gray-100 shadow-inner'
      }`}
    >
      {showSideInfo ? (
        <RiListCheck size={20} className="text-white" />
      ) : (
        <RiArrowRightLine size={20} />
      )}
    </button>
  )
}
