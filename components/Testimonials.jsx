"use client";
import React, { useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { Quote, Terminal, Activity, CheckCircle2, ScanFace } from "lucide-react";

// 1. Consistency: Import the same fonts as your Header/Hero
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"] });

// 2. Data: Updated to sound like "Enterprise ERP" users
const testimonials = [
  {
    text: "Latency reduced by 40% across our northern herds. The offline-first architecture saved our data during the station outage.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    name: "Briana Patton",
    role: "Logistics Director",
    id: "OP-A102"
  },
  {
    text: "The API integration with our existing milking robotics was seamless. We achieved full bi-directional sync in under 48 hours.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
    name: "Bilal Ahmed",
    role: "Systems Architect",
    id: "SYS-B221"
  },
  {
    text: "Finally, an ERP that treats biological data as a first-class citizen. The predictive yield algorithms are frighteningly accurate.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    name: "Saman Malik",
    role: "Head Agronomist",
    id: "BIO-C098"
  },
  {
    text: "We replaced three separate legacy systems with this platform. The operational overhead dropped by 22% in the first quarter.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    name: "Omar Raza",
    role: "Chief Operations Officer",
    id: "EXEC-D442"
  },
  {
    text: "The granular permission controls allowed us to give specific access to our veterinary contractors without exposing financial data.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&q=80",
    name: "Zainab Hussain",
    role: "Compliance Officer",
    id: "SEC-E511"
  },
  {
    text: "Deployment was executed remotely. The automated training modules meant our field staff were proficient within two days.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    name: "Aliza Khan",
    role: "Field Manager",
    id: "OPS-F702"
  }
];

const TestimonialCard = ({ text, image, name, role, id }) => {
  return (
    <div className="p-8 border-b border-white/5 bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03] group">
      {/* Card Header: ID and Icon */}
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-[9px] text-green-500/60 uppercase tracking-[0.2em]">
          [{id}] // VERIFIED
        </span>
        <Quote className="w-4 h-4 text-neutral-700 group-hover:text-green-500 transition-colors" />
      </div>

      {/* Quote Text */}
      <p className={`${inter.className} text-sm text-neutral-300 leading-relaxed mb-8 font-light`}>
        "{text}"
      </p>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Image with specific styling to match Hero (Grayscale + Green tint) */}
          <div className="w-10 h-10 overflow-hidden relative grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
             <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
          </div>
          {/* Tech Corners overlay */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-green-500/50"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-green-500/50"></div>
        </div>
        
        <div>
          <h4 className={`${spaceGrotesk.className} font-bold text-xs text-white uppercase tracking-wider`}>
            {name}
          </h4>
          <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-tight mt-0.5">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsColumn = ({ testimonials, duration = 20, reverse = false }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex-1 min-w-[300px] border-r border-white/5 last:border-r-0">
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
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        {/* Top/Bottom Fade Gradients for smooth infinite look */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className={`py-32 bg-neutral-950 border-t border-white/5 relative ${inter.className}`}>
      
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* --- INDUSTRIAL HEADER (Aligned with Hero) --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              <Terminal className="w-4 h-4 text-green-500" />
              <span className="font-mono text-[10px] text-green-500/70 uppercase tracking-[0.3em]">
                System Logs // User Feedback
              </span>
            </div>
            
            <h2 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9]`}>
              Field <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">
                Validation.
              </span>
            </h2>
          </div>
          
          {/* Stats Box */}
          <div className="hidden md:flex items-center gap-6 p-6 border border-white/5 bg-neutral-900/50 backdrop-blur-md">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Satisfaction</span>
                </div>
                <span className={`${spaceGrotesk.className} text-2xl text-white font-bold`}>98.4%</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <ScanFace className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Retention</span>
                </div>
                <span className={`${spaceGrotesk.className} text-2xl text-white font-bold`}>99.1%</span>
            </div>
          </div>
        </div>

        {/* --- SCROLLING GRID --- */}
        <div 
          className="relative flex flex-col md:flex-row border-y border-white/5 h-[700px] overflow-hidden bg-neutral-900/10"
        >
          <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={35} />
          <TestimonialsColumn testimonials={testimonials.slice(2, 4)} duration={45} reverse={true} />
          <TestimonialsColumn testimonials={testimonials.slice(4, 6)} duration={40} />
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
        
        /* Pause on hover for better readability */
        .group:hover .animate-scroll-up,
        .group:hover .animate-scroll-down {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}