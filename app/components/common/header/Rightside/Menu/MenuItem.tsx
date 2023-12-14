interface MenuItemProps {
  onClick: () => void
  label: string
  className?: string
}
export default function MenuItem({ onClick, label, className }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-3 font-semibold transition hover:bg-gray-100 ${className}`}
    >
      {label}
    </div>
  )
}
