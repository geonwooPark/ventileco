import React from 'react'
import CheckListItem from './CheckListItem'
import SkeletonCheckList from './SkeletonCheckList'
import useCheckListQuery from '@/hooks/query/useCheckListQuery'

interface CheckListProps {
  selectedDate: string
}

export default function CheckList({ selectedDate }: CheckListProps) {
  const { checkList, isPending } = useCheckListQuery(selectedDate)
  if (isPending) return <SkeletonCheckList />

  return (
    <ul className="hide-scroll max-h-[210px] overflow-y-scroll">
      {checkList?.map((item) => {
        return (
          <CheckListItem
            key={item.listId}
            item={item}
            selectedDate={selectedDate}
          />
        )
      })}
    </ul>
  )
}
