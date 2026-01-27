"use client";
import React, { useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { Quote, Terminal, CheckCircle2, ScanFace } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"] });

const testimonials = [
  {
    text: "This platform helped us reduce calf mortality by 30% through early health alerts. The breeding calendar alone has saved us countless hours of manual tracking.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    name: "Sarah Mitchell",
    role: "Dairy Farm Owner",
    id: "FARM-A102"
  },
  {
    text: "Our milk production increased by 18% after we started using the feed optimization tools. The system pays for itself in feed savings alone.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
    name: "Ahmed Khan",
    role: "Farm Manager",
    id: "DAIRY-B221"
  },
  {
    text: "I can now track every animal's health history from my phone. The vaccination reminders ensure we never miss a treatment, and our vet loves the detailed records.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    name: "Fatima Noor",
    role: "Livestock Veterinarian",
    id: "VET-C098"
  },
  {
    text: "Managing 500+ head of cattle used to be overwhelming. Now I have complete visibility into breeding cycles, health issues, and production metrics all in one place.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    name: "James Patterson",
    role: "Cattle Ranch Owner",
    id: "RANCH-D442"
  },
  {
    text: "The pregnancy tracking feature is a game-changer. We've improved our calving success rate by 25% and can plan our herd expansion more accurately.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&q=80",
    name: "Maria Garcia",
    role: "Breeding Specialist",
    id: "BREED-E511"
  },
  {
    text: "Real-time milk yield data helps us identify underperforming cows immediately. The financial reports show exactly which animals contribute most to our profit.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    name: "David Chen",
    role: "Dairy Operations Manager",
    id: "MILK-F702"
  }
];

const TestimonialCard = ({ text, image, name, role, id, isDark }) => {
  return (
    <div className={`p-8 border-b transition-all duration-300 group ${
      isDark
        ? "border-white/5 bg-neutral-900/20 hover:bg-white/[0.03]"
        : "border-neutral-200 bg-white/50 hover:bg-neutral-50"
    } backdrop-blur-sm`}>
      {/* Card Header: ID and Icon */}
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-[9px] text-green-500/60 uppercase tracking-[0.2em]">
          [{id}] // VERIFIED
        </span>
        <Quote className={`w-4 h-4 transition-colors ${
          isDark
            ? "text-neutral-700 group-hover:text-green-500"
            : "text-neutral-300 group-hover:text-green-500"
        }`} />
      </div>

      {/* Quote Text */}
      <p className={`${inter.className} text-sm leading-relaxed mb-8 font-light ${
        isDark ? "text-neutral-300" : "text-neutral-600"
      }`}>
        "{text}"
      </p>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 overflow-hidden relative grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
             <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
          </div>
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-green-500/50"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-green-500/50"></div>
        </div>
        
        <div>
          <h4 className={`${spaceGrotesk.className} font-bold text-xs uppercase tracking-wider ${
            isDark ? "text-white" : "text-black"
          }`}>
            {name}
          </h4>
          <p className={`font-mono text-[9px] uppercase tracking-tight mt-0.5 ${
            isDark ? "text-neutral-500" : "text-neutral-400"
          }`}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsColumn = ({ testimonials, duration = 20, reverse = false, isDark }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={`flex-1 min-w-[300px] border-r last:border-r-0 ${
      isDark ? "border-white/5" : "border-neutral-200"
    }`}>
      <div 
        className="overflow-hidden h-full relative"
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
            className={`flex flex-col animate-scroll-${reverse ? 'down' : 'up'}`}
            style={{ 
                animationDuration: `${duration}s`,
                animationPlayState: isPaused ? "paused" : "running"
            }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} isDark={isDark} />
          ))}
        </div>
        
        {/* Top/Bottom Fade Gradients */}
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent z-10 pointer-events-none ${
          isDark ? "from-neutral-950" : "from-white"
        }`} />
        <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent z-10 pointer-events-none ${
          isDark ? "from-neutral-950" : "from-white"
        }`} />
      </div>
    </div>
  );
};

export default function Testimonials() {
  const { isDark } = useTheme();

  return (
    <section className={`py-32 border-t relative ${inter.className} ${
      isDark 
        ? "bg-neutral-950 border-white/5"
        : "bg-white border-neutral-200"
    }`}>
      
      {/* Background Decor - Subtle Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none ${
        isDark ? "" : "opacity-50"
      }`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              
            </div>
            
            <h2 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] ${
              isDark ? "text-white" : "text-black"
            }`}>
              Trusted by <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">
                Livestock Farmers.
              </span>
            </h2>
          </div>
          
          {/* Stats Box */}
          <div className={`hidden md:flex items-center gap-6 p-6 border backdrop-blur-md ${
            isDark
              ? "border-white/5 bg-neutral-900/50"
              : "border-neutral-200 bg-white/70"
          }`}>
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Satisfaction</span>
                </div>
                <span className={`${spaceGrotesk.className} text-2xl font-bold ${
                  isDark ? "text-white" : "text-black"
                }`}>98.4%</span>
            </div>
            <div className={`w-[1px] h-8 ${isDark ? "bg-white/10" : "bg-neutral-200"}`} />
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <ScanFace className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Retention</span>
                </div>
                <span className={`${spaceGrotesk.className} text-2xl font-bold ${
                  isDark ? "text-white" : "text-black"
                }`}>99.1%</span>
            </div>
          </div>
        </div>

        {/* SCROLLING GRID */}
        <div 
          className={`relative flex flex-col md:flex-row border-y h-[700px] overflow-hidden ${
            isDark
              ? "border-white/5 bg-neutral-900/10"
              : "border-neutral-200 bg-neutral-50/30"
          }`}
        >
          <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={35} isDark={isDark} />
          <TestimonialsColumn testimonials={testimonials.slice(2, 4)} duration={45} reverse={true} isDark={isDark} />
          <TestimonialsColumn testimonials={testimonials.slice(4, 6)} duration={40} isDark={isDark} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-33.33%); }
        }
        @keyframes scroll-down {
          from { transform: translateY(-33.33%); }
          to { transform: translateY(0); }
        }
        .animate-scroll-up { animation: scroll-up linear infinite; }
        .animate-scroll-down { animation: scroll-down linear infinite; }
      `}</style>
    </section>
  );
}