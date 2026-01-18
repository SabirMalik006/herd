"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scaleDimensions = () => {
    return window.innerWidth < 768 ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isDark={isDark}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div style={{ translateY: translate }} className="div max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, translate, children, isDark }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: isDark 
          ? "0 0 #0000004d, 0 37px 37px #00000042" 
          : "0 20px 80px -20px rgba(0,0,0,0.15)",
      }}
      className={`max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 p-2 md:p-6 rounded-[30px] transition-colors duration-500 ${
        isDark 
          ? "border-[#6C6C6C] bg-[#222222]" 
          : "border-neutral-300 bg-neutral-100"
      }`}
    >
      <div className={`h-full w-full overflow-hidden rounded-2xl md:p-4 ${isDark ? "bg-zinc-900" : "bg-white"}`}>
        {children}
      </div>
    </motion.div>
  );
};