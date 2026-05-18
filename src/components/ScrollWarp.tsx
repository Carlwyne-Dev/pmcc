"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export default function ScrollWarp({ children }: { children: React.ReactNode }) {
  // 1. Track global scroll coordinates
  const { scrollY } = useScroll();

  // 2. Compute dynamic scroll velocity
  const scrollVelocity = useVelocity(scrollY);

  // 3. Map velocity (-2000px/s to 2000px/s) to an elastic skew angle (-3.5deg to 3.5deg)
  const skewVelocity = useTransform(scrollVelocity, [-2000, 2000], [-3.5, 3.5]);

  // 4. Smooth out the skew with physical spring simulation
  const skewSpring = useSpring(skewVelocity, {
    stiffness: 100, // Speed of return bounce
    damping: 22,    // Resistance to avoid infinite wobble
    mass: 0.4,      // Weight of the bounce
  });

  return (
    <motion.div
      style={{ skewY: skewSpring }}
      className="origin-center w-full min-h-screen overflow-x-hidden transition-all duration-200"
    >
      {children}
    </motion.div>
  );
}
