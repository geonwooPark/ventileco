'use client'

import React from 'react'
import SkeletonNewArrivalsList from '../NewArrivals/SkeletonNewArrivalsList'
import useUpdateQuery from '@/hooks/query/useUpdateQuery'
import Link from 'next/link'

export default function NewUpdateList() {
  const { newUpdateList, isPending } = useUpdateQuery()
  if (isPending) return <SkeletonNewArrivalsList />

  return (
    <ul>
      {newUpdateList?.map((item: any) => {
        return (
          <li key={item.sha} className="mb-1.5 truncate text-sm last:mb-0">
            <Link href={item.html_url} target="_blank">
              <span className="mr-1">🛠</span>
              <span>{item.commit.message}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
