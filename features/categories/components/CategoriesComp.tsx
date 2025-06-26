'use client';

import { useGetCategories } from '../hooks/useGetCategories';
import CreateCategories from './CreateCategories';
import TableComp from './table/TableComp';

const CategoriesComp = () => {
  const { data: categories } = useGetCategories();
  if (!categories) return null;

  return (
    <div className="px-6 py-6">
      <CreateCategories />

      {/* Table Data category */}
      <TableComp categories={categories} />
    </div>
  );
};

export default CategoriesComp;
