"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const layerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      className={`h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 overflow-hidden bg-neutral-950 ${inter.className}`}
      ref={containerRef}
    >
      
      {/* BACKGROUND: Subtle Grid */}
      <div className="absolute inset-0 w-full h-full bg-neutral-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]" />
      </div>

      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translateY} titleComponent={titleComponent} />
        
        <Card rotate={rotate} translate={translateY} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-2 border-white/5 bg-neutral-900/40 p-2 md:p-4 rounded-[30px] shadow-2xl backdrop-blur-sm relative"
    >
        {/* Glow Effect behind the tablet */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-green-500/10 blur-3xl -z-10 rounded-full" />

      <div className="h-full w-full overflow-hidden rounded-2xl bg-neutral-950 border border-white/10 md:rounded-2xl relative flex flex-col">
        
        {/* TOP BAR: Dashboard Style */}
        <div className="h-10 w-full bg-neutral-900/80 border-b border-white/5 flex items-center justify-between px-4">
            {/* Window Controls */}
            <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
            </div>

            {/* System Status Label */}
            <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest">
                    Live_Feed_View_01
                </span>
            </div>
            
            {/* Tech Decoration */}
            <div className="text-[9px] text-neutral-600 font-mono">v.4.0.2</div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative group">
            {/* Optional Scanline Overlay for "Screen" feel */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            
            {children}
        </div>

      </div>

      {/* Floating Badge */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-4 md:-right-12 top-20 hidden md:flex flex-col gap-2"
      >
        <div className="bg-neutral-900/90 border border-green-500/30 backdrop-blur-md p-3 rounded-lg shadow-xl">
             <div className="text-[10px] text-neutral-400 font-mono uppercase mb-1">Sys_Latency</div>
             <div className={`${spaceGrotesk.className} text-green-400 font-bold text-lg`}>12ms</div>
        </div>
      </motion.div>

    </motion.div>
  );
};