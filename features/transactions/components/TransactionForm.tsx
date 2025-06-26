'use client';

import FormField from '@/components/formField/FormField';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/AuthContext';
import { useGetCategories } from '@/features/categories/hooks/useGetCategories';
import { CreateTransactionFormType, transactionSchema } from '@/validator/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TransactionFormParams {
  titleTriger: string;
  titleTrigerClassName?: string;
  dialogTriggerClassName?: string;
  titleHeader: string;
  textButton: string;
  textDialogDescription?: string;
  classNameButton?: string;
  iconButton?: React.ReactNode;
  type: FormTypeMethod;
  setOpenDialog: (ctx: boolean) => void;
  openDialog: boolean;
  idEdit?: string;
}

const TransactionForm = ({ textButton, titleTriger, titleTrigerClassName, titleHeader, textDialogDescription, classNameButton, iconButton, dialogTriggerClassName, type, openDialog, setOpenDialog, idEdit }: TransactionFormParams) => {
  const { data: categories } = useGetCategories();
  const user = useUser();

  console.log('categories di transaction', categories);

  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      // category_id: defaultValues?.category_id ?? undefined,
      // amount: defaultValues?.amount ?? 0,
      // type: defaultValues?.type ?? 'expense',
      // description: defaultValues?.description ?? '',
      // date: defaultValues?.date ?? new Date().toISOString().split('T')[0],

      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      user_id: user?.id ?? '',
      description: '',
      category_id: 0,
      amount: 0,
    },
  });

  if (!categories || !user) return null;

  const onSubmit: SubmitHandler<CreateTransactionFormType> = (data) => {
    // const finalData = {
    //   user_id: user.id,
    //   type: data.type,
    //   date: data.date,
    //   category_id: Number(data.category_id),
    //   amount: Number(data.amount),
    //   description: data.description,
    // };

    setOpenDialog(false);
    form.reset();
    console.log('data create?', data);
  };

  const typeSelect = [
    {
      label: 'income',
      value: 'income',
    },
    {
      label: 'expense',
      value: 'expense',
    },
  ];

  const CategoryIdOption = categories.map((e) => ({
    value: e.id,
    label: `${e.name} (${e.type})`,
  }));

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className={dialogTriggerClassName}>
          {iconButton}
          <span className={titleTrigerClassName}>{titleTriger}</span>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader className="space-y-6">
            <DialogTitle>{titleHeader}</DialogTitle>
            <DialogDescription>{textDialogDescription}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="category_id" label="Category" type="select" optionsRole={CategoryIdOption} />
              <FormField control={form.control} name="type" label="Type" type="select" optionsRole={typeSelect} />
              <FormField control={form.control} name="amount" label="Amount" type="number" />
              <FormField control={form.control} name="date" label="Date" type="date" />
              <FormField control={form.control} name="description" label="Description" type="textarea" />

              {/* 
                
                <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ''} />
                */}

              <Button type="submit">Save Transaction</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
};

export default TransactionForm;
