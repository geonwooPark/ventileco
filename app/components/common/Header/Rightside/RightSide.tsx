import React, { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import SearchIcon from './Search/SearchIcon'
import Menu from './Menu/Menu'
import WriteIcon from './Write/WriteIcon'
import { Session } from 'next-auth'

interface RightSideProps {
  path: string
}

const headerIconMap = new Map([
  ['/home', []],
  [
    '/blog',
    [
      { component: <WriteIcon path={'/blog'} />, scope: 'admin' },
      { component: <SearchIcon />, scope: 'all' },
    ],
  ],
  [
    '/hot-place',
    [{ component: <WriteIcon path={'/hot-place'} />, scope: 'user' }],
  ],
  ['/book', [{ component: <WriteIcon path={'/book'} />, scope: 'admin' }]],
  ['/project', []],
])

export default function RightSide({ path }: RightSideProps) {
  const { data: session } = useSession()

  const renderIcon = (key: string, session: Session | null) => {
    const icons = headerIconMap.get(key)
    if (!icons) return null

    const componentArr = icons.map((icon, i) => {
      if (icon.scope === 'admin' && icon.scope !== session?.user.role) return
      if (icon.scope === 'user' && !session) return

      return <div key={i}>{icon.component}</div>
    })

    return componentArr.filter(Boolean)
  }

  const renderedIcons = useMemo(
    () => renderIcon(path, session),
    [path, session],
  )

  return (
    <div className="flex items-center gap-4 text-black">
      {renderedIcons}
      <Menu session={session} />
    </div>
  )
}
