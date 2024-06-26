import React, { PropsWithChildren } from 'react'

const btnSize = {
  s: 'w-20 h-11 text-xs px-4',
  m: 'w-40 h-12 text-sm px-4',
  l: 'w-80 h-[52px] text-sm px-6',
}

const btnLevel = {
  primary: `bg-brown-normal shadow-md text-beige-light font-normal rounded transition duration-200 ease-in-out hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed`,
  secondary: `bg-gray-700 text-white rounded transition duration-200 ease-in-out hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed`,
  ghost: `border border-blue-600 text-blue-600 rounded transition duration-200 ease-in-out`,
  outline: `border border-beige-light font-normal text-beige-light rounded transition duration-200 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed`,
}

type ButtonProps = (
  | {
      type: 'submit'
      level: 'primary'
    }
  | {
      type: 'button'
      level: keyof typeof btnLevel
    }
) & {
  size: keyof typeof btnSize
  label: string
  className?: string
  fullWidth?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  label,
  type,
  level,
  size,
  className,
  disabled,
  icon,
  fullWidth,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${btnSize[size]}
        ${btnLevel[level]}
        ${icon && 'flex items-center justify-center'}
        ${fullWidth && '!w-full'}
        ${className}`}
    >
      <>
        {icon && <div className="mr-1 size-5">{icon}</div>}
        <span>{label}</span>
      </>
    </button>
  )
}
