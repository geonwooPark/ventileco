import React, { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import SearchIcon from './Search/SearchIcon'
import Menu from './Menu/Menu'
import WriteIcon from './Write/WriteIcon'
import { Session } from 'next-auth'
import FilterIcon from './Filter/FilterIcon'

interface RightSideProps {
  path: string
}

export default function RightSide({ path }: RightSideProps) {
  const { data: session } = useSession()

  const headerIconMap = useMemo(
    () =>
      new Map([
        ['home', []],
        [
          'blog',
          [
            { component: <WriteIcon path={path} />, scope: 'admin' },
            { component: <SearchIcon />, scope: 'all' },
          ],
        ],
        [
          'hot-place',
          [
            { component: <WriteIcon path={path} />, scope: 'user' },
            { component: <FilterIcon path={path} />, scope: 'user' },
          ],
        ],
        ['book', [{ component: <WriteIcon path={path} />, scope: 'admin' }]],
        ['project', []],
      ]),
    [],
  )

  const renderIcon = (path: string, session: Session | null) => {
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
