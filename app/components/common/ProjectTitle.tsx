import React from 'react'

interface ProjectTitleProps {
  title: string
}

export default function ProjectTitle({ title }: ProjectTitleProps) {
  return (
    <div className="mb-4 flex h-[80px] items-center justify-center overflow-hidden text-beige-normal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 660 150"
        className="-translate-y-6"
      >
        <path
          id="curve4"
          d="M2.84,144.27s128.97-48.27,327.16-48.27,327.16,48.27,327.16,48.27"
          fill="none"
          stroke="none"
          strokeMiterlimit="10"
        ></path>
        <text textAnchor="middle">
          <textPath
            className="text-center font-point text-3xl tracking-widest"
            xlinkHref="#curve4"
            fill="currentColor"
            startOffset="51%"
          >
            {title}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
