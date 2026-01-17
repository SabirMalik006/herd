import { cn } from "@/shared/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  )
}

export function PlanCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-full mb-6" />
        
        {/* Price */}
        <div className="mb-6">
          <Skeleton className="h-12 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-12 w-full" />
      </div>
      
      {/* Features */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  )
}

export function FAQSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
} 