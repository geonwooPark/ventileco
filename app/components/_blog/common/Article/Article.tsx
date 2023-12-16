import React, { PropsWithChildren } from 'react'

type ArticleProps = {
  title: string
}

export default function Article({
  children,
  title,
}: PropsWithChildren<ArticleProps>) {
  return (
    <article className="flex w-full flex-col md:w-[calc(100%-120px)]">
      <h2 className="mb-4 md:text-lg">{title}</h2>
      {children}
    </article>
  )
}
