import { ensureArray } from '@/features/_shared/ensureArray';
import { optimisticUpdate } from '@/features/_shared/optimisticData';
import { createClient } from '@/lib/supabase/client';
import { EditTransactionFormType } from '@/validator/transaction';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditTransactions = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['transactions'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, amount, category_id, date, description, type, user_id }: EditTransactionFormType) => {
      const { error } = await supabase.from('transactions').update({ id, amount, category_id, date, description, type, user_id }).eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Transaction[]>(queryKey);

      const optimisticUpdateDataTransaction: Transaction = {
        id: Number(newData.id),
        category_id: Number(newData.category_id),
        amount: Number(newData.amount),
        type: newData.type as CategoriesType,
        description: newData.description ?? '',
        date: newData.date ?? '',
      };

      queryClient.setQueryData<Transaction[]>(queryKey, (old) => {
        const transaction = ensureArray<Transaction>(old);
        return optimisticUpdate<Transaction>(transaction, optimisticUpdateDataTransaction);
      });

      return { prevData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(queryKey, _context?.prevData);
      toast.error(_err instanceof Error ? _err.message : 'Gagal update kategori');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
