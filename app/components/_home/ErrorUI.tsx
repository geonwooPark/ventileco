'use client'

import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { IconRefresh } from '../../../public/svgs/icons'

export default function ErrorUI({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <button
          onClick={() => resetErrorBoundary()}
          className="inline-block size-5 rounded-md border border-red-600 bg-red-100 p-2 text-red-600"
        >
          <IconRefresh />
        </button>
      </div>
    </div>
  )
}
