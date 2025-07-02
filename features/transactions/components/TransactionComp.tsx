'use client';

import Link from 'next/link';
import { useGetTransactions } from '../hooks/useGetTransactions';
import CardHistory from './CardHistory';
import CreateTransaction from './CreateTransaction';

const TransactionComp = () => {
  const { data: transactions } = useGetTransactions();
  if (!transactions) return null;

  return (
    <div className="px-5 md:px-14 flex flex-col gap-5 mt-10">
      <CreateTransaction />
      <div className="flex justify-between items-center w-full">
        <p className="text-[18px] font-semibold">Transaction History</p>
        <Link href={'/transaction/history'} className="text-foreground/50">
          See all
        </Link>
      </div>
      {/* History Card */}
      <CardHistory transactions={transactions} />
    </div>
  );
};

export default TransactionComp;
