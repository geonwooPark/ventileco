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
      className={`h-[300px] flex-1 overflow-scroll rounded-md border bg-gray-100 text-center ${
        filteredGu ? 'border-blue-600' : 'border-transparent'
      }`}
    >
      {GuList.map((item) => (
        <li
          key={item.id}
          className={`cursor-pointer py-1 ${
            filteredGu.includes(item.gu) ? 'text-blue-600' : 'text-gray-400'
          }`}
          onClick={() => onClick(item.gu)}
        >
          {item.gu}
        </li>
      ))}
    </ul>
  )
}
