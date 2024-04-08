'use client'

import React, { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ToggleProps {
  register?: UseFormRegisterReturn<'recommended'>
  recommended?: boolean
}

export default function Toggle({ register, recommended }: ToggleProps) {
  const [enabled, setEnabled] = useState(recommended ? recommended : false)

  const onClick = () => {
    setEnabled((prev) => !prev)
  }

  return (
    <label
      className={`relative flex h-6 w-11 cursor-pointer rounded-full transition ${
        enabled ? 'bg-active' : 'bg-gray-200'
      }`}
    >
      <input
        {...register}
        type="checkbox"
        checked={enabled}
        onClick={onClick}
        className="hidden"
      />
      <div
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } absolute left-0 top-1 inline-block size-4 rounded-full bg-white transition`}
      />
    </label>
  )
}
