import React from 'react'

export default function HeaderDecoration() {
  return (
    <div>
      <div className="absolute left-0 top-0">
        <div className="absolute left-[-40px] h-[120px] w-[120px] rounded-full bg-beige-light" />
        <div className="h-screen w-5 bg-beige-light"></div>
      </div>
      <div className="absolute right-0 top-0 -scale-x-100">
        <div className="absolute right-[-60px] h-[120px] w-[120px] rounded-full bg-beige-light" />
        <div className="h-screen w-5 bg-beige-light"></div>
      </div>
    </div>
  )
}
