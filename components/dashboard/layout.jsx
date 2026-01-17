"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Ensure only one scrollbar exists while inside the dashboard
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-20 h-full w-72 transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 ${
          isSidebarOpen ? "md:w-72" : "md:w-20"
        }`}
      >
        <Sidebar isCollapsed={!isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden transition-all duration-300 ease-in-out">
        <DashboardNavbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 space-y-6 bg-gradient-to-br from-gray-50/50 via-white/50 to-purple-50/30 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-purple-900/20">
          {children}
        </main>
      </div>
    </div>
  );
}
