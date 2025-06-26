import { ensureArray } from '@/features/_shared/ensureArray';
import { optimisticDelete } from '@/features/_shared/optimisticDelete';
import { createClient } from '@/lib/supabase/client';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['categories'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Category[]>(queryKey);

      queryClient.setQueryData<Category[]>(queryKey, (old) => {
        const category = ensureArray<Category>(old);
        return optimisticDelete<Category>(category, id);
      });

      return { prevData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(queryKey, _context?.prevData);
      toast.error(_err instanceof Error ? _err.message : 'Gagal delete kategori!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
