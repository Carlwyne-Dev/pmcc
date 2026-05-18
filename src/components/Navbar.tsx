"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { Home, Compass, Calendar, Image, Mail, Facebook, Youtube } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop Navigation Links
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Schedule", path: "/schedule" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  // Mobile Navigation Links (5 tabs with matching icons)
  const mobileLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Compass size={18} /> },
    { name: "Schedule", path: "/schedule", icon: <Calendar size={18} /> },
    { name: "Gallery", path: "/gallery", icon: <Image size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <>
      {/* Premium Horizontal Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-yellow origin-left z-[100] pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* TOP NAVBAR (Logo and desktop menu) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/80 backdrop-blur-md text-white border-b border-white/5 shadow-premium h-20"
            : "bg-transparent text-white h-20"
        }`}
      >
        <div className="w-full h-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* LOGO BLOCK (Always visible at top left for beautiful global branding) */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col group select-none focus:outline-none">
              <span className="font-serif font-light text-lg md:text-xl tracking-tight leading-none uppercase transition-colors duration-500 text-white lnum">
                PMCC 4th Watch
              </span>
              <span className="font-sans font-extrabold text-[9px] tracking-widest text-yellow uppercase mt-1">
                Pulupandan Chapter
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS (hidden on mobile) */}
          <nav className="hidden md:flex items-center justify-center gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative py-2 focus:outline-none ${
                    isActive
                      ? "text-yellow font-extrabold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-yellow"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION PANEL (Socials + Visit CTA) */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* SOCIAL LINK ICONS (Highly visible on both Mobile & Desktop) */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-yellow transition-colors duration-300 flex items-center justify-center p-1 focus:outline-none"
                aria-label="Facebook Page"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-yellow transition-colors duration-300 flex items-center justify-center p-1 focus:outline-none"
                aria-label="YouTube Channel"
              >
                <Youtube size={17} />
              </a>
            </div>

            {/* DESKTOP VISIT CTA (hidden on mobile) */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="text-[10px] tracking-widest uppercase border border-white/20 hover:border-white text-white hover:bg-white hover:text-navy transition-all duration-500 px-6 py-2.5 rounded-full font-bold bg-transparent"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 
        LIQUID GLASS BOTTOM NAVIGATION BAR FOR MOBILE (md:hidden)
        Floating modern capsule navigation mimicking a native luxury app experience!
      */}
      <div 
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[420px] h-[4.2rem] bg-[#0A1128]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.6)] z-50 flex items-center justify-around px-2 select-none"
      >
        {mobileLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 focus:outline-none ${
                isActive ? "text-yellow font-bold" : "text-white/50 hover:text-white"
              }`}
            >
              {/* iOS-Style Gliding Background Capsule (Framer Motion spring-tracked layoutId) */}
              {isActive && (
                <motion.div
                  layoutId="activeMobilePill"
                  className="absolute inset-0 bg-yellow/10 border border-yellow/20 rounded-full -z-10 shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              
              <div className="flex flex-col items-center gap-0.5 relative z-10">
                {link.icon}
                <span className="text-[8px] tracking-wider uppercase font-sans font-semibold">
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
