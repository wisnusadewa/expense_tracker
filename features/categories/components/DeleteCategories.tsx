import DialogDeleteOrLogout from '@/components/dialog/DialogDeleteOrLogout';
import { toast } from 'sonner';
import { useDeleteCategories } from '../hooks/useDeleteCategories';

interface DeleteCategories {
  idRemove: string;
  openDelete: boolean;
  setOpenDelete: (ctx: boolean) => void;
  triggerText?: boolean;
}

const DeleteCategories = ({ idRemove, openDelete, setOpenDelete, triggerText }: DeleteCategories) => {
  const deleteCategory = useDeleteCategories();

  const handleDeleteCategory = () => {
    // console.log('delete nih', idRemove);
    deleteCategory.mutateAsync(idRemove);
    setOpenDelete(false);
    toast.success('delete category berhasil!');
  };

  return (
    <div>
      <DialogDeleteOrLogout
        textButton="yes"
        titleTriger="Delete"
        titleHeader="delete category"
        textDialogDescription="apakah benar ingin melakukan delete"
        isDelete
        handleDelete={handleDeleteCategory}
        setOpenDialog={setOpenDelete}
        openDialog={openDelete}
      />
    </div>
  );
};

export default DeleteCategories;
