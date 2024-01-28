import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { User } from '@shared-types';
import { getNewToken } from '@shared-utils';

export default function useProfile(
  redirect = true,
): [User | undefined, boolean, Dispatch<SetStateAction<User | undefined>>] {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem('access_token');
    let u: User;

    if (!token) {
      if (redirect) {
        router.push('/login');
      }
      setIsLoading(false);
      return;
    }

    u = jwt_decode(token);
    setUser(u);

    if (u.exp <= Date.now() / 1000) {
      getNewToken().then((newToken) => {
        u = jwt_decode(newToken);
        setUser(() => u);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [setUser, setIsLoading]);
  return [user, isLoading, setUser];
}
