# 🎬 **mbdi API 활용 영화검색 사이트 만들기**

## 🌟 결과물 관련

<br/>

### 🔗 [배포 링크](searchmoviesdotcom.netlify.app)

<br/>

### 📅 과제기간

- 2022.10.27. ~ 2022.11.6.

<br/>

### 🛠 사용 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-E7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/github-white?style=for-the-badge&logo=github&logoColor=black">

<br/>

### 📃설명

- 동적인 요소는 모두 vanilla js로 구현했습니다.
- 해시변화를 이용해 영화 검색화면과 영화 상세정보를 보는 화면으로 구분하였습니다.
- bootstrap을 사용하여 반응형으로 구현하고 선택 요구사항을 최대한 반영하기 위해 노력했습니다.

<br/>

## ✅ 요구사항

### :exclamation: 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [x] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [x] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 영화와 관련된 기타 기능도 고려해보세요.

<br/>

## ✍ 아쉬운 점 / 어려웠던 부분

- bootstrap 라이브러리 사용이 능숙하지 않아 영화 상세정보를 불러오는 동안 보여지는 skeleton ui 에 부트스트랩 placeholder-glow 애니메이션을 적용하고 싶었으나 해당 클래스를 적용하면 기존에 지정했던 높이값과 배경색대로 화면에 출력되지 않고 사라지는 문제로 적용하지 못했습니다.
- 각 기능/함수별로 js를 모듈화 하고 싶었으나 검색했던 영화 타이틀/페이지 값을 전역변수에 할당하고 그 값을 사용해야하는 함수가 다른 모듈에 있는 경우 기능이 제대로 작동하지 않았고, 그 부분을 해결하지 못해 결국 하나의 파일로 작성했습니다.
- 제목을 입력하지 않고 검색한 경우와 검색 후 불러올 목록이 더이상 없는 경우, 초기화면에서 무한스크롤이 적용된 경우, 이전에 검색했던 페이지 값이 남아있어 화면전환시 누적되어 나타나는 경우 등 각각 다르게 처리해 주어야하는 부분이 어려웠고, 미리 예상하지 못한 에러가 나타나 하나씩 조건을 추가하다보니 함수 하나의 길이가 길어지고 그런 함수들이 서로 얽히고 복잡해져 관리하고 버그를 잡는데 어려움이 있었습니다.
