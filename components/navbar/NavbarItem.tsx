'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ItemsABAC = {
  title: string;
  url?: string;
};

// Menu items.
const items: ItemsABAC[] = [
  {
    title: 'Profile',
    url: '/profile',
  },
  {
    title: 'Transaction',
    url: '/transaction',
  },
  {
    title: 'Categories',
    url: '/categories',
  },
  {
    title: 'Budgets',
    url: '/budgets',
  },
];

const NavbarItems = () => {
  const pathname = usePathname();

  return (
    <div>
      {items.map((item) => (
        <Link key={item.url} href={item.url!} className={clsx('text-sm px-2 py-1 transition-colors', pathname === item.url ? 'text-foreground underline underline-offset-4 decoration-1' : 'text-muted-foreground hover:text-foreground')}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavbarItems;
