export default function Credit() {
  return (
    <div className="ml-10 w-full h-[100dvh] overflow-scroll bg-fixed">
      <div className="mt-[100px]">
        <div className="text-6xl flex flex-col items-center justify-center gap-10">
          <div>⭐ 만든 사람</div>
          <div className="flex items-center">
            팀장 :
            <div className="flex items-center gap-5 ml-5">
              <div>이주영</div>
            </div>
          </div>
          <div className="flex">
            팀원 :
            <div className="flex flex-col items-center gap-5 ml-5">
              <div>김선영</div>
              <div>김성훈</div>
              <div>오영곤</div>
              <div>조현진</div>
            </div>
          </div>

          {/* 추가 */}
          <div className="flex  justify mt-[200px] gap-8">
            <div className="flex flex-col items-center gap-5">
              <div className="border-solid border-[10px] border-white-100 rounded-full overflow-hidden w-[200px] h-[200px]">
                <img src="images/profile-ljy.jpg" alt="이주영" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="">
                <div>🍐이주영</div>
              </div>
              <div className="flex flex-col items-center  text-4xl ml-10">
                <div className="text-5xl text-primary-BASIC">구현 페이지</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>대시보드</div>
                </div>
                <div className="text-5xl text-primary-BASIC mt-5">구현 기능</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>컬럼 드래그 앤 드롭</div>
                  <div>카드 리스트 무한 스크롤</div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 */}
          <div className="flex  justify mt-[200px] gap-8">
            <div className="flex flex-col items-center gap-5">
              <div className="border-solid border-[10px] border-white-100 rounded-full overflow-hidden w-[200px] h-[200px]">
                <img src="images/profile-ksy.jpg" alt="김선영" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="">
                <div>🍐김선영</div>
              </div>
              <div className="flex flex-col items-center  text-4xl ml-10">
                <div className="text-5xl text-primary-BASIC">구현 페이지</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>로그인</div>
                  <div>회원 가입</div>
                  <div>계정 관리</div>
                  <div>크레딧</div>
                </div>
                <div className="text-5xl text-primary-BASIC mt-5">구현 기능</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>로그인 기능</div>
                  <div>회원 가입 기능</div>
                  <div>프로필 이미지 선택</div>
                  <div>닉네임, 비밀번호 변경</div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 */}
          <div className="flex  justify mt-[200px] gap-8">
            <div className="flex flex-col items-center gap-5">
              <div className="border-solid border-[10px] border-white-100 rounded-full overflow-hidden w-[200px] h-[200px]">
                <img src="images/profile-ksh.jpg" alt="김성훈" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="">
                <div>🍐김성훈</div>
              </div>
              <div className="flex flex-col items-center  text-4xl ml-10">
                <div className="text-5xl text-primary-BASIC">구현 컴포넌트</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>모달 구현</div>
                </div>
                <div className="text-5xl text-primary-BASIC mt-5">구현 기능</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>할일 모달 확인,생성,수정</div>
                  <div>댓글 추가,삭제,수정</div>
                  <div>칼럼 모달 생성,삭제,수정</div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 */}
          <div className="flex  justify mt-[200px] gap-8">
            <div className="flex flex-col items-center gap-5">
              <div className="border-solid border-[10px] border-white-100 rounded-full overflow-hidden w-[200px] h-[200px]">
                <img src="images/profile-oog.jpg" alt="오영곤" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="">
                <div>🍐오영곤</div>
              </div>
              <div className="flex flex-col items-center  text-4xl ml-10">
                <div className="text-5xl text-primary-BASIC">구현 페이지</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>랜딩</div>
                  <div>대시보드수정</div>
                </div>
                <div className="text-5xl text-primary-BASIC mt-5">구현 기능</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>Fetch Interceptor</div>
                  <div>3D View + iframe 렌딩페이지</div>
                  <div>레이아웃</div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 */}
          <div className="flex  justify mt-[200px] gap-8 mb-[100px]">
            <div className="flex flex-col items-center gap-5">
              <div className="border-solid border-[10px] border-white-100 rounded-full overflow-hidden w-[200px] h-[200px]">
                <img src="images/profile-jhj.jpg" alt="조현진" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="">
                <div>🍐조현진</div>
              </div>
              <div className="flex flex-col items-center  text-4xl ml-10">
                <div className="text-5xl text-primary-BASIC">구현 페이지</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>마이대시보드</div>
                  <div>사이드바</div>
                  <div>NotFound</div>
                </div>
                <div className="text-5xl text-primary-BASIC mt-5">구현 기능</div>
                <div className="flex flex-col items-center mt-2 gap-3">
                  <div>초대목록 검색</div>
                  <div>초대 리스트 무한스크롤</div>
                  <div>대시보드간 위치 변경</div>
                  <div>실시간 재랜더링</div>
                  <div>레이아웃과 구분된 사이드 바</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
