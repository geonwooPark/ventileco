export const RootMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FE_URL as string),
  title: {
    default: 'Ventileco',
    template: `%s | Ventileco`,
  },
  description: '신입 웹 프론트엔드 개발자 박건우입니다.',
  keywords: [
    '프론트엔드',
    '포트폴리오',
    '개발자',
    '프론트엔드 개발자 포트폴리오',
    '웹 개발자',
  ],
  openGraph: {
    title: {
      default: 'Ventileco',
      template: `%s | Ventileco`,
    },
    description: '신입 웹 프론트엔드 개발자 박건우입니다.',
    images: '/images/og-image.png',
    url: process.env.NEXT_PUBLIC_FE_URL,
    type: 'website',
  },
  icons: {
    icon: '/images/favicon.ico',
  },
  verification: {
    google: 'Ib9DLGTTkxzdg0mlwOLhB2GjzIwB8Od2tFbWWWwPWzk',
  },
}

export const BlogMetadata = {
  title: {
    default: 'Ventileco 개발 블로그',
    template: `%s | Ventileco 개발 블로그`,
  },
  description:
    '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그입니다.',
  openGraph: {
    title: {
      default: 'Ventileco 개발 블로그',
      template: `%s | Ventileco 개발 블로그`,
    },
    description:
      '프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그입니다.',
    images: '/images/og-image.png',
    url: `${process.env.NEXT_PUBLIC_FE_URL}/blog`,
    type: 'website',
  },
}

export const BookMetadata = {
  title: {
    default: 'Ventileco 독서 리스트',
    template: `%s | Ventileco 독서 리스트`,
  },
  description: '그동안 읽었던 책들의 후기를 남깁니다.',
  openGraph: {
    title: {
      default: 'Ventileco 독서 리스트',
      template: `%s | Ventileco 독서 리스트`,
    },
    description: '그동안 읽었던 책들의 후기를 남깁니다.',
    images: '/images/og-image.png',
    url: `${process.env.NEXT_PUBLIC_FE_URL}/book`,
    type: 'website',
  },
}

export const HotPlaceMetadata = {
  title: {
    default: 'Ventileco 맛집 리스트',
    template: `%s | Ventileco 맛집 리스트`,
  },
  description: '자주 방문하는 지역의 맛집을 소개합니다.',
  openGraph: {
    title: {
      default: 'Ventileco 맛집 리스트',
      template: `%s | Ventileco 맛집 리스트`,
    },
    description: '자주 방문하는 지역의 맛집을 소개합니다.',
    images: '/images/og-image.png',
    url: `${process.env.NEXT_PUBLIC_FE_URL}/hot-place`,
    type: 'website',
  },
}

export const ProjectMetadata = {
  title: '프로젝트',
  description: '그동안 진행해온 프로젝트를 소개하는 페이지입니다.',
  openGraph: {
    title: '프로젝트',
    description: '그동안 진행해온 프로젝트를 소개하는 페이지입니다.',
    images: '/images/og-image.png',
    url: `/project`,
    type: 'website',
  },
}

export const MypageMetadata = {
  title: '마이페이지',
  description: '내 정보 및 활동 내역을 확인할 수 있는 페이지입니다.',
  openGraph: {
    title: '마이페이지',
    description: '내 정보 및 활동 내역을 확인할 수 있는 페이지입니다.',
    images: '/images/og-image.png',
    url: `/mypage`,
    type: 'website',
  },
}
