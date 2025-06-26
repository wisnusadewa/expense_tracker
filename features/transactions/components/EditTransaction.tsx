'use client';

import { TransactionFormValues } from '@/validator/transaction';
import { AddTransaction } from './CreateTransaction';
import { useTransactionForm } from './TransactionForm';

type Props = {
  transaction: TransactionFormValues;
  categories: { id: number; name: string; type: 'income' | 'expense' }[];
  onSubmit: (data: TransactionFormValues) => void;
};

export function EditTransactionForm({ transaction, categories, onSubmit }: Props) {
  const form = useTransactionForm(transaction); // panggil?

  return <AddTransaction onSubmit={onSubmit} categories={categories} />;
}
