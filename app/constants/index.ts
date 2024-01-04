// 카테고리
export const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
]

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
    title: 'GPT',
    link: '/gpt',
  },
  {
    id: 4,
    title: '소개',
    link: '/about',
  },
]

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
]
