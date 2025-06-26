import { z } from 'zod';

const noEmojiRegex = /^[\p{L}\p{N}\s.,-]*$/u;

export const categoriesSchema = z.object({
  name: z.string().min(1, 'minimal 1 karakter').max(20, 'maks 20 karakter').regex(noEmojiRegex, 'Tidak boleh mengandung emoji atau karakter spesial'),
  type: z.enum(['income', 'expense'], { required_error: 'Type is required' }),
});

export const createCategoriesSchema = categoriesSchema;
export const editCategoriesSchema = categoriesSchema.partial().extend({
  id: z.number().min(1),
  user_id: z.string(),
});

export type CreateCategoriesSchemaType = z.infer<typeof createCategoriesSchema>;
export type EditCategoriesSchemaType = z.infer<typeof editCategoriesSchema>;
