'use client';

import FormField from '@/components/formField/FormField';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/AuthContext';
import { createCategoriesSchema, CreateCategoriesSchemaType, editCategoriesSchema } from '@/validator/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateCategories } from '../hooks/useCreateCategories';
import { useEditCategories } from '../hooks/useEditCategories';

interface CreateOrEditCategoriesParams {
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
  categoriesData?: Category;
}

const CreateOrEditCategories = ({
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
  categoriesData,
}: CreateOrEditCategoriesParams) => {
  const createCategory = useCreateCategories();
  const editCategory = useEditCategories();

  const user = useUser();
  if (!user) return null;
  // console.log('user?', user);

  const form = useForm<CreateCategoriesSchemaType>({
    resolver: zodResolver(createCategoriesSchema),
    defaultValues: {
      name: categoriesData?.name,
      type: categoriesData?.type,
      user_id: user?.id ?? '',
    },
  });

  const onSubmit = async (data: CreateCategoriesSchemaType) => {
    if (type === 'create') {
      // const finalData = {
      //   name: data.name,
      //   type: data.type,
      //   user_id: user.id,
      // };
      const parse = createCategoriesSchema.parse(data);
      createCategory.mutateAsync(parse);
      form.reset();
      setOpenDialog(false);
      toast.success('category ditambahkan!');
    } else if (type === 'update') {
      const finalData = {
        ...data,
        id: idEdit,
      };

      const parse = editCategoriesSchema.parse(finalData);
      // console.log('isi parse?', parse);
      editCategory.mutateAsync(parse);
      setOpenDialog(false);
      toast.success('edit category berhasil!');
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <FormField control={form.control} name="name" placeholder="ex: makan, gaji, dll" label="Category name" />
                <FormField control={form.control} type="select" name="type" placeholder="ex: expense or income" label="Category Type" optionsRole={typeSelect} />
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? <Loader /> : <>{textButton}</>}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateOrEditCategories;
