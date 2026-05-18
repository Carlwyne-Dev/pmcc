import React from "react";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
  theme?: "yellow" | "navy" | "muted";
}

export default function SectionTag({
  children,
  className = "",
  theme = "yellow",
}: SectionTagProps) {
  let colorClass = "text-yellow";
  if (theme === "navy") colorClass = "text-navy";
  if (theme === "muted") colorClass = "text-muted";

  return (
    <span
      className={`font-sans font-semibold text-[11px] tracking-tracked uppercase block mb-3 ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
