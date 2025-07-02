import FormatRupiah from '@/components/formatRupiah/FormatRupiah';
import { useMemo } from 'react';

interface CardHistoryParams {
  transactions: Transaction[];
}

const CardHistory = ({ transactions }: CardHistoryParams) => {
  const sortedTransactions = useMemo(() => {
    return transactions
      .slice() // prevent mutating original
      .sort((a, b) => new Date(b.created_at ?? '1970-01-01T00:00:00Z').getTime() - new Date(a.created_at ?? '1970-01-01T00:00:00Z').getTime())
      .slice(0, 4);
  }, [transactions]);

  // useEffect(() => {
  //   console.log(
  //     'sortedTransactions:',
  //     sortedTransactions.map((t) => {
  //       const parsed = new Date(t.created_at ?? '');
  //       return {
  //         id: t.id,
  //         created_at: t.created_at,
  //         isValid: !isNaN(parsed.getTime()), // validasi dulu
  //         parsed: !isNaN(parsed.getTime()) ? parsed.toISOString() : 'Invalid Date',
  //       };
  //     })
  //   );
  // }, [sortedTransactions]);

  return (
    <div className="flex flex-col gap-5">
      {sortedTransactions.map((trx, idx) => {
        return (
          <div key={idx} className="flex justify-between">
            <div className="flex flex-col justify-center ">
              <p className="capitalize text-[16px] font-semibold">{trx.description}</p>
              <p className="text-foreground/50 text-[14px]">{trx.date}</p>
              <p className="text-foreground/50 text-[14px]"> {new Date(trx.created_at ?? '').toLocaleString()}</p>
            </div>
            <p className={`${trx.type === 'income' ? 'text-green-700' : 'text-red-500'} flex items-center justify-center font-semibold text-[18px]`}>
              {trx.type === 'income' ? `+ ${FormatRupiah(trx.amount)}` : `- ${FormatRupiah(trx.amount)}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CardHistory;
