import TransactionForm from './TransactionForm';

interface EditTransactionParams {
  idEdit: string;
  openEdit: boolean;
  setOpenEdit: (ctx: boolean) => void;
  transactionData: Transaction;
}

const EditTransaction = ({ idEdit, openEdit, setOpenEdit, transactionData }: EditTransactionParams) => {
  return (
    <div>
      <TransactionForm
        transactionData={transactionData}
        idEdit={idEdit}
        setOpenDialog={setOpenEdit}
        openDialog={openEdit}
        type="update"
        textButton="submit"
        titleTriger="Edit"
        titleHeader="Edit Transaction"
        titleTrigerClassName="text-foreground"
      />
    </div>
  );
};

export default EditTransaction;
