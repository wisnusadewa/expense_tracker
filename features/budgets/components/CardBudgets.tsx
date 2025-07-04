import ArcProgressComp from '@/components/arcProgress/ArcProgressComp';
import FormatRupiah from '@/components/formatRupiah/FormatRupiah';
import { Badge } from '@/components/ui/badge';

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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {budgetTransactionByType.map((e, idx) => {
        return (
          <div key={idx} className="bg-foreground/15 border border-muted-foreground trapezoid backdrop-blur-lg flex flex-col h-96 w-80 justify-center items-center gap-2 mx-auto">
            <ArcProgressComp percentage={e.percentage} />
            <div className="flex flex-col w-full px-7 justify-start gap-2 text-white ">
              <div className="w-full flex justify-center font-semibold text-[20px] capitalize mb-5">
                <p className="w-fit px-2 rounded-sm">{e.budgets_category_id_fkey?.name}</p>
              </div>
              <div className="flex justify-between">
                <p>Amount Used</p>
                <span className="font-semibold">{FormatRupiah(Number(e.usedAmount))}</span>
              </div>
              <div className="flex justify-between">
                <p>Amount Limit</p>
                <span className="font-semibold">{FormatRupiah(e.amount_limit)}</span>
              </div>
              <div className="flex justify-between">
                <p>Remaining</p>
                <span className="font-semibold">{FormatRupiah(Number(e.remaining))}</span>
              </div>
              <div className="flex w-full justify-between">
                <Badge>{e.start_date}</Badge>
                <Badge>{e.end_date}</Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardBudgets;
