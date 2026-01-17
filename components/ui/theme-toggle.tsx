"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 hover:text-white transition-all duration-200 rounded-lg relative group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Change theme
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-white dark:bg-gray-900 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`cursor-pointer flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
            theme === 'light' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'dark:text-gray-300'
          }`}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <div className="ml-auto h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`cursor-pointer flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
            theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'dark:text-gray-300'
          }`}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <div className="ml-auto h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`cursor-pointer flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
            theme === 'system' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'dark:text-gray-300'
          }`}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && (
            <div className="ml-auto h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 