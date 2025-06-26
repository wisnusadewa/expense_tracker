import { createClient } from '@/lib/supabase/client';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditTransactions = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['transactions'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async (dataTransactions: Transaction) => {
      const {} = await supabase.from('transactions').select().eq();
    },

    onMutate: () => {},

    onError: () => {},

    onSettled: () => {},
  });
};
