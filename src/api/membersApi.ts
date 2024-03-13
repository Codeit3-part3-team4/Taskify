const BASE_URL = 'https://sp-taskify-api.vercel.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5NzExMDE0LCJpc3MiOiJzcC10YXNraWZ5In0.h8TMK9il9gbWP30rQg0l21SA6DTvw8ozt4ygzit7RYg';
//token 변수에 로그인 시 받은 accessToken을 연결하면 됩니다

export interface Member {
  id: number;
  email: string,
  nickname: string,
  profileImageUrl: string,
  createdAt: string,
  updatedAt: string,
  isOwner: boolean,
  userId: number,
}

export interface MembersInf {
  members: Member[];
  totalCount: number;
}

export const getMembersApi = async (id: number, page: number, size: number) => {
  const res: MembersInf = await fetch(`${BASE_URL}/3-4/members?page=${page}&size=${size}&dashboardId=${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    } }).then((res) => {
      if(res.status === 404) {
        throw new Error('404 not found')
      }
      return res.json();
    }).catch((error) => {
      console.log(error)
      return null;
    })
  return res;
}
