const BASE_URL = 'https://sp-taskify-api.vercel.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5NzExMDE0LCJpc3MiOiJzcC10YXNraWZ5In0.h8TMK9il9gbWP30rQg0l21SA6DTvw8ozt4ygzit7RYg';
//token 변수에 로그인 시 받은 accessToken을 연결하면 됩니다

export interface GetInvitationList {
  cursorId: number;
  invitations: Invitation[];
}

export interface Invitation {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: null;
  createdAt: string;
  updatedAt: string;
}

export const getInvitationList = async (
  size: number,
  cursorId: number | null,
  inputValue: string | null,
): Promise<GetInvitationList> => {
  const res = await fetch(
    `${BASE_URL}/3-4/invitations?size=${size}${
      cursorId ? `&cursorId=${cursorId}` : ''
    }${inputValue ? `&title=${inputValue}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return await res.json();
};

export const putInvitation = async (
  invitationId: number,
  isAccepted: boolean,
) => {
  const res = await fetch(`${BASE_URL}/3-4/invitations/${invitationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    body: JSON.stringify({ inviteAccepted: isAccepted }),
  });

  return res;
};
