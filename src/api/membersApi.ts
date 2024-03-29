import { authInstance } from '@/utils/functionalFetch';
const API_URL = 'https://sp-taskify-api.vercel.app';

export interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface MembersInf {
  members: Member[];
  totalCount: number;
}

export const getMembersApi = async (id: number, page: number, size: number) => {
  const res: MembersInf = await authInstance
    .fetch(`${API_URL}/3-4/members?page=${page}&size=${size}&dashboardId=${id}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.status === 404) {
        throw new Error('404 not found');
      } else if (res.status >= 400) throw new Error(`${res.status} error`);
      return res.json();
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

export const deleteMemberApi = async (memberId: number) => {
  const res = await authInstance
    .fetch(`${API_URL}/3-4/members/${memberId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.status === 403) {
        throw new Error(`403 Forbidden`);
      } else if (res.status === 404) {
        throw new Error(`404 Not Found`);
      }
      return res.json();
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};
