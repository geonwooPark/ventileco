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
    _id: 1,
    title: '블로그',
    link: '/blog',
  },
  {
    _id: 2,
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
  'React.JS',
  'Next.JS',
  'TypeScript',
  'RTK',
  'React-Query',
  'Zustand',
  'Firebase',
  'Tailwind',
]
