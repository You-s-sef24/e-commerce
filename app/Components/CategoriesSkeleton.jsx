import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 py-4 w-max">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="shrink-0 w-32 h-28 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}