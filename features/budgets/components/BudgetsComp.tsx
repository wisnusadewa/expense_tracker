'use client';

import { useGetTransactions } from '@/features/transactions/hooks/useGetTransactions';
import { useGetBudgets } from '../hooks/useGetBudgets';
import CardBudgets from './CardBudgets';
import CreateBudgets from './CreateBudgets';

const BudgetsComp = () => {
  const { data: budgets } = useGetBudgets();
  const { data: transactions } = useGetTransactions();
  if (!budgets || !transactions) return null;
  console.log('categories in budgets :', budgets);

  return (
    <div className="flex flex-col p-6 gap-10">
      {/* create budget */}
      <CreateBudgets />

      {/* card budget */}
      <CardBudgets budgets={budgets} transactions={transactions} />
    </div>
  );
};

export default BudgetsComp;
