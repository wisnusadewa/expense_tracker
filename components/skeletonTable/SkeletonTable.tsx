import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonTable() {
  return (
    <div className="flex flex-col space-y-1">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-1">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
