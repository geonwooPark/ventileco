'use client'

import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { IoRefresh } from 'react-icons/io5'

export default function ErrorUI({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <button
          onClick={() => resetErrorBoundary()}
          className="inline-block rounded-md border border-red-400 bg-red-100 p-2 text-red-700"
        >
          <IoRefresh size={20} />
        </button>
      </div>
    </div>
  )
}
