import React from "react";
import SectionTag from "./SectionTag";
import Reveal from "./Reveal";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
  variant?: "dark" | "light";
  bgImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  tag,
  variant = "dark",
  bgImage,
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col justify-center overflow-hidden ${
        isDark || bgImage ? "bg-navy text-white" : "bg-surface text-ink"
      }`}
    >
      {bgImage && (
        <>
          <img 
            src={bgImage} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-navy/80 z-0" />
        </>
      )}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 relative">
        <div className="max-w-3xl">
          {tag && (
            <Reveal delay={0.1}>
              <SectionTag theme={isDark ? "yellow" : "navy"} className="mb-4">
                {tag}
              </SectionTag>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl tracking-tightest leading-tight mb-6">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.3}>
              <p
                className={`font-sans text-base md:text-lg leading-relaxed ${
                  isDark ? "text-white/60" : "text-muted"
                }`}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>

      {/* Editorial geometric design elements */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-5 ${
          isDark ? "bg-white" : "bg-navy"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)",
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
