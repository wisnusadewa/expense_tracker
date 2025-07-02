'use client';

import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import TableComp from './table/TableComp';

const TransactionHistoryComp = () => {
  const { data: transaction, isLoading } = useGetTransactions();
  if (!transaction) return null;

  if (isLoading) return <p>loading boss...</p>;

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <TableComp transaction={transaction} />
      </Suspense>
    </div>
  );
};

export default TransactionHistoryComp;
