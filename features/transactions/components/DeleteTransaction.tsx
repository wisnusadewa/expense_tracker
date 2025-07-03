import DialogDeleteOrLogout from '@/components/dialog/DialogDeleteOrLogout';
import { toast } from 'sonner';
import useDeleteTransactions from '../hooks/useDeleteTransactions';

interface DeleteTransactionParams {
  idRemove: number;
  openDelete: boolean;
  setOpenDelete: (ctx: boolean) => void;
}

const DeleteTransaction = ({ idRemove, openDelete, setOpenDelete }: DeleteTransactionParams) => {
  const deleteTransaction = useDeleteTransactions();

  const handleDeleteTransaction = () => {
    // console.log('id remove?', idRemove);
    deleteTransaction.mutateAsync(idRemove);
    setOpenDelete(false);
    toast.success('transaction deleted!');
  };

  return (
    <div>
      <DialogDeleteOrLogout
        textButton="yes"
        titleTriger="Delete"
        titleHeader="delete transaction"
        textDialogDescription="apakah benar ingin melakukan delete?"
        isDelete
        handleDelete={handleDeleteTransaction}
        setOpenDialog={setOpenDelete}
        openDialog={openDelete}
      />
    </div>
  );
};

export default DeleteTransaction;
