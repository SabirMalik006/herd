"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { ArrowRight, Activity, Sprout, Database, LineChart, Cpu, ScanLine } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => setIsMounted(true), []);

  const slides = [
    { id: 1, image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80", title: "Herd Monitoring", tag: "LIVE DATA", icon: Activity },
    { id: 2, image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80", title: "Precision Nutrition", tag: "AI DIET", icon: Sprout },
    { id: 3, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80", title: "Health Analytics", tag: "DIAGNOSTICS", icon: Database },
    { id: 4, image: "https://images.unsplash.com/photo-1605098293544-25f4c4c14090?w=800&q=80", title: "Yield Tracking", tag: "FINANCIALS", icon: LineChart },
    { id: 5, image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80", title: "Smart Automation", tag: "ROBOTICS", icon: Cpu },
  ];
  const duplicatedSlides = [...slides, ...slides];

  if (!isMounted) return <div className="min-h-screen bg-neutral-950" />;

  return (
    <section className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 ${inter.className}`}>
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 h-[120%]">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src="/Videos/Herd Video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/40 to-neutral-950" />
      </motion.div>

      <motion.div className="relative z-30 text-center px-6 max-w-6xl pt-32" style={{ y: yText, opacity: opacityText }}>
        
        <h1 className={`${spaceGrotesk.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-6`}>
          Next Level <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700">Agriculture</span>
        </h1>

        <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          The precision ERP for the modern herd. Control every biological data point through a unified interface.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-40">
          <button className="group relative px-8 py-4 bg-green-600 text-white font-bold text-sm tracking-widest overflow-hidden transition-all hover:bg-green-700">
            <span className="relative z-10 flex items-center gap-2">START DEPLOYMENT <ArrowRight className="w-4 h-4" /></span>
          </button>
          <button className="px-8 py-4 border border-neutral-700 text-neutral-300 font-bold text-sm tracking-widest hover:border-green-500/50 transition-all backdrop-blur-sm">
             SYSTEM SPECS
          </button>
        </div>
      </motion.div>

      <div className="relative z-30 w-full mt-20 py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <motion.div className="flex gap-6 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {duplicatedSlides.map((slide, idx) => (
            <div key={`${slide.id}-${idx}`} className="group relative flex-shrink-0 w-[300px]">
               <div className="relative h-[180px] overflow-hidden rounded-lg border border-white/10 bg-neutral-900/50">
                  <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <span className="text-green-400 font-mono text-[10px] font-bold tracking-widest block">{slide.tag}</span>
                    <h3 className={`${spaceGrotesk.className} text-white text-xl font-bold`}>{slide.title}</h3>
                  </div>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}