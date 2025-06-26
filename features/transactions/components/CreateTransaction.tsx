'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import TransactionForm from './TransactionForm';

const CreateTransaction = () => {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div>
      <TransactionForm
        setOpenDialog={setOpenCreate}
        openDialog={openCreate}
        type="create"
        textButton="submit"
        titleTriger="Add Transaction"
        titleHeader="Add Form"
        titleTrigerClassName="text-foreground"
        iconButton={<CirclePlus size={20} />}
        dialogTriggerClassName="px-0 py-1.5 w-full bg-transparent flex items-center rounded-none md:text-[14px] text-[12px] font-medium cursor-pointer gap-2"
      />
    </div>
  );
};

export default CreateTransaction;
