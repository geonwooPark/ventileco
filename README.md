# Next.js 13 Blog 웹사이트

\*\*개발기간: 2023.10.21 ~

---

## 🏠 프로젝트 소개

> [https://ventileco-blog.vercel.app/](https://ventileco-blog.vercel.app/)

<br>

Next.JS 13 App Router를 기반으로 한 개인 블로그로 공부한 내용이나 포트폴리오 등을 기록할 수 있는 공간이 있으면 좋겠다고 생각하여 제작하였습니다. 최신 기술 동향, 개발 팁, 프로젝트 경험을 중심으로 다양한 주제를 다루고 있습니다. 함께 성장하는 개발자 커뮤니티의 일원으로, 지식을 나누고 공유하려 합니다.

#### - Dynamic Routes별 정적 페이지 HTML 생성 자동화
#### - 페이지별 Dynamic Metadata 설정
#### - Route Handlers를 사용하여 웹 API 생성
#### - Next-Auth를 이용한 로그인 및 회원가입 기능 구현
#### - MongoDB 데이터베이스 연동
#### - React-Quill를 이용한 텍스트 에디터 제작

---

## 💪🏻 주요 기능

### ⭐ 빠른 페이지 로딩

- 서버 렌더링을 통해 웹 페이지와 상호 작용할 때 발생하는 대기 시간을 최소화하여 사용자의 만족도를 향상시킵니다.

### ⭐️ 포스팅 및 카테고리 관리

- 글을 작성하고 편집할 수 있는 편리한 에디터 기능을 제공하며 포스트를 카테고리로 분류하여 독자들이 관심 있는 주제를 찾기 쉽게 합니다.

### ⭐️ 페이지네이션 및 검색

- 페이지네이션으로 컨텐츠를 여러 페이지로 나누어 사용자가 쉽게 목록을 탐색할 수 있도록 돕습니다. 또한 글을 빠르게 찾을 수 있도록 효과적인 검색 기능을 제공합니다.

### ⭐️ 사용자 커뮤니케이션

- 독자들 간의 소통을 촉진하기 위해 댓글 기능을 제공합니다.

### ⭐️ 반응형 디자인

- 다양한 디바이스에서 블로그를 편리하게 이용할 수 있도록 반응형 디자인을 구현했습니다.

---

## 🛠 기술 스택

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Tailwind-CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white)
![TanStack Query](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-EA4AAA?style=for-the-badge&logo=Zustand&logoColor=white)

---

## 🖥 화면 구성

|                                                                            메인 페이지                                                                             |                                                                         로그인 및 회원가입                                                                         |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="400" alt="스크린샷 2023-11-11 오후 8 43 57" src="https://github.com/geonwooPark/myblog/assets/136573728/2ae1d0b2-486b-4a3b-9820-61c1fc41b2cc"> | <img width="400" alt="스크린샷 2023-11-11 오후 8 44 24" src="https://github.com/geonwooPark/myblog/assets/136573728/46e37087-cabf-4ff9-b4d1-68b6560e485e"> |
|                                                                            상세 페이지                                                                             |                                                                            작성 페이지                                                                             |
| <img width="400" alt="스크린샷 2023-11-11 오후 4 38 32" src="https://github.com/geonwooPark/myblog/assets/136573728/d556ae42-6b1c-440e-a3f6-c358f228ed8f"> | <img width="400" alt="스크린샷 2023-11-11 오후 4 38 20" src="https://github.com/geonwooPark/myblog/assets/136573728/775235c4-a0ae-4f1e-93a8-3f9def62b126"> |
|                                                                            검색 페이지                                                                             |                                                                            마이 페이지                                                                             |
| <img width="400" alt="스크린샷 2023-11-11 오후 4 39 48" src="https://github.com/geonwooPark/myblog/assets/136573728/bd5c1c06-d070-4c90-9348-7b482ab33534"> | <img width="400" alt="스크린샷 2023-11-11 오후 8 44 15" src="https://github.com/geonwooPark/myblog/assets/136573728/23383793-bcf6-49a8-a73d-5a0c781d9ce0"> |

---

## 🗂 폴더 구조

