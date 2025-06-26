'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface DialogDeleteOrLogoutProps {
  handleLogout?: () => void;
  handleDelete?: () => void;
  setOpenDialog: (ctx: boolean) => void;
  openDialog: boolean;
  titleTriger: string;
  titleTrigerClassName?: string;
  dialogTriggerClassName?: string;
  titleHeader: string;
  textButton: string;
  textDialogDescription?: string;
  classNameButton?: string;
  isLogout?: boolean;
  isDelete?: boolean;
  iconButton?: React.ReactNode;
  triggerText?: boolean;
}

const DialogDeleteOrLogout = ({
  handleLogout,
  handleDelete,
  setOpenDialog,
  openDialog,
  textButton,
  titleTriger,
  titleTrigerClassName,
  titleHeader,
  textDialogDescription,
  classNameButton,
  isLogout,
  isDelete,
  iconButton,
  dialogTriggerClassName,
  triggerText,
}: DialogDeleteOrLogoutProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (isLogout) {
      handleLogout?.();
    } else if (isDelete) {
      setIsLoading(true);
      handleDelete?.();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {triggerText && (
          <DialogTrigger className={dialogTriggerClassName}>
            {iconButton}
            <span className={titleTrigerClassName}>{titleTriger}</span>
          </DialogTrigger>
        )}
        <DialogContent className="w-[400px]">
          <DialogHeader className="space-y-6">
            <DialogTitle>{titleHeader}</DialogTitle>
            <DialogDescription>{textDialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-white text-black border hover:bg-gray-100/80" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button disabled={isLoading} className={classNameButton} onClick={handleConfirm}>
              {textButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogDeleteOrLogout;
