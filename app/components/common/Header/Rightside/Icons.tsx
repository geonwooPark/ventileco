import { Session } from 'next-auth'
import React, { useMemo } from 'react'
import WriteIcon from './Write/WriteIcon'
import SearchIcon from './Search/SearchIcon'
import FilterIcon from './Filter/FilterIcon'
import { usePathname } from 'next/navigation'

interface IconsProps {
  session: Session | null
}

const headerIconMap = new Map([
  ['home', []],
  [
    'blog',
    [
      { component: () => <WriteIcon path="/blog" />, scope: 'admin' },
      { component: () => <SearchIcon />, scope: 'all' },
    ],
  ],
  [
    'hot-place',
    [
      { component: () => <WriteIcon path="/hot-place" />, scope: 'user' },
      { component: () => <FilterIcon path="/hot-place" />, scope: 'all' },
    ],
  ],
  ['book', [{ component: () => <WriteIcon path="/book" />, scope: 'admin' }]],
  ['project', []],
])

export default function Icons({ session }: IconsProps) {
  const path = usePathname()
  const key = path.split('/')[1]
  const icons = headerIconMap.get(key)
  if (!icons) return null

  const componentArr = useMemo(
    () =>
      icons.map((icon, i) => {
        if (icon.scope === 'admin' && icon.scope !== session?.user.role) return
        if (icon.scope === 'user' && !session) return

        const IconComponent = icon.component
        return <IconComponent key={i} />
      }),
    [key, session?.user.role],
  )

  return componentArr.filter(Boolean)
}
