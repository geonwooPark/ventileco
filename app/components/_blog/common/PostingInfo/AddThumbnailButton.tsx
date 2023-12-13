import React from 'react'

interface AddThumbnailButtonProps {
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export default function AddThumbnailButton({
  onThumbnailChange,
}: AddThumbnailButtonProps) {
  return (
    <div>
      <label
        htmlFor="photo"
        className="flex items-center justify-center w-40 px-4 ml-auto text-xs text-white transition duration-200 ease-in-out bg-gray-700 rounded cursor-pointer h-11 md:h-12 md:text-sm hover:opacity-80"
      >
        썸네일 추가하기
      </label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        className="hidden"
        onChange={onThumbnailChange}
      />
    </div>
  )
}
