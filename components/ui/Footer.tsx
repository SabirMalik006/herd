"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone, ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 border-t border-gray-200/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex-shrink-0 font-bold text-xl group mb-6 inline-block">
              {mounted && (
                <div className="flex items-center space-x-2">
                <Image
                  src={theme === "dark" ? "/light.png" : "/dark.png"}
                    alt="FarmDigits Logo"
                    width={140}
                    height={45}
                    className="transition-transform group-hover:scale-105"
                />
                </div>
              )}
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Empowering farmers with intelligent digital solutions. Transform your agricultural operations with our comprehensive farm management platform trusted by thousands worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2,500+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Active Farmers</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15M+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Animals Tracked</div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/farmdigits"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/farmdigits"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/farmdigits"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/farmdigits"
                className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Farm Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features#livestock"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Livestock Management
                </Link>
              </li>
              <li>
                <Link
                  href="/features#milk-sales"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Milk Sales
                </Link>
              </li>
              <li>
                <Link
                  href="/features#inventory"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Smart Inventory
                </Link>
              </li>
              <li>
                <Link
                  href="/features#analytics"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Analytics & Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/api-docs"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  API Documentation
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-purple-500" />
                support@farmdigits.com
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-purple-500" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-200/20 dark:border-purple-700/20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Stay Updated
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Get the Latest Farm Tech Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Subscribe to our newsletter for farming tips, product updates, and industry insights delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center text-sm text-gray-500 dark:text-gray-400 gap-2 sm:gap-4">
              <div className="flex items-center">
                <span>&copy; {currentYear} FarmDigits. All rights reserved.</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for farmers worldwide
                </span>
              </div>
              <div className="flex items-center">
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="flex items-center">
                  Developed with <Heart className="w-4 h-4 mx-1 text-red-500" /> by{" "}
                  <Link 
                    href="https://outscalers.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    Outscalers
                  </Link>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/security"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
