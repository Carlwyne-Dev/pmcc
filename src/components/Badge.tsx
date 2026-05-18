import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "location" | "live" | "category";
  className?: string;
}

export default function Badge({
  children,
  variant = "location",
  className = "",
}: BadgeProps) {
  let styles = "";
  if (variant === "location") {
    styles =
      "bg-white text-navy border border-navy/10 px-4 py-1.5 text-xs font-semibold rounded-full inline-flex items-center gap-1.5";
  } else if (variant === "live") {
    styles =
      "bg-red-600 text-white px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md inline-flex items-center gap-1.5 animate-pulse";
  } else if (variant === "category") {
    styles =
      "bg-yellow text-navy px-3 py-1 text-xs font-bold rounded-full inline-flex items-center";
  }

  return <div className={`${styles} ${className}`}>{children}</div>;
}
