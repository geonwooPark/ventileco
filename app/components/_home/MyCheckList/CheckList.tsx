import React from 'react'
import CheckListItem from './CheckListItem'
import SkeletonCheckList from './SkeletonCheckList'
import dayjs from '@/lib/dayjs'
import useCheckListQuery from '@/hooks/query/useCheckListQuery'

interface CheckListProps {
  selectedDate: Date
}

export default function CheckList({ selectedDate }: CheckListProps) {
  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const { checkList, isPending } = useCheckListQuery(date)
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
