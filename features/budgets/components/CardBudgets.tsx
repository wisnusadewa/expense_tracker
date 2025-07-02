import ArcProgressComp from '@/components/arcProgress/ArcProgressComp';
import FormatRupiah from '@/components/formatRupiah/FormatRupiah';

interface CardBudgetsParams {
  budgets: Budgets[];
  transactions: Transaction[];
}

const CardBudgets = ({ budgets, transactions }: CardBudgetsParams) => {
  // console.log('budgets', budgets);
  // console.log('transactions', transactions);

  const budgetTransactionByType = budgets.map((budget) => {
    const relatedTransaction = transactions.filter((trx) => trx.category_id == budget.category_id && trx.date >= budget.start_date && trx.date <= budget.end_date);

    const usedAmount = relatedTransaction.reduce((acc, trx) => acc + trx.amount, 0);

    // console.log('relatedTransaction', relatedTransaction);
    // console.log('usedAmount', usedAmount);
    console.log('budget.start_date:', budget.start_date);
    console.log('budget.end_date:', budget.end_date);

    return { ...budget, usedAmount: FormatRupiah(usedAmount), remaining: FormatRupiah(budget.amount_limit - usedAmount) };
  });

  const test = transactions.filter((trx) => {
    console.log('trx.date:', trx.date);
  });
  console.log('budgetTransactionByType', budgetTransactionByType);

  return (
    <div className="w-full">
      {budgets.map((e, idx) => {
        return (
          <div key={idx} className="bg-foreground/10 shadow-lg flex flex-col h-56 w-72 rounded-lg justify-center items-center gap-5">
            <ArcProgressComp percentage={70} />
            <div className="flex flex-col items-center">
              <p>{e.budgets_category_id_fkey?.name}</p>
              <p>{FormatRupiah(e.amount_limit)}</p>
              <p>{e.start_date}</p>
              <p>{e.end_date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardBudgets;
