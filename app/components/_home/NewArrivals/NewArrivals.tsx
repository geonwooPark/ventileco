import React from 'react'
import NewArrivalsList from './NewArrivalsList'

export default async function NewArrivals() {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">최신 게시글</h4>
      <NewArrivalsList />
    </div>
  )
}
