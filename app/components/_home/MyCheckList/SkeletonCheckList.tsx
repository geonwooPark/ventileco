import React from 'react'

export default function SkeletonCheckList() {
  return (
    <ul className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <li key={i} className="mb-3 last:mb-0 text-sm list-none">
            <div className="flex items-center px-3 py-2 bg-slate-500 rounded-md">
              <input type="checkbox" className="mr-2 w-5 h-5" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
