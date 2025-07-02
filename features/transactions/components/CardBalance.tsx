import FormatRupiah from '@/components/formatRupiah/FormatRupiah';
import { ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { useGetTransactions } from '../hooks/useGetTransactions';
import DrawerComp from './DrawerComp';

const CardBalance = () => {
  const { data: transaction } = useGetTransactions();
  // console.log('transaction di cardBalance', transaction);

  const total = transaction?.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + tx.amount;
    return acc;
  }, {} as Record<CategoriesType, number>);
  // console.log('total', total);

  if (!total?.expense || !total?.income) return null;

  const totalBalance = total?.income - total?.expense;

  return (
    <div className="flex flex-col justify-between p-5 h-[210px] w-[380px] rounded-xl">
      <div className="flex">
        <div className="flex flex-col w-full h-full justify-center ">
          <p>Total Balance</p>
          <p className="text-[22px] font-semibold">{FormatRupiah(totalBalance)}</p>
        </div>

        {/* Drawer */}
        <div>
          <DrawerComp icon={<Plus className="border" />} />
        </div>
      </div>

      <div className="flex justify-between items-center w-full h-full ">
        <div>
          <div className="flex justify-start items-center gap-1">
            <ArrowDown size={16} className="rounded-full bg-background/20" />
            <p>income</p>
          </div>
          <p>{FormatRupiah(total.income)}</p>
        </div>

        <div>
          <div className="flex justify-end items-center gap-1">
            <ArrowUp size={16} className="rounded-full bg-background/20" />
            <p>Expense</p>
          </div>
          <p>{FormatRupiah(total.expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default CardBalance;
