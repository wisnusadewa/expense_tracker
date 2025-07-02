import { NormalizeDate } from '@/components/normalizeDate/NormalizeDate';

const helperTransactions = (transactions: Partial<Transaction>, budgets: Budgets): boolean => {
  if (!transactions || !budgets) return false;
  if (!transactions.date || !transactions.category_id) return false;

  const sameCategory = transactions.category_id == budgets.category_id;
  const transactionsDate = NormalizeDate(transactions.date);
  const budgetStartDate = NormalizeDate(budgets.start_date);
  const budgetEndDate = NormalizeDate(budgets.end_date);

  return sameCategory && transactionsDate >= budgetStartDate && transactionsDate <= budgetEndDate;
};

export default helperTransactions;
