import { ensureArray } from '@/features/_shared/ensureArray';
import { optimisticDelete } from '@/features/_shared/optimisticDelete';
import { createClient } from '@/lib/supabase/client';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteTransactions = () => {
  const supabase = createClient();
  const queryKey: QueryKey = ['transactions'];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },

    onMutate: async (idRemove) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Transaction[]>(queryKey);

      queryClient.setQueryData<Transaction[]>(queryKey, (old) => {
        const trasaction = ensureArray<Transaction>(old);

        return optimisticDelete<Transaction>(trasaction, idRemove);
      });
    },

    onError: () => {},

    onSettled: () => {},
  });
};

export default useDeleteTransactions;
