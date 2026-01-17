"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? "h-20 bg-neutral-950/90 backdrop-blur-xl border-b border-white/5" 
            : "h-24 bg-transparent" 
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/erp-logo.png" 
                alt="Logo" 
                width={240} 
                height={120} 
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                priority
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className={`hidden lg:flex items-center gap-8 ${inter.className}`}>
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.2em] hover:text-green-400 transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-2.5 font-mono text-[10px] text-green-500/80 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              [SYS_ONLINE]
            </div>
            
            <Link 
              href="/signup" 
              className="hidden lg:flex items-center gap-2 px-6 py-3 border border-white/10 text-[10px] font-bold text-white tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-neutral-950 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Image src="/erp-logo.png" alt="Logo" width={160} height={80} className="h-16 w-auto object-contain" />
              <button onClick={() => setMenuOpen(false)} className="p-2 text-white"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMenuOpen(false)} 
                    className={`${spaceGrotesk.className} text-5xl font-bold text-white hover:text-green-400 transition-colors block`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}