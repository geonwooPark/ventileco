import React from 'react'
import CheckListItem from './CheckListItem'
import SkeletonCheckList from './SkeletonCheckList'
import dayjs from '@/app/utils/dayjs'
import useCheckListQuery from '@/app/hooks/query/useCheckListQuery'

interface CheckListProps {
  selectedDate: Date
}

export default function CheckList({ selectedDate }: CheckListProps) {
  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')

  const { checkList, isPending, error } = useCheckListQuery(date)

  const sortedCheckList = checkList?.sort((a, b) => {
    return Number(a.status) - Number(b.status)
  })

  if (isPending) return <SkeletonCheckList />

  return (
    <ul className="hide-scroll h-[220px] overflow-y-scroll">
      {checkList &&
        sortedCheckList?.map((item) => {
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
