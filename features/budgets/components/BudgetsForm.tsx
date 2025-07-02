'use client';

import FormField from '@/components/formField/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/AuthContext';
import { useGetCategories } from '@/features/categories/hooks/useGetCategories';
import DrawerComp from '@/features/transactions/components/DrawerComp';
import { createBudgetsSchema, CreateBudgetsSchemaType } from '@/validator/budgets';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateBudgets } from '../hooks/useCreateBudgets';

interface BudgetsFormParams {
  budgets?: Budgets;
  type: FormTypeMethod;
  openDrawer: boolean;
  setOpenDrawer: (ctx: boolean) => void;
}

const BudgetsForm = ({ budgets, type, openDrawer, setOpenDrawer }: BudgetsFormParams) => {
  const user = useUser();
  // console.log('user budgetForm :', user);
  const { data: categories } = useGetCategories();
  // console.log('categories in budgetsForm :', categories);

  const createBudgets = useCreateBudgets();

  const form = useForm<CreateBudgetsSchemaType>({
    resolver: zodResolver(createBudgetsSchema),
    defaultValues: {
      user_id: user?.id ?? '',
      amount_limit: 0,
      category_id: undefined,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<CreateBudgetsSchemaType> = async (data) => {
    if (type === 'create') {
      const parse = createBudgetsSchema.parse(data);
      console.log('data budgets?', parse);
      createBudgets.mutateAsync(parse);
      form.reset();
      toast.success('budgets success created!');
      console.log('error form:', form.formState.errors);
      setOpenDrawer(false);
    }
  };

  const selectOptions = categories?.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  return (
    <div>
      <DrawerComp
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        buttonText="submit"
        buttonTextClose="cancel"
        icon={<Plus size={18} className="border" />}
        DrawerDescriptionText="silahkan tambahkan budget untuk setiap category"
        DrawerTitleText="Add Budgets"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-10 border">
            <FormField control={form.control} name="amount_limit" label="Amount" type="number" />
            <FormField control={form.control} name="category_id" label="Category" type="select" optionsRole={selectOptions} />

            <FormField control={form.control} name="start_date" label="Start Date" type="date" />
            <FormField control={form.control} name="end_date" label="End Date" type="date" />
            <div className="w-full flex justify-between items-center gap-2">
              <Button variant={'destructive'} className="w-full" onClick={() => setOpenDrawer(false)} type="button">
                cancel
              </Button>
              <Button className="w-full" type="submit">
                submit
              </Button>
            </div>
          </form>
          <DevTool control={form.control} />
        </Form>
      </DrawerComp>
    </div>
  );
};

export default BudgetsForm;
