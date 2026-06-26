import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50 animate-pulse">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 h-5 w-64 mb-4">
          <Skeleton className="h-4 w-12" />
          <span className="text-neutral-300">/</span>
          <Skeleton className="h-4 w-16" />
          <span className="text-neutral-300">/</span>
          <Skeleton className="h-4 w-24" />
        </div>

        <Card className="mt-4 overflow-hidden py-0 gap-0">
          <div className="grid md:grid-cols-2">
            <div className="bg-neutral-50 flex items-center justify-center p-8 min-h-72 border-b md:border-b-0 md:border-r border-neutral-100">
              <Skeleton className="h-56 w-56 rounded-md" />
            </div>

            <CardContent className="p-7 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              <Skeleton className="h-8 w-3/4" />

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <div className="flex items-baseline gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Skeleton className="h-9 w-28 rounded-lg" />
                <Skeleton className="h-9 flex-1 rounded-lg" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-12 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-1 border-b border-neutral-50"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
              <div className="mt-5 flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-lg" />
                <Skeleton className="h-3 w-48" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {[1, 2].map((i) => (
                <Card key={i} className="shadow-none bg-neutral-50 gap-2">
                  <CardContent className="p-3.5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-7 h-7 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-3 w-4/5 ml-9 mb-1" />
                    <Skeleton className="h-3 w-20 ml-9" />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
