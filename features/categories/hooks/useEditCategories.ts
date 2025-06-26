import { ensureArray } from '@/features/_shared/ensureArray';
import { optimisticUpdate } from '@/features/_shared/optimisticData';
import { createClient } from '@/lib/supabase/client';
import { EditCategoriesSchemaType } from '@/validator/categories';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditCategories = () => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['categories'];
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ name, type, id }: EditCategoriesSchemaType) => {
      const { error } = await supabase.from('categories').update({ name, type }).eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Category[]>(queryKey);

      const optimisticUpdateDataCategory: Category = {
        ...newData,
        id: String(newData.id),
        name: newData.name ?? '',
        type: newData.type as CategoriesType,
      };

      queryClient.setQueryData<Category[]>(queryKey, (old) => {
        const category = ensureArray<Category>(old);

        return optimisticUpdate<Category>(category, optimisticUpdateDataCategory);
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
