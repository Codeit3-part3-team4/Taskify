import { UserInfo } from '@/api/userApi';
import { createContext } from 'react';

interface UserContextType {
  data: UserInfo | null;
  setData: (data: UserInfo | null) => void;
}

export const UserContext = createContext<UserContextType>({
  data: null,
  setData: () => {},
});
