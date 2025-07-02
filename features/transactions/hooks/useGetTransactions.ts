'use client';

import { useUser } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { QueryKey, useQuery } from '@tanstack/react-query';

export const useGetTransactions = (type?: Transaction) => {
  const supabase = createClient();
  const queryKey: QueryKey = ['transactions'];
  const user = useUser();

  return useQuery<Transaction[]>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from('transactions').select('id, date, amount, type, description, category_id, created_at, transactions_category_id_fkey(name)').eq('user_id', user?.id);

      if (error) throw new Error(error.message);
      return data;
    },
  });
};
