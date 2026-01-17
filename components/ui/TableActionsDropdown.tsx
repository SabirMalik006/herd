import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, DollarSign, MoreVertical, Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableActionsDropdownProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onFinance?: () => void;
  isDeleteLoading?: boolean;
  isFinanceDisabled?: boolean;
  disableView?: boolean;
  disableDelete?: boolean;
  deleteTooltip?: string;
}

export function TableActionsDropdown({
  onView,
  onEdit,
  onDelete,
  onFinance,
  isDeleteLoading,
  isFinanceDisabled = false,
  disableView = false,
  disableDelete = false,
  deleteTooltip,
}: TableActionsDropdownProps) {
  
  const handleAction = (action: () => void) => {
    // Ensure pointer events are reset before executing the action
    document.body.style.pointerEvents = "auto";
    action();
  };

  const DeleteMenuItem = () => {
    const deleteItem = (
      <DropdownMenuItem
        onClick={disableDelete ? undefined : () => handleAction(onDelete!)}
        className={cn(
          "cursor-pointer text-sm text-destructive focus:text-destructive",
          (isDeleteLoading || disableDelete) && "cursor-not-allowed opacity-50"
        )}
        disabled={isDeleteLoading || disableDelete}
        onSelect={disableDelete ? (e) => e.preventDefault() : undefined}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isDeleteLoading ? "Deleting..." : "Delete"}
        {disableDelete && deleteTooltip && (
          <span className="ml-auto text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
          </span>
        )}
      </DropdownMenuItem>
    );

    if (disableDelete && deleteTooltip) {
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                {deleteItem}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-sm">{deleteTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return deleteItem;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[160px] z-50"
        onCloseAutoFocus={() => {
          // Reset pointer events when dropdown closes
          document.body.style.pointerEvents = "auto";
        }}
      >
        {!disableView && onView && (
          <DropdownMenuItem
            onClick={() => handleAction(onView)}
            className="cursor-pointer text-sm"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem
            onClick={() => handleAction(onEdit)}
            className="cursor-pointer text-sm"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onFinance && (
          <DropdownMenuItem
            onClick={isFinanceDisabled ? undefined : () => handleAction(onFinance)}
            className={cn(
              "cursor-pointer text-sm",
              isFinanceDisabled && "cursor-not-allowed opacity-50"
            )}
            disabled={isFinanceDisabled}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Finance
          </DropdownMenuItem>
        )}
        {onDelete && <DeleteMenuItem />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
