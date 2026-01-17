import { AlertTriangle, RefreshCw, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  onRetry,
  showRetry = true,
  className = ""
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
      className="py-20"
    />
  )
}

export function NoPlansState() {
  return (
    <div className="text-center py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Wifi className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Plans Available
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're currently updating our pricing plans. Please check back soon or contact our sales team for custom pricing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
            Contact Sales
          </Button>
          <Button variant="outline">
            Get Notified
          </Button>
        </div>
      </div>
    </div>
  )
} 