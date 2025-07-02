'use client';

import { useGetCategories } from '../hooks/useGetCategories';
import TableComp from './table/TableComp';

const CategoriesComp = () => {
  const { data: categories } = useGetCategories();
  if (!categories) return null;

  return (
    <div>
      {/* Table Data category */}
      <TableComp categories={categories} />
    </div>
  );
};

export default CategoriesComp;
