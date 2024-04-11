import { Session } from 'next-auth'
import React from 'react'
import WriteIcon from './Write/WriteIcon'
import SearchIcon from './Search/SearchIcon'
import FilterIcon from './Filter/FilterIcon'

interface IconsProps {
  path: string
  session: Session | null
}

const headerIconMap = new Map([
  ['home', []],
  [
    'blog',
    [
      { component: <WriteIcon path="/blog" />, scope: 'admin' },
      { component: <SearchIcon />, scope: 'all' },
    ],
  ],
  [
    'hot-place',
    [
      { component: <WriteIcon path="/hot-place" />, scope: 'user' },
      { component: <FilterIcon path="/hot-place" />, scope: 'all' },
    ],
  ],
  ['book', [{ component: <WriteIcon path="/book" />, scope: 'admin' }]],
  ['project', []],
])

export default function Icons({ path, session }: IconsProps) {
  const key = path.split('/')[1]
  const icons = headerIconMap.get(key)
  if (!icons) return null

  const componentArr = icons.map((icon, i) => {
    if (icon.scope === 'admin' && icon.scope !== session?.user.role) return
    if (icon.scope === 'user' && !session) return

    return <div key={i}>{icon.component}</div>
  })

  return componentArr.filter(Boolean)
}
