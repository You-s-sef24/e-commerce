import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="flex gap-3 pb-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="shrink-0 w-32 h-28 rounded-2xl" />
      ))}
    </div>
  );
}