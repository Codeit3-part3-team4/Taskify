# 코딩 컨벤션
상수 : CAPITAL_SNAKE_CASE
변수/함수 : camelCase
클래스/컴포넌트/인터페이스 : PascalCase
함수 선언: const A = () => {}
이벤트핸들러: camelCase(handleLoginButtonClick / onCllickLoginButton)
button.addEventListener("click", onClickLoginButton)

기본 폴더명 : 소문자
직접적으로 컴포넌트를 담는 폴더명 : PascalCase
컴포넌트 파일명 (컴포넌트와 동일하게 작명) : PascalCase
(assets) 이미지 파일명 : (소문자)kebab-case / kakao-icon / arrow

조건부 렌더링 할 때 && 와 삼항연산자 중 &&를 사용해서 코드를 좀 더 줄이도록 하자!
&& 사용 시 주의할 점 ( [&& 왼쪽에 falsy값을 넣되 숫자를 넣으면 안됨])
컴포넌트는 명사, 함수는 동사
export 할때는 내보낼 변수, 함수 앞에 바로 붙이기 / export default function () { }
선택창 ⇒ select, 불리언을 나타내는 변수는 앞에 is 붙이기,
page를 나타내는 경우 page생략 ( list페이지면 그냥 List )


# 커밋 컨벤션(커밋 메시지)
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포멧팅, 세미콜론 누락
chore: 그 외 기타 
test: 테스트 코드
refactor: 코드 리펙토링
comment: 필요한 주석 추가 및 변경
rename: 이름 변경
design: css등 ui 변경
remove: 파일 삭제

# 기타
public
 ㄴ next.svg
 ㄴ vercel.svg
 ㄴ images
src
 ㄴ api
    ㄴ api.ts ( fetch( url ) ) <--
    ㄴ cardApi.ts
    ㄴ dashboardApi. ts
 ㄴ app
     ㄴ home
         - page.tsx ( async function getApi() )
         - layout.tsx
         (dashboardComponents)
          ㄴ dashboardContainer.tsx
 ㄴ components
    ㄴ modal
    ㄴ button
 ㄴ utils
 


