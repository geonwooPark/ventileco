'use client'

interface MenuItemProps {
  onClick: () => void
  label: string
  className?: string
}
export default function MenuItem({ onClick, label, className }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-gray-100 transition font-semibold cursor-pointer ${className}`}
    >
      {label}
    </div>
  )
}
