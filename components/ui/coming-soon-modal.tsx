import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Wrench } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  features?: string[];
  onClose?: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  title,
  description,
  features = [],
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && onClose) onClose(); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          style={{ zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Wrench className="h-8 w-8 text-orange-600" />
          </div>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 px-4 py-2">
              <Code className="mr-2 h-4 w-4" />
              In Development
            </Badge>
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-600">Planned Features:</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="font-medium">Expected Release:</span>
              <span className="ml-2">Coming Soon</span>
            </div>
          </div>

          {/* Note */}
          <div className="text-center text-sm text-gray-500">
            We're working hard to bring you this feature with real-time data integration.
            Thank you for your patience!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};