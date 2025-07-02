'use client';

import FormatRupiah from '@/components/formatRupiah/FormatRupiah';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import EditTransaction from '../../EditTransaction';

export const Columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'transactions_category_id_fkey.name',
    header: 'Name',
  },

  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: 'Amout',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return <div>{FormatRupiah(amount)}</div>;
    },
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
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original;
      const [openDelete, setOpenDelete] = useState(false);
      const [openEdit, setOpenEdit] = useState(false);

      // console.log('transaction di colums?', transaction);
      // console.log('openEdit di colums?', openEdit);

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
          {/* {openDelete && <DeleteCategories idRemove={categories.id} openDelete={openDelete} setOpenDelete={setOpenDelete} />} */}

          {/* Edit */}
          {openEdit && <EditTransaction transactionData={transaction} idEdit={String(transaction.id)} openEdit={openEdit} setOpenEdit={setOpenEdit} />}
        </>
      );
    },
  },
];
