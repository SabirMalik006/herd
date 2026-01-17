// Adapted from https://ui.shadcn.com/docs/components/toast
// Mock implementation of useToast
export const useToast = () => {
  // Simple mock implementation
  return {
    toast: ({ title, description }: { title?: string; description?: string }) => {
      console.log(`Toast: ${title} - ${description}`)
      // In design mode, we just log the toast instead of showing it
      // Would normally integrate with a toast library
      
      // Also show an alert for visual feedback in design mode
      setTimeout(() => {
        alert(`${title}\n${description}`);
      }, 100);
    }
  }
} 