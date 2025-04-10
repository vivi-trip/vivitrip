## 목차

- [🌟 프로젝트 소개](#-프로젝트-소개)
- [👤 팀원 및 역할](#-팀원-및-역할)
- [💡 목적 Why I built this?](#-목적-why-i-built-this)
- [✨ 주요 기능](#-주요-기능)
- [💻 사용 예시](#-사용-예시)
- [📂 폴더 구조](#-폴더-구조)
- [🛠 기술 스택](#-기술-스택)

<br />

## 🌟 프로젝트 소개

![VIVITRIP Thumbnail](https://vivitrip-thumbnail.s3.ap-northeast-2.amazonaws.com/thumbnails/thumbnail.PNG)

- 전 세계에서 진행되는 다양한 체험을 직접 등록하고, 예약할 수 있는 서비스
- 배포 주소: [https://www.vivitrip.net](https://www.vivitrip.net)

<br />

## 👤 팀원 및 역할

| **강효성<br/>[@kanghyosung1](https://github.com/kanghyosung1)** | **최주혁<br/>[@JuhyeokC](https://github.com/JuhyeokC)** | **하유리<br/>[@hayuri1990](https://github.com/hayuri1990)** |
| :---: | :---: | :---: |
| <img width='400' src='https://velog.velcdn.com/images/kingdawn/post/4e7479fe-f01e-4798-83f3-589b2d4b2976/image.png'/> | <img src='https://velog.velcdn.com/images/kingdawn/post/e2d7cdff-740e-46f1-8d0d-8ba719bbcbc9/image.jpg' width='400'/> | <img src='https://velog.velcdn.com/images/kingdawn/post/f7cd9bd0-4cfa-4c60-b15d-f920520e21db/image.png' width='400'/> |
| 모달 | 드롭다운, GNB | 버튼 |
| 예약 내역, 내 체험 관리<br/>예약 현황, 사이드 네비게이션 | 로그인, 회원가입, 소셜 로그인 <br/>체험 상세 페이지 | 체험 검색,모든 체험 인기 체험, <br/>체험 후기/리뷰 |

<br/>

---

<br/>

## 💡 목적 Why I built this?

- SSR, SSG, ISR의 차이를 이해하고 실제로 적용해보기 위해 Next.js를 선택했습니다.
- 사용자 UX 향상을 위해 React Query, Zustand 등 실무 라이브러리를 적극 도입했습니다.
- 디자인 시스템은 Figma 기반으로 직접 설계하여 Tailwind CSS로 구현했습니다.

<br/>

---

<br/>

## ✨ 주요 기능

<br/>

- 반응형 웹 (Responsive Web Design)
- 정적 생성(SG) + ISR 기반 렌더링 최적화
- SEO를 고려한 메타 태그 및 Open Graph 적용
- 체험 리스트 및 상세 페이지 구현
- 예약 기능 및 조건 필터링

<br/>

---

<br/>

## 💻 사용 예시

<br/>

### 회원가입 > 로그인

- 테스트 계정

http://vivitrip.net/sign-in/admin 접속 후 하단의 테스트 계정 중 선택하여 로그인 가능

![](https://velog.velcdn.com/images/qoswfxin/post/c55bb502-03c3-4228-b743-59a08a4dd6e0/image.gif)

<br/>

## 체험 등록/수정/삭제

- 체험 등록

  ![](https://github.com/user-attachments/assets/852bc660-8539-4c64-a2b7-7c03108e9ec4)

- 체험 수정/삭제

  ![image (1)](https://github.com/user-attachments/assets/036cb1df-fef4-4dff-a2a7-531122666271)

<br/>

## 체험 예약

![image (2)](https://github.com/user-attachments/assets/7fac5e71-a918-4bf0-9e35-91416dda36c6)

<br/>

## 예약 승인/거절

- 체험 등록자만 가능
- 예약자는 알림을 통해 예약 승인 여부 확인 가능

![](https://velog.velcdn.com/images/qoswfxin/post/2acfc3d7-9660-44b8-a2fe-e4249652a13b/image.gif)

<br/>

## 후기 작성

- 체험 종료 시간 이후 작성 가능

![](https://velog.velcdn.com/images/qoswfxin/post/f052f668-d530-4a5f-9214-3756e778de33/image.gif)

<br/>

---

<br/>

## 📂 폴더 구조

```
├── pages/                # 라우팅 페이지
├── components/           # UI 컴포넌트
├── containers/           # 페이지 단위의 UI 컴포넌트
├── hooks/                # 커스텀훅 정의 및 로직 분리
├── services/             # API 호출 함수
├── stores/               # 글로벌 상태관리 (Zustand)
├── types/                # 타입 정의
├── utils/                # 유틸 함수
```

<br/>

---

<br/>

## 🛠 기술 스택

- **Frontend**

  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" /> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />

- **Styling**

  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" /> <img src="https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white" />

- **Data Fetching**

  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />

- **State Management**

  <img src="https://img.shields.io/badge/-Zustand-FB8C00?style=for-the-badge&logo=Zustand&logoColor=white" />

- **Deployment**

  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" /> <img src="https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white" />

- **Team Collaboration**

  <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white" />

- **QA**:

  <img src="https://img.shields.io/coderabbit/prs/github/vivi-trip/vivitrip?utm_source=oss&utm_medium=github&utm_campaign=vivi-trip%2Fvivitrip&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews" />

<br/>

---
