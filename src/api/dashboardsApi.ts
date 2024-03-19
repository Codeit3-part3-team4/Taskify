import { authInstance } from '@/utils/functionalFetch';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwNywidGVhbUlkIjoiMy00IiwiaWF0IjoxNzA5NzExMDE0LCJpc3MiOiJzcC10YXNraWZ5In0.h8TMK9il9gbWP30rQg0l21SA6DTvw8ozt4ygzit7RYg';
//token 변수에 로그인 시 받은 accessToken을 연결하면 됩니다
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashboardsInf {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: null | number;
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

export interface InvitationsInf {
  invitations: Invitation[];
  totalCount: number;
}

export const addDashboardApi = async (title: string, color: string) => {
  const res = await fetch(`${BASE_URL}/3-4/dashboards`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    body: JSON.stringify({
      title: title,
      color: color,
    }),
  });
  return res;
};

export const getDashboardDetailsApi = async (id: number) => {
  const res: Dashboard = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.status === 404) {
        throw new Error('404 not found');
      }
      return res.json();
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

export const putDashboardDetailsApi = async (id: number, title: string, color: string) => {
  const res: Dashboard = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        color: color,
      }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};

export const deleteDashboardApi = async (id: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}`, {
      method: 'DELETE',
      cache: 'no-cache',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};

export const getDashboardsByPaginationApi = async (page: number, size: number): Promise<DashboardsInf> => {
  const res = await fetch(`${BASE_URL}/3-4/dashboards?navigationMethod=pagination&page=${page}&size=${size}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const postDashboardInvitationsApi = async (id: number, email: string) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}/invitations`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`${res.status} error`);
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};

export const getDashboardInvitationsApi = async (id: number, page: number, size: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}/invitations?page=${page}&size=${size}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        accept: 'application/json',
      },
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 403) {
        throw new Error(`403 Forbidden`);
      } else if (res.status === 404) {
        throw new Error(`404 Not Found`);
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return res;
};

export const deleteDashboardInvitationsCancelApi = async (id: number, invitationId: number) => {
  const res = await authInstance
    .fetch(`${BASE_URL}/3-4/dashboards/${id}/invitations/${invitationId}`, {
      method: 'DELETE',
      cache: 'no-cache',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('error');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return res;
};
