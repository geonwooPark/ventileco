import React from 'react'

export default function SkeletonCheckList() {
  return (
    <ul className="h-[220px] animate-pulse overflow-y-hidden">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <li key={i} className="mb-3 list-none text-sm last:mb-0">
            <div className="flex items-center rounded-md bg-slate-500 px-3 py-2">
              <input type="checkbox" className="mr-2 h-5 w-5" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
