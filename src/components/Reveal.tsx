"use client";

import { motion } from "framer-motion";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