```
📦app
 ┣ 📂_actions
 ┃ ┣ 📜getAllListing.ts
 ┃ ┣ 📜getAllListingCount.ts
 ┃ ┣ 📜getCategoryListing.ts
 ┃ ┣ 📜getCategoryListingCount.ts
 ┃ ┣ 📜getComments.ts
 ┃ ┣ 📜getPopularListing.ts
 ┃ ┣ 📜getPosting.ts
 ┃ ┣ 📜getQueryClient.ts
 ┃ ┗ 📜getSearchListing.ts
 ┣ 📂_components
 ┃ ┣ 📂article
 ┃ ┃ ┣ 📂listing
 ┃ ┃ ┃ ┣ 📜Listing.tsx
 ┃ ┃ ┃ ┣ 📜ListingItem.tsx
 ┃ ┃ ┃ ┗ 📜SkeletonListing.tsx
 ┃ ┃ ┗ 📜Article.tsx
 ┃ ┣ 📂category
 ┃ ┃ ┣ 📜CategoryItem.tsx
 ┃ ┃ ┗ 📜CategoryMenu.tsx
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┣ 📜CommentInput.tsx
 ┃ ┃ ┣ 📜CommentItem.tsx
 ┃ ┃ ┣ 📜CommentList.tsx
 ┃ ┃ ┣ 📜CommentUpdateInput.tsx
 ┃ ┃ ┗ 📜SkeletonCommentList.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Avatar.tsx
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜EmptyState.tsx
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┣ 📜Section.tsx
 ┃ ┃ ┗ 📜Spinner.tsx
 ┃ ┣ 📂dropdown
 ┃ ┃ ┣ 📜DropDownItem.tsx
 ┃ ┃ ┗ 📜DropDownMenu.tsx
 ┃ ┣ 📂editor
 ┃ ┃ ┗ 📜Editor.tsx
 ┃ ┣ 📂heroSection
 ┃ ┃ ┗ 📜HeroSection.tsx
 ┃ ┣ 📂interactionMetrics
 ┃ ┃ ┣ 📜FavCounter.tsx
 ┃ ┃ ┣ 📜InteractionMetrics.tsx
 ┃ ┃ ┗ 📜ViewCounter.tsx
 ┃ ┣ 📂modals
 ┃ ┃ ┣ 📜DeleteCommentModal.tsx
 ┃ ┃ ┣ 📜DeletePostingModal.tsx
 ┃ ┃ ┣ 📜LoginModal.tsx
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┗ 📜SignUpModal.tsx
 ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┣ 📜Menu.tsx
 ┃ ┃ ┣ 📜MenuItem.tsx
 ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┣ 📜RightSide.tsx
 ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┗ 📜SearchIcon.tsx
 ┃ ┣ 📂popularListing
 ┃ ┃ ┣ 📜PopularListing.tsx
 ┃ ┃ ┗ 📜PopularListingItem.tsx
 ┃ ┣ 📂provider
 ┃ ┃ ┣ 📜AuthSession.tsx
 ┃ ┃ ┗ 📜TanstackProvider.tsx
 ┃ ┣ 📂tap
 ┃ ┃ ┣ 📜MyCommentList.tsx
 ┃ ┃ ┣ 📜MyFavList.tsx
 ┃ ┃ ┗ 📜Tap.tsx
 ┃ ┣ 📜DeleteAndEdit.tsx
 ┃ ┣ 📜FavoriteButton.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Pagination.tsx
 ┃ ┗ 📜UserInfo.tsx
 ┣ 📂_hooks
 ┃ ┣ 📜useDeleteCommentModal.ts
 ┃ ┣ 📜useDeletePostingModal.ts
 ┃ ┣ 📜useFavorite.ts
 ┃ ┣ 📜useLoginModal.ts
 ┃ ┣ 📜useSelectedComment.ts
 ┃ ┗ 📜useSignUpModal.ts
 ┣ 📂_interfaces
 ┃ ┗ 📜interface.ts
 ┣ 📂_utils
 ┃ ┣ 📜categoryArr.ts
 ┃ ┣ 📜database.ts
 ┃ ┣ 📜getChunk.ts
 ┃ ┗ 📜getTimeDiff.ts
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂comment
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂favorite
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂favorite-count
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂my-comment
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂my-favorite
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂posting
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜route.ts
 ┃ ┗ 📂view-count
 ┃ ┃ ┗ 📜route.ts
 ┣ 📂categories
 ┃ ┗ 📂[category]
 ┃ ┃ ┣ 📂[page]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂detail
 ┃ ┗ 📂[id]
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂edit
 ┃ ┗ 📂[id]
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂mypage
 ┃ ┗ 📜page.tsx
 ┣ 📂postings
 ┃ ┗ 📂[page]
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂search
 ┃ ┗ 📜page.tsx
 ┣ 📂write
 ┃ ┗ 📜page.tsx
 ┣ 📜favicon.ico
 ┣ 📜firebase.ts
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📜loading.tsx
 ┣ 📜not-found.tsx
 ┣ 📜page.tsx
 ┣ 📜robots.ts
 ┗ 📜sitemap.ts
```
