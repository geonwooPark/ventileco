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
        className="ml-auto flex h-11 w-40 cursor-pointer items-center justify-center rounded bg-gray-700 px-4 text-xs text-white transition duration-200 ease-in-out hover:opacity-80 md:h-12 md:text-sm"
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
