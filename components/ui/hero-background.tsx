"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <>
      {/* Glow effect animated alongside the hero image */}
      <motion.div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      />
      
      {/* Container handles the entrance animation (opacity, blur, grayscale, scale, y) */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0, filter: "blur(10px) grayscale(70%)", scale: 1.03, y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px) grayscale(0%)", scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Inner div holds the static background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-[center_bottom] md:bg-[right_bottom]"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
      </motion.div>
    </>
  );
}
