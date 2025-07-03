'use client';

import { Plus } from 'lucide-react';
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
        iconButton={<Plus size={20} className="border border-foreground" />}
        dialogTriggerClassName="w-fit flex items-center text-[18px] font-medium cursor-pointer gap-2"
      />
    </div>
  );
};

export default CreateTransaction;
