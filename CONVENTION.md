# 코딩 컨벤션

## 네이밍 컨벤션

- **상수**: `CAPITAL_SNAKE_CASE` 사용
- **변수/함수**: `camelCase` 사용
- **클래스/컴포넌트/인터페이스**: `PascalCase` 사용
- **함수 선언**: 화살표 함수 사용, 예: `const functionName = () => {}`
- **이벤트 핸들러**: `camelCase` 사용, 예: `handleLoginButtonClick` 또는 `onClickLoginButton`. 예제: `button.addEventListener("click", onClickLoginButton)`

## 폴더 및 파일 명명 규칙

- **기본 폴더명**: 소문자 사용
- **컴포넌트를 직접적으로 담는 폴더명**: `PascalCase` 사용
- **컴포넌트 파일명**: 컴포넌트와 동일하게 `PascalCase` 사용
- **이미지 파일명(assets)**: `kebab-case` 사용, 예: `kakao-icon`, `arrow`

## 렌더링 및 내보내기

- 조건부 렌더링 시 `&&` 사용을 선호하여 코드를 간결하게 하자. 단, `&&` 사용 시 좌측 값이 falsy 값이면 안 되며, 숫자일 경우는 피해야 함.
- **컴포넌트 명명**: 컴포넌트는 명사, 함수는 동사를 사용.
- **내보내기 시**: 변수 또는 함수 앞에 `export` 직접 붙이기, 예: `export default function () { }`
- 선택창은 `select`, 불리언을 나타내는 변수는 앞에 `is` 붙이기, 페이지를 나타내는 경우 `page` 생략 (예: list 페이지면 그냥 `List`)

# 커밋 컨벤션 (커밋 메시지)

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락
- **chore**: 기타 작업
- **test**: 테스트 코드 추가
- **refactor**: 코드 리팩토링
- **comment**: 필요한 주석 추가 및 변경
- **rename**: 이름 변경
- **design**: CSS 등 UI 변경
- **remove**: 파일 삭제

# 기타
public  
 - next.svg  
 - vercel.svg  
 - images  
src  
 - api  
   - api.ts ( fetch( url ) ) <--  
   - cardApi.ts  
   - dashboardApi.ts  
 - app  
   - home  
     - page.tsx ( async function getApi() )  
     - layout.tsx  
     - (dashboardComponents)  
     - dashboardContainer.tsx  
 - components  
    - modal  
    - button  
 - utils  
 


