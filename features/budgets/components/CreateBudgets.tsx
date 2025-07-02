import { useState } from 'react';
import BudgetsForm from './BudgetsForm';

const CreateBudgets = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <BudgetsForm type="create" openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default CreateBudgets;
