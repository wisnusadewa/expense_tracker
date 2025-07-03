'use client';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import React from 'react';

interface DrawerCompParams {
  icon: React.ReactNode;
  DrawerTitleText?: string;
  DrawerDescriptionText?: string;
  children?: React.ReactNode;
  drawerTriggerText?: string;
  drawerTriggerClassName?: string;
  openDrawer: boolean;
  setOpenDrawer: (ctx: boolean) => void;
}

const DrawerComp = ({ icon, DrawerTitleText, DrawerDescriptionText, children, drawerTriggerText, openDrawer, drawerTriggerClassName, setOpenDrawer }: DrawerCompParams) => {
  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>
        <div className={drawerTriggerClassName}>
          {icon}
          <span>{drawerTriggerText}</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{DrawerTitleText}</DrawerTitle>
          <DrawerDescription>{DrawerDescriptionText}</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
