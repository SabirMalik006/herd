"use client";
import { Space_Grotesk, Inter } from "next/font/google";
import { Crosshair, BarChart3, Activity, ShieldCheck, Zap, Monitor, Play, X } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useRef, useState, useEffect } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function HeroScroll() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isVideoPlaying) {
        handleCloseVideo();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVideoPlaying]);

  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoPlaying]);

  return (
    <div className={`flex flex-col overflow-hidden relative py-32 ${inter.className} ${
      isDark ? "bg-neutral-950" : "bg-neutral-50"
    }`}>
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" 
            : "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-100"
        }`} />
        
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.04),transparent_70%)]"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <h2 className={`${spaceGrotesk.className} text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.8] ${
            isDark ? "text-white" : "text-neutral-900"
          }`}>
            Dashboard <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 via-green-600 to-emerald-900">
              For Your Herd
            </span>
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl">
            <div className="h-[1px] w-12 bg-green-500/50 hidden md:block" />
            <p className={`text-sm md:text-base font-light leading-relaxed tracking-wide text-center ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}>
              Monitor livestock performance, track health records, analyze milk yield, and manage breeding cycles from one centralized platform
            </p>
            <div className="h-[1px] w-12 bg-green-500/50 hidden md:block" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
            <a href="/dashboard" className="group">
              <button className="cursor-pointer relative px-10 py-4 bg-green-600 text-white font-bold text-[11px] tracking-widest uppercase overflow-hidden transition-all hover:bg-green-700">
                <span className="relative z-10">Explore Dashboard</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </button>
            </a>
            <button className={`cursor-pointer px-10 py-4 text-[11px] font-bold uppercase tracking-widest border transition-all backdrop-blur-sm ${
              isDark
                ? "border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
                : "border-neutral-300 text-neutral-600 bg-white/50 hover:text-black hover:border-neutral-900 shadow-sm"
            }`}>
              View Features
            </button>
          </div>
        </div>

        {/* 3D TILTING DASHBOARD FRAME WITH REAL IMAGE */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovering(true)}
          className="relative w-full max-w-6xl mx-auto"
          style={{ perspective: "2000px" }}
        >
          
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* Main Dashboard Container */}
            <div className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ${
              isDark 
                ? "bg-neutral-900/50 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                : "bg-white/80 border-neutral-200 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
            } ${isHovering ? 'shadow-[0_30px_100px_rgba(34,197,94,0.3)]' : ''}`}>
              
              {/* Browser-style Header Bar */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? "border-white/5 bg-black/20" : "border-neutral-200 bg-neutral-50"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className={`ml-4 px-4 py-1.5 rounded text-xs font-mono ${
                    isDark ? "bg-black/40 text-neutral-500" : "bg-white text-neutral-400"
                  }`}>
                    https://dashboard.agriherd.io
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className={`w-4 h-4 ${isDark ? "text-neutral-600" : "text-neutral-400"}`} />
                  <div className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest ${
                    isDark ? "bg-green-500/10 text-green-400" : "bg-green-50 text-green-600"
                  }`}>
                    Live
                  </div>
                </div>
              </div>

              {/* Dashboard Image Container */}
              <div className="relative overflow-hidden group/image">
                <img
                  src="/overview.png"
                  alt="AgriHerd Dashboard"
                  className={`w-full h-auto object-cover transition-all duration-700 ${
                    isDark ? 'opacity-95 grayscale-0' : 'opacity-90 grayscale-[0.1]'
                  } group-hover/image:grayscale-0 group-hover/image:opacity-100 group-hover/image:scale-[1.02]`}
                  draggable={false}
                />

                {/* Hover Overlay with Play Button */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayVideo}
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center cursor-pointer shadow-2xl shadow-green-500/50"
                  >
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </motion.div>
                </motion.div>

                {/* Animated Scan Line */}
                <motion.div 
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className={`absolute left-0 w-full h-[2px] z-30 ${
                    isDark ? 'bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-green-600/30'
                  }`}
                />
              </div>

              

              <div className="absolute bottom-6 right-6 z-40">
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`backdrop-blur-md border px-4 py-3 flex items-center gap-3 shadow-xl ${
                    isDark ? "bg-neutral-900/80 border-green-500/20" : "bg-white/95 border-neutral-200"
                  }`}
                >
                  <Crosshair className="w-4 h-4 text-green-600" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Global_Pos</span>
                    <span className={`text-[10px] font-mono leading-none ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}>40.7128° N, 74.0060° W</span>
                  </div>
                </motion.div>
              </div>
            </div>

            

            

            {/* Corner Accent Elements */}
            <div className={`absolute -bottom-3 -left-3 w-24 h-24 rounded-full blur-3xl ${
              isDark ? "bg-green-500/20" : "bg-green-500/10"
            }`} />
            <div className={`absolute -top-3 -right-3 w-24 h-24 rounded-full blur-3xl ${
              isDark ? "bg-blue-500/20" : "bg-blue-500/10"
            }`} />
          </motion.div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-green-500/30" />
            <p className={`text-xs font-mono uppercase tracking-widest ${
              isDark ? "text-neutral-600" : "text-neutral-400"
            }`}>
              // Real-time monitoring across all your operations
            </p>
            <div className="h-[1px] w-12 bg-green-500/30" />
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseVideo}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all group z-50"
                aria-label="Close video"
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Video Container */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <video
                  ref={videoRef}
                  src="/Videos/herd-dashboard.mp4"
                  controls
                  className="w-full h-auto"
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Escape hint */}
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <p className="text-white/50 text-sm font-mono">
                  Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/70">ESC</kbd> to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}