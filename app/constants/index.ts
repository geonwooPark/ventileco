// 카테고리
export const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
] as const

// 헤더
export const headerListItem = [
  {
    id: 1,
    title: '블로그',
    link: '/blog',
  },
  {
    id: 2,
    title: '맛집',
    link: '/hot-place',
  },
  {
    id: 3,
    title: '독서',
    link: '/book',
  },
  {
    id: 4,
    title: '소개',
    link: '/about',
  },
] as const

// 페이지네이션
export const PAGE = 1
export const LIMIT = 5

// 날씨 정보
export const CITY = 'Seoul'
export const APIKEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string

// 스킬
export const skills = [
  {
    id: 1,
    name: 'HTML5',
    color: 'E34F26',
  },
  {
    id: 2,
    name: 'CSS',
    color: '1572B6',
  },
  {
    id: 3,
    name: 'JavaScript',
    color: 'F7DF1E',
  },
  {
    id: 4,
    name: 'TypeScript',
    color: '3178C6',
  },
  {
    id: 5,
    name: 'React',
    color: '61DAFB',
  },
  {
    id: 6,
    name: 'Next.JS',
    color: '000000',
  },
  {
    id: 7,
    name: 'Tailwind CSS',
    color: '06B6D4',
  },
  {
    id: 8,
    name: 'MongoDB',
    color: '47A248',
  },
  {
    id: 9,
    name: 'Firebase',
    color: 'FFCA28',
  },
  {
    id: 10,
    name: 'Redux_Toolkit',
    color: '764ABC',
  },
  {
    id: 11,
    name: 'React_Query',
    color: 'FF4154',
  },
  {
    id: 12,
    name: 'Zustand',
    color: 'EA4AAA',
  },
] as const

// 맛집
export const StoreCategory = [
  {
    id: 1,
    category: '한식',
  },
  {
    id: 2,
    category: '중식',
  },
  {
    id: 3,
    category: '일식',
  },
  {
    id: 4,
    category: '양식',
  },
  {
    id: 5,
    category: '분식',
  },
  {
    id: 6,
    category: '카페',
  },
] as const

export const GuList = [
  {
    id: 1,
    gu: '강남구',
  },
  {
    id: 2,
    gu: '강동구',
  },
  {
    id: 3,
    gu: '강북구',
  },
  {
    id: 4,
    gu: '강서구',
  },
  {
    id: 5,
    gu: '관악구',
  },
  {
    id: 6,
    gu: '광진구',
  },
  {
    id: 7,
    gu: '구로구',
  },
  {
    id: 8,
    gu: '금천구',
  },
  {
    id: 9,
    gu: '노원구',
  },
  {
    id: 10,
    gu: '도봉구',
  },
  {
    id: 11,
    gu: '동대문구',
  },
  {
    id: 12,
    gu: '동작구',
  },
  {
    id: 13,
    gu: '마포구',
  },
  {
    id: 14,
    gu: '서대문구',
  },
  {
    id: 15,
    gu: '서초구',
  },
  {
    id: 16,
    gu: '성동구',
  },
  {
    id: 17,
    gu: '성북구',
  },
  {
    id: 18,
    gu: '송파구',
  },
  {
    id: 19,
    gu: '양천구',
  },
  {
    id: 20,
    gu: '영등포구',
  },
  {
    id: 21,
    gu: '용산구',
  },
  {
    id: 22,
    gu: '은평구',
  },
  {
    id: 23,
    gu: '종로구',
  },
  {
    id: 24,
    gu: '중구',
  },
  {
    id: 25,
    gu: '중랑구',
  },
] as const

export const INITIAL_CENTER = [37.574187, 126.976882]
export const MARKER_SIZE = 40
