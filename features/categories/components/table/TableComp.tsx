'use client';

import { SkeletonTable } from '@/components/skeletonTable/SkeletonTable';
import { Suspense } from 'react';
import { Columns } from './Columns';
import { DataTable } from './DataTable';

interface TableCompParams {
  categories: Category[];
}

export default function TableComp({ categories }: TableCompParams) {
  return (
    <Suspense fallback={<SkeletonTable />}>
      <div className="container mx-auto py-10">
        <DataTable columns={Columns} data={categories} />
      </div>
    </Suspense>
  );
}
