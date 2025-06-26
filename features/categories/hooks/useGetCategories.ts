import { createClient } from '@/lib/supabase/client';
import { QueryKey, useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  const supabase = createClient();
  const queryKey: QueryKey = ['categories'];

  return useQuery<Category[]>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, name, type, created_at');

      if (error) throw new Error(error.message);
      return data;
    },
  });
};
