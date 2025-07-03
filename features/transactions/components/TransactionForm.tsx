'use client';

import { FormDatePicker } from '@/components/formDatePicker/FormDatePicker';
import FormField from '@/components/formField/FormField';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/AuthContext';
import { useGetBudgets } from '@/features/budgets/hooks/useGetBudgets';
import { useGetCategories } from '@/features/categories/hooks/useGetCategories';
import { CreateTransactionFormType, editTransactionSchema, transactionSchema } from '@/validator/transaction';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import helperTransactions from '../helper/helperTransactions';
import { useCreateTransactions } from '../hooks/useCreateTransactions';
import { useEditTransactions } from '../hooks/useEditTransactions';

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
  transactionData?: Transaction;
}

const TransactionForm = ({
  textButton,
  titleTriger,
  titleTrigerClassName,
  titleHeader,
  textDialogDescription,
  classNameButton,
  iconButton,
  dialogTriggerClassName,
  type,
  openDialog,
  setOpenDialog,
  idEdit,
  transactionData,
}: TransactionFormParams) => {
  const { data: categories } = useGetCategories();
  const createTransactions = useCreateTransactions();
  const editTransacitons = useEditTransactions();
  const { data: budgets } = useGetBudgets();
  const user = useUser();

  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      user_id: user?.id ?? '',
      category_id: transactionData?.category_id ?? undefined,
      amount: transactionData?.amount ?? 0,
      type: transactionData?.type ?? 'expense',
      description: transactionData?.description ?? '',
      date: transactionData?.date ?? new Date().toISOString().split('T')[0],
    },
  });

  const { setValue } = form;

  if (!categories || !user) return null;

  const onSubmit: SubmitHandler<CreateTransactionFormType> = async (data) => {
    if (type === 'create') {
      const parse = transactionSchema.parse(data);
      const relatedBudgets = budgets?.filter((budget) => helperTransactions(parse, budget));

      if (!relatedBudgets) {
        return toast.error('transaksi diluar periode budget yang ditentukan atau tidak memiliki budgets!');
      }
      createTransactions.mutateAsync(parse);
      setOpenDialog(false);
      form.reset();
      // console.log('data create?', data);
      toast.success('transactions success created!');
    } else if (type === 'update') {
      const finalData = {
        ...data,
        id: Number(idEdit),
      };

      const parse = editTransactionSchema.parse(finalData);

      if (!parse.category_id || !parse.date || !parse.type || !parse.amount || !parse.user_id) {
        return toast.error('Data tidak lengkap untuk validasi budget');
      }

      const relatedBudgets = budgets?.filter((budget) => helperTransactions(parse, budget));

      console.log('relatedBudgets', relatedBudgets);

      if (!relatedBudgets || relatedBudgets.length === 0) {
        console.log('Budget check failed, canceling update');
        return toast.error('transaksi diluar periode budget yang ditentukan atau tidak memiliki budgets!');
      }

      editTransacitons.mutateAsync(parse);
      // console.log('parse edit?', parse);
      setOpenDialog(false);
      form.reset();
      toast.success('transactions edited!');
      console.log('error form:', form.formState.errors);
    }
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
              <FormField
                control={form.control}
                name="category_id"
                label="Category"
                type="select"
                optionsRole={CategoryIdOption}
                onChangeCustom={(val) => {
                  const selectedCategory = categories.find((e) => Number(e.id) === Number(val));
                  if (selectedCategory) setValue('type', selectedCategory.type);
                }}
              />
              <FormField control={form.control} name="type" label="Type" type="select" optionsRole={typeSelect} disabled />
              <FormField control={form.control} name="amount" label="Amount" type="number" />
              <FormDatePicker control={form.control} name="date" label="Date" />
              <FormField control={form.control} name="description" label="Description" type="textarea" />
              <Button type="submit">Save Transaction</Button>
            </form>
            <DevTool control={form.control} />
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
