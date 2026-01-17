"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-2xl font-bold">FarmDigits</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons & Theme Toggle (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="h-9">
                Sign In
              </Button>
            </Link>
            <Button size="sm" className="h-9">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background border-b"
          >
            <div className="space-y-1 px-4 pb-5 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-base font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t mt-4">
                <Button variant="outline" className="w-full">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="w-full">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 