import { ensureArray } from '@/features/_shared/ensureArray';
import { createClient } from '@/lib/supabase/client';
import { CreateTransactionFormType } from '@/validator/transaction';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateTransactions = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['transactions'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async (dataTransactions: CreateTransactionFormType) => {
      const { data, error } = await supabase.from('transactions').insert(dataTransactions);
      if (error) throw new Error(error.message);
      return data;
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Transaction[]>(queryKey);

      const newDataOptimistic: Transaction = {
        id: `${Date.now()}`,
        user_id: newData.user_id,
        amount: newData.amount,
        type: newData.type,
        category_id: newData.category_id,
        description: newData.description,
        date: newData.date,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Transaction[]>(queryKey, (old) => {
        const transaction = ensureArray<Transaction>(old);

        return [newDataOptimistic, ...transaction];
      });

      return { prevData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(queryKey, _context?.prevData);
      toast.error(_err instanceof Error ? _err.message : 'failed create transactions!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
