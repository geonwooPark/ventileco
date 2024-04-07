interface MenuItemProps {
  onClick: () => void
  label: string
  className?: string
}
export default function MenuItem({ onClick, label, className }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-beige-light px-4 py-3 transition hover:bg-beige-normal ${className}`}
    >
      {label}
    </div>
  )
}
