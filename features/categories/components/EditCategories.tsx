import CreateOrEditCategories from './CreateOrEditCategories';

interface EditCategoriesParams {
  idEdit: string;
  openEdit: boolean;
  setOpenEdit: (ctx: boolean) => void;
  categoriesData: Category;
}
const EditCategories = ({ idEdit, openEdit, setOpenEdit, categoriesData }: EditCategoriesParams) => {
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
        titleHeader="Edit Categories"
        titleTrigerClassName="text-foreground"
      />
    </div>
  );
};

export default EditCategories;
