// 헤더
export const headerListItem = [
  {
    id: 101,
    title: '블로그',
    link: '/blog',
  },
  {
    id: 102,
    title: '맛집',
    link: '/hot-place',
  },
  {
    id: 103,
    title: '독서',
    link: '/book',
  },
  {
    id: 104,
    title: '소개',
    link: '/about',
  },
]

// 홈
export const BRANCH = 'dev'
export const PER_PAGE = 5

export const CITY = 'Seoul'
export const APIKEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string

// 블로그
export const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '라이브러리',
  '기타',
]

export const PAGE = 1
export const LIMIT = 5

// 소개
export const skills = [
  {
    id: 201,
    name: 'HTML5',
    color: 'E34F26',
  },
  {
    id: 202,
    name: 'CSS',
    color: '1572B6',
  },
  {
    id: 203,
    name: 'JavaScript',
    color: 'F7DF1E',
  },
  {
    id: 204,
    name: 'TypeScript',
    color: '3178C6',
  },
  {
    id: 205,
    name: 'React',
    color: '61DAFB',
  },
  {
    id: 206,
    name: 'Next.JS',
    color: '000000',
  },
  {
    id: 207,
    name: 'Tailwind CSS',
    color: '06B6D4',
  },
  {
    id: 208,
    name: 'MongoDB',
    color: '47A248',
  },
  {
    id: 209,
    name: 'Firebase',
    color: 'FFCA28',
  },
  {
    id: 210,
    name: 'Redux_Toolkit',
    color: '764ABC',
  },
  {
    id: 211,
    name: 'React_Query',
    color: 'FF4154',
  },
  {
    id: 212,
    name: 'Zustand',
    color: 'EA4AAA',
  },
]

// 맛집
export const StoreCategory = [
  {
    id: 301,
    category: '한식',
  },
  {
    id: 302,
    category: '중식',
  },
  {
    id: 303,
    category: '일식',
  },
  {
    id: 304,
    category: '양식',
  },
  {
    id: 305,
    category: '분식',
  },
  {
    id: 306,
    category: '카페',
  },
]

export const GuList = [
  {
    id: 401,
    gu: '강남구',
  },
  {
    id: 402,
    gu: '강동구',
  },
  {
    id: 403,
    gu: '강북구',
  },
  {
    id: 404,
    gu: '강서구',
  },
  {
    id: 405,
    gu: '관악구',
  },
  {
    id: 406,
    gu: '광진구',
  },
  {
    id: 407,
    gu: '구로구',
  },
  {
    id: 408,
    gu: '금천구',
  },
  {
    id: 409,
    gu: '노원구',
  },
  {
    id: 410,
    gu: '도봉구',
  },
  {
    id: 411,
    gu: '동대문구',
  },
  {
    id: 412,
    gu: '동작구',
  },
  {
    id: 413,
    gu: '마포구',
  },
  {
    id: 414,
    gu: '서대문구',
  },
  {
    id: 415,
    gu: '서초구',
  },
  {
    id: 416,
    gu: '성동구',
  },
  {
    id: 417,
    gu: '성북구',
  },
  {
    id: 418,
    gu: '송파구',
  },
  {
    id: 419,
    gu: '양천구',
  },
  {
    id: 420,
    gu: '영등포구',
  },
  {
    id: 421,
    gu: '용산구',
  },
  {
    id: 422,
    gu: '은평구',
  },
  {
    id: 423,
    gu: '종로구',
  },
  {
    id: 424,
    gu: '중구',
  },
  {
    id: 425,
    gu: '중랑구',
  },
]

export const INITIAL_CENTER = [37.574187, 126.976882]
export const MARKER_SIZE = 40

// 독서
export const bookCategory = [
  { id: 501, category: '경제/경영' },
  { id: 502, category: '인문' },
  { id: 503, category: 'IT/컴퓨터' },
  { id: 504, category: '예술/문화' },
  { id: 505, category: '과학' },
]

export const BOOKLIMIT = 8
