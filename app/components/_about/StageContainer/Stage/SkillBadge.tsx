import React from 'react'

interface SkillBadgeProps {
  label: string
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded bg-blue-100 px-2.5 py-1 text-sm font-normal text-blue-800 dark:bg-blue-900 dark:text-blue-300">
      {label}
    </span>
  )
}
