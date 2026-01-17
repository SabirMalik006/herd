"use client";

import React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export type AnimalGroup = "Cow" | "Heifer" | "Bull" | "Weaner" | "Calf";

interface AnimalGroupMultiSelectProps {
  value?: AnimalGroup[];
  onChange: (value: AnimalGroup[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const animalGroups: { value: AnimalGroup; label: string; description: string }[] = [
  { value: "Cow", label: "Cow", description: "Adult female cattle" },
  { value: "Heifer", label: "Heifer", description: "Young female cattle" },
  { value: "Bull", label: "Bull", description: "Adult male cattle" },
  { value: "Weaner", label: "Weaner", description: "Recently weaned cattle" },
  { value: "Calf", label: "Calf", description: "Young cattle (0-12 months)" },
];

export function AnimalGroupMultiSelect({
  value = [],
  onChange,
  placeholder = "Select animal groups...",
  disabled = false,
  className,
}: AnimalGroupMultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: AnimalGroup) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((item) => item !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const handleRemove = (removedValue: AnimalGroup) => {
    onChange(value.filter((item) => item !== removedValue));
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {value.slice(0, 2).map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item);
                      }}
                    >
                      {item}
                      <X className="ml-1 h-3 w-3 cursor-pointer" />
                    </Badge>
                  ))}
                  {value.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{value.length - 2} more
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {value.length > 0 && (
                <X
                  className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="p-2">
            <Input 
              placeholder="Search animal groups..." 
              className="mb-2"
              value=""
              onChange={() => {}}
            />
            <div className="max-h-48 overflow-auto">
              {animalGroups.length === 0 ? (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  No animal group found.
                </div>
              ) : (
                animalGroups.map((animalGroup) => (
                  <div
                    key={animalGroup.value}
                    className="flex items-center p-2 cursor-pointer hover:bg-accent rounded-md"
                    onClick={() => handleSelect(animalGroup.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(animalGroup.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{animalGroup.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {animalGroup.description}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Selected items display */}
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {value.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="text-xs"
            >
              {item}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleRemove(item)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
} 