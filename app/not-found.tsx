import React from 'react'
import EmptyState from './components/common/EmptyState'

export default function NotFound() {
  return (
    <div className="bg-gray-700 h-[100vh]">
      <EmptyState label="404 존재하지 않는 페이지입니다!" />
    </div>
  )
}
