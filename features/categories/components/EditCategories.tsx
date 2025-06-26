import CreateOrEditCategories from './CreateOrEditCategories';

interface EditCategories {
  idEdit: string;
  openEdit: boolean;
  setOpenEdit: (ctx: boolean) => void;
  categoriesData: Category;
}
const EditCategories = ({ idEdit, openEdit, setOpenEdit, categoriesData }: EditCategories) => {
  return (
    <div>
      <CreateOrEditCategories
        categoriesData={categoriesData}
        idEdit={idEdit}
        setOpenDialog={setOpenEdit}
        openDialog={openEdit}
        type="update"
        textButton="submit"
        titleTriger="Edit"
        titleHeader="Edit Form"
        titleTrigerClassName="text-foreground"
      />
    </div>
  );
};

export default EditCategories;
