"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, ChevronDown, Settings, HelpCircle, Bell, X, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "react-hot-toast";

interface User {
  name?: string;
  email?: string;
  avatar?: string;
  [key: string]: string | undefined;
}

export default function AuthNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   window.location.href = "/";
  // };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  // Optimized navbar order for SaaS platform
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Add login/dashboard based on user state
  const displayLinks = user ? [...navLinks, { href: "/dashboard", label: "Dashboard" }] : [...navLinks];
    // : [...navLinks, { href: "/login", label: "Login" }];

  // Notifications (same behavior as dashboard navbar)
  const filters = useMemo(() => ({ per_page: 10 }), []);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    loading: notificationsLoading,
    fetchNotifications,
    refreshUnreadCount,
  } = useNotifications({
    pollingInterval: 300000,
    autoStart: false,
    filters,
  });

  const safeNotifications = notifications || [];

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl group">
              {mounted && (
                <div className="flex items-center space-x-2">
                  <Image
                    src={theme === "dark" ? "/light.png" : "/dark.png"}
                    alt="FarmDigits Logo"
                    width={120}
                    height={40}
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
              )}
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:block ml-12">
              <div className="flex items-center space-x-1">
                {displayLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications Dropdown (mirrors dashboard navbar) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                      disabled={false}
                    >
                      <Bell className={`w-5 h-5 ${notificationsLoading ? "animate-pulse" : ""}`} />
                      {unreadCount && unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold border-2 border-white">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 bg-white/95 backdrop-blur-sm border border-gray-200/50 dark:bg-black dark:text-white dark:border-gray-800"
                  >
                    <DropdownMenuLabel className="flex items-center justify-between p-4 rounded-t-lg">
                      <span className="font-semibold text-gray-800 dark:text-white">Notifications</span>
                      <div className="flex items-center gap-2">
                        {unreadCount && unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                          >
                            Mark all as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            try {
                              await fetchNotifications();
                              await refreshUnreadCount();
                              toast.success("Notifications refreshed");
                            } catch {
                              toast.error("Failed to refresh notifications");
                            }
                          }}
                          className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          disabled={!!notificationsLoading}
                          title="Refresh notifications"
                        >
                          {notificationsLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      {safeNotifications.length > 0 ? (
                        safeNotifications.map((notification: any) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${!notification.is_read ? "bg-blue-50/50 border-l-4 border-l-blue-500 dark:bg-gray-900 dark:border-l-blue-500" : "dark:bg-black"} dark:text-white`}
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <div className="flex w-full items-start gap-3">
                              <span className="text-lg">🔔</span>
                              <div className="flex-1">
                                <p className={`text-sm ${!notification.is_read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {new Date(notification.created_at).toLocaleString()}
                                </p>
                              </div>
                              {!notification.is_read && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400 dark:bg-black">
                          <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-700" />
                          {notificationsLoading ? "Loading notifications..." : "No notifications"}
                        </div>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/notifications"
                        className="cursor-pointer p-4 text-center text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                      >
                        View All Notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"
                        )}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/billing" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Billing & Plans
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/contact" className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild className="text-gray-700 dark:text-gray-300">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-gray-700/20 shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {displayLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium mr-3">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile Settings
                  </Link>
                  
                  <Link
                    href="/dashboard/billing"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Billing & Plans
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium"
                  >
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
