import { useUser } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { QueryKey, useQuery } from '@tanstack/react-query';

export const useGetBudgets = () => {
  const queryKey: QueryKey = ['budgets'];
  const supabase = createClient();
  const user = useUser();

  return useQuery<Budgets[]>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from('budgets').select('*, budgets_category_id_fkey(name)').eq('user_id', user?.id);

      if (error) throw new Error(error.message);

      return data;
    },
  });
};
