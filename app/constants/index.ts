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
    title: '프로젝트',
    link: '/project',
  },
]

export const headerColorMap = new Map([
  ['', 'bg-transparent'],
  ['blog', 'bg-transparent'],
  ['hot-place', 'bg-black/70'],
  ['book', 'bg-black/70'],
  ['about', 'bg-transparent'],
  ['mypage', 'bg-transparent'],
])

// 홈
export const BRANCH = 'main'
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

// 프로젝트
export const projects = [
  {
    id: 601,
    title: 'INTERVERSE',
    image: 'bg-[url("/images/project1.png")]',
    description:
      '코로나 시기 이후 구인구직 사이트를 통해 확인되는 채용 공고를 살펴보면, 많은 기업들이 일부 면접을 비대면으로 대체하는 경향이 두드러지고 있습니다. 일반적으로 Zoom과 같은 화상 통화 서비스를 주로 활용하는데, 이러한 서비스는 회원가입 및 로그인과 같은 번거로운 절차를 포함하고 있습니다. 사용자들이 보다 간편하게 이용할 수 있는 서비스를 필요로 한다는 생각에, 메타버스를 활용하여 가상의 공간을 제공하고자 했습니다.',
    link: 'https://www.interverse.kr',
  },
  {
    id: 602,
    title: 'My Website',
    image: 'bg-[url("/images/project2.png")]',
    description:
      'IT 기술 블로그, 지도를 활용한 맛집, 그동안 읽었던 책의 후기, 자기소개 등의 다양한 프로젝트를 담고 있습니다. 무엇을 좋아하고 어떤 사람인지를 보여줄 수 있는 자신만의 웹사이트를 만들고자 프로젝트를 시작했습니다. 직접 웹사이트를 운영하며 프론트엔드 분야의 새로운 기술들을 적용해 봄으로써 다양한 경험을 쌓을 수 있었습니다. Next.JS의 서버 사이드 렌더링을 적극 활용하여 성능 향상에 집중하였으며 SEO를 개선하기 위해 노력 중입니다.',
    link: 'https://www.ventileco.site',
  },
  {
    id: 603,
    title: 'Design System',
    image: 'bg-[url("/images/project3.png")]',
    description:
      ' Figma를 사용하여 직접 UI를 디자인한 후, 디자인 시스템 개발하여 스토리북과 라이브러리에 배포하였습니다. 프로젝트마다 반복되는 컴포넌트 사용이 비효율적인 작업으로 생각되어 디자인 시스템을 만들어 npm에 라이브러리 형태로 배포하여 생산성을 향상하고자 하였습니다. 앞으로 지속적인 업데이트와 피드백을 통해 디자인 시스템을 더욱 발전시키고자 합니다.',
    link: 'https://main--65d95b8c1722df69e575a89f.chromatic.com',
  },
  {
    id: 604,
    title: 'SFACLOG',
    image: 'bg-[url("/images/project4.png")]',
    description:
      '스나이퍼 팩토리 인턴 과정 중 진행한 프로젝트로 디자이너와 협업하여 진행한 프로젝트입니다. 디자이너분들과의 지속적인 커뮤니케이션을 통해 피드백을 교환하며 결과물을 개선하는 경험을 할 수 있었습니다. 모노레포를 구성하여 공통 컨벤션 및 UI 컴포넌트 모듈을 생성하였고, 백엔드 개발자가 없이 진행된 프로젝트로 PoketBase라는 BaaS를 이용하여 백엔드를 구축하였습니다. 개발에 주어진 시간이 많이 부족했기에 비록 코드의 완성도는 떨어지지만, 스프린트하게 진행 된 프로젝트 과정 속에서 우선 순위를 정하고 명확한 목표를 세워 짧은 기간 안에 작업을 완료할 수 있었습니다. 팀원 분들과의 원활한 협업 덕에 프로젝트 성과 발표회에서 웹 부분 우수팀이라는 성적을 거둘 수 있었습니다.',
    link: 'https://team-5-sfaclog-web.vercel.app',
  },
]
