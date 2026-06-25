import { Skeleton } from "@/components/ui/skeleton";

export default function TopRatedSkeleton() {
  return (
    <div className="w-full overflow-x-auto border rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col w-[220px] h-[420px] p-2">
            <Skeleton className="w-full h-[260px] rounded-md" />
            <div className="flex flex-col flex-1 pt-2 gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-24 mt-1" />
              <Skeleton className="h-4 w-20 mt-1" />
              <Skeleton className="h-8 w-full mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
