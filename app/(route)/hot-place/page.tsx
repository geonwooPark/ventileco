import HotPlaceAddButton from '@hot-place/HotPlaceAddButton'
import Map from '@hot-place/Map/Map'
import SideInfo from '@hot-place/SideInfo/SideInfo'
import Main from '@common/Main'
import React from 'react'

export interface HotPlacelistings {
  id: number
  category: string
  store: string
  latitude: number
  longitude: number
}

const hotPlacelistings = [
  {
    id: 1,
    category: '한식',
    store: '인왕산 대충 유원지',
    latitude: 37.574187,
    longitude: 126.976882,
  },
  {
    id: 2,
    category: '카페',
    store: 'MK2',
    latitude: 37.576,
    longitude: 126.97689,
  },
  {
    id: 3,
    category: '분식',
    store: '누하의 숲',
    latitude: 37.575,
    longitude: 126.984,
  },
  {
    id: 4,
    category: '일식',
    store: '오버트 서울',
    latitude: 37.57,
    longitude: 126.954,
  },
  {
    id: 5,
    category: '중식',
    store: '나흐바',
    latitude: 37.577,
    longitude: 126.969,
  },
  {
    id: 6,
    category: '중식',
    store: '활짝 핀 메밀',
    latitude: 37.577,
    longitude: 126.981,
  },
  {
    id: 7,
    category: '중식',
    store: '대성각',
    latitude: 37.571,
    longitude: 126.98,
  },
  {
    id: 8,
    category: '중식',
    store: '인왕산 대충 유원지',
    latitude: 37.573,
    longitude: 126.971,
  },
]

export default function page() {
  return (
    <Main>
      <Map listings={hotPlacelistings} />
      <SideInfo listings={hotPlacelistings} />
      <HotPlaceAddButton />
    </Main>
  )
}
