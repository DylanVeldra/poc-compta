import { fetchJSON } from '@shared-utils';
import { createContext, useContext, useEffect, useState } from 'react';
import useProfile from './useProfile';

const BalanceContext = createContext({ value: 0, userId: 0 });

function useBalance(isAdmin = false) {
  const [user, isLoading] = useProfile(false);
  const balance = useContext(BalanceContext);

  useEffect(() => {
    if (user && balance.userId !== user.id) {
      fetchJSON(isAdmin ? '/balance/fund/total' : '/balance').then((json) => {
        balance.value = json.body;
        balance.userId = user.id;
      });
    }
  }, [user]);
  return balance.value;
}

export default useBalance;
