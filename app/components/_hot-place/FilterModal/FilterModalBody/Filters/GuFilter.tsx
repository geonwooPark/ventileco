import { GuList } from '@/constants'
import React from 'react'

interface GuFilterProps {
  filteredGu: string
  setFilteredGu: React.Dispatch<React.SetStateAction<string>>
}

export default function GuFilter({ filteredGu, setFilteredGu }: GuFilterProps) {
  const onClick = (selectedGu: string) => {
    filteredGu.includes(selectedGu)
      ? setFilteredGu((prev) =>
          filteredGu === selectedGu
            ? ''
            : prev.startsWith(selectedGu)
              ? prev.replace(`${selectedGu},`, '')
              : prev.replace(`${selectedGu}`, ''),
        )
      : setFilteredGu((prev) => (prev ? `${prev},${selectedGu}` : selectedGu))
  }

  return (
    <ul
      className={`hide-scroll h-[300px] flex-1 overflow-x-hidden overflow-y-scroll rounded-md border bg-beige-light text-center ${
        filteredGu ? 'border-active' : 'border-transparent'
      }`}
    >
      {GuList.map((item) => (
        <li
          key={item.id}
          className={`cursor-pointer py-1 text-sm ${
            filteredGu.includes(item.gu) ? 'text-active' : 'text-brown-dark'
          }`}
          onClick={() => onClick(item.gu)}
        >
          {item.gu}
        </li>
      ))}
    </ul>
  )
}
