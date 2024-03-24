# 📚 코드잇 스프린트 3기 4팀 Taskimo




## ✏ 프로젝트 소개
주로 협업에서 사용하는 업무 관리 대시보드를 5인(프론트엔드) 프로젝트로 진행했습니다.


</br>





## 👉🏻 멤버 소개 및 역할

| <img width="100"  alt="image" src="https://github.com/Codeit3-part3-team4/Taskify/assets/126558640/6d4f4d70-1b3d-4d69-9170-60e848102c88"> | <img width="100" alt="image" src="https://avatars.githubusercontent.com/u/129745640?v=4"> | <img width="100" alt="image" src='https://avatars.githubusercontent.com/u/68732996?v=4'> | <img width="100"  alt="image" src="https://github.com/2zzzyoung/OpenMind/assets/107063304/e6238048-4683-40ad-b147-80cf26b58ae8"> | <img width="100" alt="image" src="https://avatars.githubusercontent.com/u/126558640?v=4"> |
| :-: | :-: | :-: | :-: | :-: |
| [김선영](https://github.com/kimsuns) | [김성훈](https://github.com/huniiiiii) | [오영곤](https://github.com/ohddang) | [이주영](https://github.com/2zzzyoung) | [조현진](https://github.com/ahrrrl) |

</br>  

##  🙍‍♂️김성훈  

## 📖 할일모달, 댓글, 칼럼모달
- 대시보드에 카드를 생성할 수 있고, 생성한 카드의 상세정보를 확인할 수 있고, 수정도 가능하게 구현
- 카드의 상세정보에서 사용자나 초대된 사람이 댓글을 생성, 수정, 삭제 할 수 있도록 구현
- 대시보드에 칼럼을 생성, 삭제, 수정 할 수 있도록 구현

## ⭐ 기능
> 모달 구현
- Tailwind의 라이브러리인 Daisy UI를 통해 공통 모달컴포넌트를 구현함.   
> ImageUpload 구현
- 업로드한 이미지 파일을 url로 업데이트 하며 미리보기 기능과 업로드 되도록 구현

</br>  

##  🙍‍♀️김선영

## 📖 로그인, 회원가입 페이지, 계정관리 페이지

## ⭐ 기능 
> 유저 프로필 상태 구현
- 유저 정보를 관리하여 프로필, 닉네임 변경시 반영
- 업로드한 이미지 파일을 url로 업데이트 하며 미리 보기 기능 구현
> ContextApi로 로그인 상태값 확인
- 로그인 상태가 아닌 경우 로그인 페이지로 강제 이동

</br>  

##  🙍‍♂️오영곤

## 📖 랜딩 페이지, 대시보드수정 페이지
- 랜딩 페이지에 intersection observer를 사용하여 스크롤위치에 따라 페이지 요소들의 애니메이션 동작을 보여줌
- 대시보드 이름 및 색상 변경 및 대시보드 삭제하기 기능
- 대시보드에 멤버 구성원 초대 및 초대 취소 구현
- 대시보드 멤버 삭제 기능 구현
- 대시보드 Layout을 구현하여 sidebar와 navigation영역을 layout영역으로 넣어 dashboard관련 page들이 layout을 공유하도록 구현

## ⭐ 기능
> Fetch Interceptor 구현
- 내부적으로 fetch 동작을 수행하는 fetch instance를 생성하고 accessToken및 fetch시 RequestInit 옵션 설정등을 미리 셋팅 해놓고 fetch api를 호출할때
셋팅된 options을 이용해 fetch 동작을 할 수 있도록 구현 

> 상호작용하는 3D View + iframe을 렌딩페이지로 구현
- three.js기반의 3D View를 구현하고 3D View 내부에 상호작용하는 iframe을 랜딩페이지에 구현하여 사용자가 페이지에
좀 더 관심을 가질 수 있도록 구현

> Redirection구현
- 권한이 없거나 서버에서 데이터를 불러오지 못하는 경우. 현재 서버에서 200번대, 400번대 이상의 응답상태만 반환하고 있는 상황으로
redirection이 필요한 상태라고 판단되면 적절한 페이지로 이동하는 기능 구현
  
> 배경 이미지를 고려한 레이아웃 구성
- 배경 이미지보다 컬럼이나 카드리스트들이 너비 및 높이가 늘어났을때 배경이미지 밖으로 빈영역이 생기는 문제를 해결하기 위해
배경 이미지 크기 요소의 영역을 구성하고 이를 벗어나면 스크롤하게 하여 완성도를 높힘

</br>  

##  이주영🙍‍♀️

## 📖 대시보드 페이지

## ⭐ 기능
> 컬럼 드래그 앤 드롭
- react beautiful dnd 라이브러리를 이용해 컬럼 드래그 앤 드롭 기능 구현
  
> 카드 리스트 무한스크롤
- IntersectionObserver 이용하여 무한 스크롤 구현
  
</br>  

##  🙍‍♂️조현진

## 📖 마이대시보드 페이지, 사이드 바, NotFound 페이지
- 마이대시보드에 페이지에 해당하는 대시보드를 보여줌
- 초대 받은 대시보드 검색, 수락, 거절 기능 구현
- 마이대시보드, 사이드바에 대시보드 추가 버튼 및 대시보드 추가 모달
- 사이드바 대시보드 간 위치 이동 기능
- NotFound 페이지에 뒤로가기, 메인으로가기 구현

## ⭐ 기능
> 초대목록 검색
- debounce를 이용해 입력 간 딜레이를 확인 하여 1초 사이에 입력이 없을 시 검색이 실행되게 구현
> 초대 리스트 무한스크롤
- IntersectionObserver 이용하여 무한 스크롤 구현
> 대시보드 간 위치 변경
- react-dnd를 이용한 드래그앤 드롭 기능으로 대시보드 간 위치를 바꿀 수 있게 구현
> 사이드바와 마이대시보드 실시간 재랜더링
- ContextApi로 DashboardData 관리하여 SideDashboard와 MydashboardSection 실시간 재랜더링
> 다른 레이아웃과 구분된 사이드 바
- 브라우저 크기변화에 따른 레이아웃을 위해 vh사용 및 fixed로 고정하여 다른 영역과 독립적으로 레이아웃에 나올 수 있게 구현
</br>

## 📃 배포주소
https://taskimo.vercel.app  

</br>  

## 💾 기술 스택
<img src="https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-1572B6?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white"> 





