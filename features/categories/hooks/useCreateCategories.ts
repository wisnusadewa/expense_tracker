import { ensureArray } from '@/features/_shared/ensureArray';
import { createClient } from '@/lib/supabase/client';
import { CreateCategoriesSchemaType } from '@/validator/categories';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateCategories = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['categories'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async (dataUser: CreateCategoriesSchemaType) => {
      const { data, error } = await supabase.from('categories').insert(dataUser);

      if (error) throw new Error(error.message);
      return data;
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Category[]>(queryKey);

      const optimisticDataCategory: Category = {
        id: `id-${Date.now()}`,
        name: newData.name,
        type: newData.type,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Category[]>(queryKey, (old) => {
        const category = ensureArray(old);
        return [optimisticDataCategory, ...category];
      });

      return { prevData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(queryKey, _context?.prevData);
      toast.error(_err instanceof Error ? _err.message : 'failed create catefories!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
