import { ensureArray } from '@/features/_shared/ensureArray';
import { createClient } from '@/lib/supabase/client';
import { CreateBudgetsSchemaType } from '@/validator/budgets';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBudgets = () => {
  const queryKey: QueryKey = ['budgets'];
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (dataBudgets: CreateBudgetsSchemaType) => {
      const { data: budgets, error } = await supabase.from('budgets').insert(dataBudgets);

      if (error) throw new Error(error.message);

      return budgets;
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Budgets[]>(queryKey);

      const newDataOptimistic: Budgets = {
        ...newData,
        id: Date.now(),
      };

      queryClient.setQueryData<Budgets[]>(queryKey, (old) => {
        const budgets = ensureArray<Budgets>(old);
        return [newDataOptimistic, ...budgets];
      });

      return { prevData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(queryKey, _context?.prevData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
