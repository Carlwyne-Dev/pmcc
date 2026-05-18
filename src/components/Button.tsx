"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost-navy" | "ghost-white";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-7 py-3.5 font-sans font-semibold text-sm tracking-wide rounded-full transition-all duration-300 relative select-none cursor-pointer focus:outline-none";

  let variantStyles = "";
  if (variant === "primary") {
    variantStyles =
      "bg-yellow text-navy border border-yellow hover:bg-yellow-hover hover:border-yellow-hover shadow-sm";
  } else if (variant === "ghost-navy") {
    variantStyles =
      "bg-transparent text-navy border border-navy/20 hover:bg-navy/5 hover:border-navy";
  } else if (variant === "ghost-white") {
    variantStyles =
      "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-yellow hover:text-yellow";
  }

  const content = (
    <motion.span className="inline-flex items-center gap-1.5">
      {children}
    </motion.span>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {content}
    </motion.button>
  );
}
