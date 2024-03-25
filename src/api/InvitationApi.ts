import { authInstance } from '@/utils/functionalFetch';

const API_URL = 'https://sp-taskify-api.vercel.app';

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

export const getInvitationList = async (size: number, cursorId: number | null, inputValue: string | null): Promise<GetInvitationList> => {
  const res = await authInstance.fetch(
    `${API_URL}/3-4/invitations?size=${size}${cursorId ? `&cursorId=${cursorId}` : ''}${inputValue ? `&title=${inputValue}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    },
  );
  return await res.json();
};

export const putInvitation = async (invitationId: number, isAccepted: boolean) => {
  const res = await authInstance.fetch(`${API_URL}/3-4/invitations/${invitationId}`, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ inviteAccepted: isAccepted }),
  });

  return res;
};
