import React from 'react'
import {
  IconArrowRightWithTail,
  IconList,
} from '../../../../../public/svgs/icons'

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
      className={`absolute right-[320px] top-4 z-[10] hidden size-11 items-center justify-center rounded-l-md text-gray-700 shadow-md duration-300 md:flex ${
        showSideInfo
          ? 'translate-x-0 bg-gray-100'
          : 'translate-x-[320px] bg-brown-dark'
      }`}
    >
      {showSideInfo ? (
        <IconArrowRightWithTail className="size-5 text-brown-dark" />
      ) : (
        <IconList className="size-5 text-beige-light" />
      )}
    </button>
  )
}
