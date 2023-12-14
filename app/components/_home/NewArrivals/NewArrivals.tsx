import React from 'react'
import NewArrivalsList from './NewArrivalsList'

export default async function NewArrivals() {
  return (
    <div>
      <h4 className="mb-2 text-lg font-medium">최신 게시글</h4>
      <NewArrivalsList />
    </div>
  )
}
