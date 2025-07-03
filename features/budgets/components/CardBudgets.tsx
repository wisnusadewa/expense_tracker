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
    const remaining = budget.amount_limit - usedAmount;
    const percentage = budget.amount_limit > 0 ? Math.min((usedAmount / budget.amount_limit) * 100, 100) : 0;

    // console.log('percentage?:', percentage);

    return { ...budget, usedAmount, remaining, percentage };
  });

  console.log('budgetTransactionByType', budgetTransactionByType);

  // percentage

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
      {budgetTransactionByType.map((e, idx) => {
        return (
          <div key={idx} className="bg-foreground/10 shadow-lg flex flex-col h-72 w-72 rounded-lg justify-center items-center gap-2 mx-auto">
            <ArcProgressComp percentage={e.percentage} />
            <div className="flex flex-col items-center gap-2">
              <p>{e.budgets_category_id_fkey?.name}</p>
              <div className="flex flex-col w-full justify-center items-center">
                <p>
                  {FormatRupiah(Number(e.usedAmount))} / {FormatRupiah(e.amount_limit)}
                </p>
                <p>Remaining : {FormatRupiah(Number(e.remaining))}</p>
                <p>Start date : {e.start_date}</p>
                <p>End date : {e.end_date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardBudgets;
