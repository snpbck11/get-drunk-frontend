import { Skeleton } from "@/shared/ui";

export function OrganizationCardSkeleton() {
  return (
    <div className="h-92 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-2/4 mb-3" />
        <Skeleton className="h-4 w-1/4 mb-4" />
      </div>
    </div>
  );
}
