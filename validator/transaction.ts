import { z } from 'zod';

export const transactionSchema = z.object({
  user_id: z.string().min(1),
  category_id: z.number().min(1, 'Category is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense'], { required_error: 'Type is required' }),
  description: z.string().min(1, 'Description is required').max(255, 'Description is too long'),
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Invalid date format (YYYY-MM-DD)',
  }),
});

export const editTransactionSchema = transactionSchema.partial().extend({
  id: z.number().min(1, 'id harus number'),
});

export type CreateTransactionFormType = z.infer<typeof transactionSchema>;
export type EditTransactionFormType = z.infer<typeof editTransactionSchema>;
