"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Moon, Sun } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  const links = [
    { name: "Home", href: "/", sectionId: "hero" },
    { name: "Features", href: "/features", sectionId: "feature-cards" },
    { name: "Pricing", href: "/pricing", sectionId: "pricing" },
    { name: "About", href: "/about", sectionId: "agri-trust" },
    { name: "Contact", href: "/contact", sectionId: "footer" },
  ];

  const isTransparent = isHomePage && !scrolled;

  const getTextColor = () => {
    if (isTransparent) return "text-white hover:text-green-400";
    
    return isDark 
      ? "text-neutral-400 hover:text-green-400" 
      : "text-neutral-600 hover:text-green-600";
  };

  const getIconColor = () => {
    if (isTransparent) return "text-white hover:text-green-400";
    return isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isTransparent
            ? "h-24 bg-transparent"
            : isDark
              ? "h-20 bg-neutral-950/90 backdrop-blur-xl border-b border-white/5"
              : "h-20 bg-white/90 backdrop-blur-xl border-b border-neutral-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center">
            <Image 
              src="/erp-logo.png" 
              alt="AgriHerd Logo" 
              width={240} 
              height={120} 
              className="h-16 md:h-25 w-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer" 
              priority 
            />
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className={`hidden lg:flex items-center gap-8 ${inter.className}`}>
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId)}
                className={`text-[11px] cursor-pointer font-semibold uppercase tracking-[0.2em] transition-all relative group ${getTextColor()}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-6">
            
            

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className={`p-2 cursor-pointer transition-all ${getIconColor()}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* GET STARTED BUTTON */}
            <Link 
              href="/signup" 
              className={`hidden lg:flex items-center gap-2 px-6 py-3 border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                isTransparent
                  ? "border-white/30 text-white hover:bg-white hover:text-black" 
                  : isDark
                    ? "border-white/10 text-white hover:bg-white hover:text-black"
                    : "border-neutral-300 text-black hover:bg-black hover:text-white"
              }`}
            >
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`lg:hidden p-2 ${isTransparent ? "text-white" : (isDark ? "text-white" : "text-black")}`}
            >
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
            className={`fixed inset-0 z-[110] p-8 flex flex-col ${
              isDark ? "bg-neutral-950" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-16">
              <Image 
                src="/erp-logo.png" 
                alt="Logo" 
                width={160} 
                height={80} 
                className="h-16 w-auto object-contain" 
              />
              <button 
                onClick={() => setMenuOpen(false)} 
                className={`p-2 ${isDark ? "text-white" : "text-black"}`}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`${spaceGrotesk.className} text-5xl font-bold hover:text-green-400 transition-colors block text-left ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-center gap-2 px-8 py-4 border text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white hover:bg-white hover:text-black"
                      : "border-neutral-300 text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Get Started <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}