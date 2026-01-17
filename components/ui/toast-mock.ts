// Simple mock implementation for toast in design mode
type ToastProps = {
  title?: string;
  description?: string;
};

export const useToast = () => {
  const toast = (props: ToastProps) => {
    console.log(`TOAST: ${props.title || ''} - ${props.description || ''}`);
    // Show alert for visual feedback in design mode
    if (typeof window !== 'undefined') {
      alert(`${props.title ? props.title + '\n' : ''}${props.description || ''}`);
    }
  };

  return toast;
};

export default useToast; 