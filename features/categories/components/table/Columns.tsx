'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import DeleteCategories from '../DeleteCategories';
import EditCategories from '../EditCategories';

export const Columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created_at',
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as string | number | Date;
      const formattedDate = dayjs(createdAt).format('MMM D, YYYY, HH:mm');
      return <div>{formattedDate}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const categories = row.original;
      const [openDelete, setOpenDelete] = useState(false);
      const [openEdit, setOpenEdit] = useState(false);

      // console.log('categories?', categories);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete */}
          {openDelete && <DeleteCategories idRemove={categories.id} openDelete={openDelete} setOpenDelete={setOpenDelete} />}

          {/* Edit */}
          {openEdit && <EditCategories categoriesData={categories} idEdit={categories.id} openEdit={openEdit} setOpenEdit={setOpenEdit} />}
        </>
      );
    },
  },
];
