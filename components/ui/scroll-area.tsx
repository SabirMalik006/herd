"use client"

import * as React from "react"
import { cn } from "@/shared/lib/utils"

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(({ className, children, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto",
      orientation === "vertical" ? "max-h-[400px]" : "",
      orientation === "horizontal" ? "max-w-full" : "",
      className
    )}
    {...props}
  >
    <div className="h-full w-full rounded-[inherit]">
      {children}
    </div>
  </div>
))
ScrollArea.displayName = "ScrollArea"

// Simple ScrollBar component as a placeholder - doesn't have the thumb functionality
const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "hidden", // Hide this component since we're using native scrollbars
      className
    )}
    {...props}
  >
    <div className="relative flex-1 rounded-full bg-border" />
  </div>
))
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar } 