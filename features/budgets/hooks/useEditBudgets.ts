import { createClient } from '@/lib/supabase/client';
import { EditBudgetsSchemaType } from '@/validator/budgets';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditBudgets = () => {
  const queryKey: QueryKey = ['budgets'];
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (data: EditBudgetsSchemaType) => {},

    onMutate: async () => {},

    onError: (_err, _variables, _context) => {},

    onSettled: () => {},
  });
};
