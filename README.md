# 📌 **주어진 OMDb API를 활용하여 영화 검색 사이트 만들기**

## ✨ 결과물

### 🔗 배포 링크

-

### ⚙️ 사용 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-E7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/github-white?style=for-the-badge&logo=github&logoColor=black">

### 📃설명

- 전부 vanilla js로 구현했습니다.
- hash event를 사용하여 검색된 영화들의 리스트들이 보이는 페이지와 영화 상세페이지를 볼 수 있도록 하였습니다.
- bootstrap를 통해 전부 디자인하려 했지만 실패하여 헤더 부분과 로딩이미지만 적용해 보았습니다.

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

### ✏️ 아쉬운점 및 어려웠던점

- 각 함수별로 모듈화 하고 싶었으나 검색했던 import과정에서 오류가 생겨 그 부분을 해결하지 못해 결국 하나의 파일로 작성했습니다.
- 영화를 검색 후, 영화 상세페이지를 클릭하고 뒤로 가기를 했을때, 그 전 페이지 그대로인 화면을 나오게 하고 싶었으나 다음페이지의 목록들을 보여주는 문제가 발생하였습니다. 페이지 값을 초기화해도 해당 문제가 계속 발생하였고 결국 해결하지 못해 뒤로 가기를 했을때 초기화면이 나오도록 구현했습니다.

### 💡 질문 및 피드백 요청

- 뒤로가기를 했을 때, 영화 검색목록이 페이지 변화없이 그대로 보여질 수 있게 하려면 어떻게 해야할지 궁금합니다.
