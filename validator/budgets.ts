import { z } from 'zod';

const noEmojiRegex = /^[\p{L}\p{N}\s.,-]*$/u;

const budgetsSchema = z.object({
  user_id: z.string().min(1, { message: 'user_id is required' }),
  category_id: z.number({
    invalid_type_error: 'invalid category ID',
    required_error: 'category required',
  }),
  start_date: z.string().min(1, { message: 'start date is required' }),
  end_date: z.string().min(1, { message: 'end date is required' }),
  amount_limit: z
    .number({
      invalid_type_error: 'amount must be a number',
    })
    .min(1, { message: 'Amount must be greater than 0' }),
});

export const createBudgetsSchema = budgetsSchema;
export const editBudgetsSchema = budgetsSchema.partial().extend({
  id: z.number({
    required_error: 'id is required',
    invalid_type_error: 'id must be a number',
  }),
});

export type CreateBudgetsSchemaType = z.infer<typeof createBudgetsSchema>;
export type EditBudgetsSchemaType = z.infer<typeof editBudgetsSchema>;
