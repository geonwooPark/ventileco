import { Session } from 'next-auth'
import React from 'react'
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
      { component: WriteIcon, scope: 'admin' },
      { component: SearchIcon, scope: 'all' },
    ],
  ],
  [
    'hot-place',
    [
      { component: WriteIcon, scope: 'user' },
      { component: FilterIcon, scope: 'all' },
    ],
  ],
  ['book', [{ component: WriteIcon, scope: 'admin' }]],
  ['project', []],
])

export default function Icons({ session }: IconsProps) {
  const path = usePathname()
  const key = path.split('/')[1]
  const icons = headerIconMap.get(key) || []

  const componentArr = icons.map((icon, i) => {
    if (icon.scope === 'admin' && icon.scope !== session?.user.role) return
    if (icon.scope === 'user' && !session) return

    const IconComponent = icon.component
    return <IconComponent key={i} path={key} />
  })

  return componentArr.filter(Boolean)
}
