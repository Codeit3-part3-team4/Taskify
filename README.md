# 📚 코드잇 스프린트 3기 4팀 Taskimo




## ✏ 프로젝트 소개



</br>





## 👉🏻 멤버 소개 및 역할

| <img width="100"  alt="image" src="https://github.com/Codeit3-part3-team4/Taskify/assets/126558640/6d4f4d70-1b3d-4d69-9170-60e848102c88"> | <img width="100" alt="image" src="https://avatars.githubusercontent.com/u/129745640?v=4"> | <img width="100" alt="image" src='https://avatars.githubusercontent.com/u/68732996?v=4'> | <img width="100"  alt="image" src="https://github.com/Codeit3-part3-team4/Taskify/assets/126558640/0932792e-f5de-412b-940f-5c3c8b94f6c8"> | <img width="100" alt="image" src="https://avatars.githubusercontent.com/u/126558640?v=4"> |
| :-: | :-: | :-: | :-: | :-: |
| [김선영](https://github.com/kimsuns) | [김성훈](https://github.com/huniiiiii) | [오영곤](https://github.com/ohddang) | [이주영](https://github.com/2zzzyoung) | [조현진](https://github.com/ahrrrl) |



### 🙍‍♂️

페이지:  </br>

공통:  </br>

기능: </br>
- 
- 
- 
- 
- 

###  🙍‍♂️김성훈  

공통: 모달 구현 </br>

## 기능: </br>
- 할일 모달 확인, 생성, 수정 구현  
- 댓글 추가, 삭제, 수정 구현
- 칼럼 모달 생성, 삭제, 수정 구현


###  🙍‍♀️김선영

페이지:  로그인, 회원가입, 계정관리 </br>

기능: </br> 
- 로그인 기능 구현
- 회원 가입 기능 구현
- 프로필 이미지, 닉네임, 비밀번호 수정 구현
  

###  🙍‍♂️오영곤

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

> 배경 이미지를 고려한 레이아웃 구성
- 배경 이미지보다 컬럼이나 카드리스트들이 너비 및 높이가 늘어났을때 배경이미지 밖으로 빈영역이 생기는 문제를 해결하기 위해
배경 이미지 크기 요소의 영역을 구성하고 이를 벗어나면 스크롤하게 하여 완성도를 높힘

###  이주영🙍‍♀️

페이지:  대시보드 </br>

공통:  </br>

기능: </br> 
> Fetch Interceptor 구현
> 3
> 카드 무한스크롤
  

###  🙍‍♂️조현진

## 마이대시보드 페이지, 사이드 바, NotFound 페이지
- 마이대시보드에 페이지에 해당하는 대시보드를 보여줌
- 초대 받은 대시보드 검색, 수락, 거절 기능 구현
- 마이대시보드, 사이드바에 대시보드 추가 버튼 및 대시보드 추가 모달
- 사이드바 대시보드 간 위치 이동 기능
- NotFound 페이지에 뒤로가기, 메인으로가기 구현

## 기능
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

- 

## 💾 기술 스택




## 🔔 주요기능 소개

##  **내용**



- 
- 
- 

## **할일 모달**

- 원하는 칼럼에서 할 일 생성을 누르면 정보를 입력하고 카드를 생성할 수 있습니다.
- 카드가 생성되면 카드에 할 일 정보가 나오며, 대시보드에 초대된 사람들이 댓글을 적을 수 있습니다.
- 케밥 버튼을 누르면 수정하기와 삭제하기가 드롭다운으로 나오며, 수정하기를 누르면 현재 카드의 정보를 수정할 수 있으며, 삭제하기를 누르면 현재 카드를 삭제할 수 있습니다.


## **컬럼 모달**

- 새로운 컬럼 추가하기를 누르면 새 컬럼을 생성할 수 있습니다.
- 생성된 컬럼 우측에 톱니바퀴를 누르면 컬럼을 관리할 수 있습니다.
- 컬럼 관리 모달에서 컬럼 이름을 변경할 수 있고, 삭제하기를 누르면 해당 컬럼이 삭제됩니다. 

## **내용**






- 
- 
- 
- 
- 
- 
- 

## **내용**






- 
- 
- 
- 
- 
- 
