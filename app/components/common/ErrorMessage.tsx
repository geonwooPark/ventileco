import React from 'react'

interface ErrorMessageProps {
  errorMessage?: string
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return (
    <p className={`px-1 text-xs text-red-600 ${!errorMessage && 'invisible'}`}>
      {errorMessage ? errorMessage : '-'}
    </p>
  )
}
