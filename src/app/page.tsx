"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ArrowRight,
  Sun,
  BookOpen,
  Heart,
  MapPin,
  Tv,
  BookMarked,
} from "lucide-react";
import Button from "@/components/Button";
import SectionTag from "@/components/SectionTag";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const galleryImages = [
  {
    src: "/assets/sunday_worship.jpg",
    alt: "PMCC Sanctuary Worship",
  },
  {
    src: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200&auto=format&fit=crop",
    alt: "Congregation Singing Praise",
  },
  {
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    alt: "Active Scripture Study",
  },
  {
    src: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=1200&auto=format&fit=crop",
    alt: "Open Bible Reflections",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    alt: "Church Family Fellowship Gathering",
  },
  {
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop",
    alt: "Morning Sunbeams in Chapel",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    alt: "PMCC Youth Fellowship Joy",
  },
];

const heroCards = [
  {
    title: "4th Watch Chapel",
    caption: "Pulupandan, Negros Occidental",
    gradient: "from-navy/60 via-navy/30 to-transparent",
    bg: "bg-gradient-to-br from-amber-100 to-amber-50",
  },
  {
    title: "Sunday Worship",
    caption: "Every Sunday · 9 AM – 12 PM",
    gradient: "from-navy/80 via-navy/50 to-transparent",
    bg: "bg-navy",
    img: "/assets/sunday_worship.jpg",
  },
  {
    title: "Bible Study",
    caption: "Every Tuesday · 7 PM",
    gradient: "from-navy/60 via-navy/30 to-transparent",
    bg: "bg-gradient-to-br from-emerald-100 to-teal-50",
  },
];

export default function Home() {
  const [activeCard, setActiveCard] = useState(0);
  const [activeWord, setActiveWord] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeMobileIndices, setActiveMobileIndices] = useState<number[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroWords = ["faith", "love", "hope", "grace", "truth"];

  const [ctaMousePos, setCtaMousePos] = useState({ x: 0, y: 0 });
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCtaMousePos({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const nextCard = useCallback(() => {
    setActiveCard((prev) => (prev + 1) % heroCards.length);
  }, []);

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextCard, 5000);
    return () => clearInterval(timer);
  }, [nextCard]);

  // Auto-rotate hero words every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroWords.length]);

  // Drag-to-dismiss handler
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      nextCard();
    }
  };

  // Mobile Scroll Observer: Detects when cards are in the vertical center area of the viewport
  useEffect(() => {
    const handleMobileScroll = () => {
      // Only execute on mobile sizes (below md screen: 768px)
      if (typeof window === "undefined" || window.innerWidth >= 768 || !cardsContainerRef.current) return;
      
      const cardElements = cardsContainerRef.current.children;
      const viewportCenter = window.innerHeight / 2;
      const activeList: number[] = [];
      
      for (let i = 0; i < cardElements.length; i++) {
        const rect = cardElements[i].getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        
        // If the card center is within 240px of the viewport center, it is active!
        // This threshold allows a beautiful, organic overlapping fade as you scroll!
        if (distance < 240 && rect.top < window.innerHeight && rect.bottom > 0) {
          activeList.push(i);
        }
      }
      
      // Update state only if the active list has actually changed (prevents redundant renders!)
      setActiveMobileIndices((prev) => {
        if (prev.length === activeList.length && prev.every((val, index) => val === activeList[index])) {
          return prev;
        }
        return activeList;
      });
    };

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    // Run once initially
    handleMobileScroll();
    
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="bg-white text-navy selection:bg-yellow selection:text-navy w-full overflow-x-clip relative">
      
      {/* ==========================================
         1. HERO SECTION (VIDEO BACKGROUND + CARD DECK)
         ========================================== */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden w-full">
        
        {/* Fullscreen Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-125 z-0"
        >
          <source src="/assets/hero_bg.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/50 z-[1]" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography on dark video bg */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 flex flex-col items-start"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <MapPin size={12} className="text-yellow" />
                  <span className="font-sans font-extrabold text-[9px] tracking-widest uppercase text-white/80">Pulupandan Chapter</span>
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white mb-8 tracking-tightest uppercase"
              >
                Where{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroWords[activeWord]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block italic font-normal lowercase text-yellow font-serif"
                  >
                    {heroWords[activeWord]}
                  </motion.span>
                </AnimatePresence>
                <br />
                comes alive.
              </motion.h1>

              <motion.div variants={itemVariants} className="w-16 h-[1px] bg-white/20 mb-8" />

              <motion.p
                variants={itemVariants}
                className="font-sans text-sm md:text-base text-white/70 leading-relaxed max-w-xl mb-10"
              >
                Welcome to the Pulupandan Chapter of the Pentecostal Missionary Church of Christ (4th Watch). Join us in worship, scripture study, and community service here in Negros Occidental.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto"
              >
                <Button href="/schedule" variant="primary" className="text-[10px] tracking-widest uppercase py-3.5 px-6 font-extrabold shadow-sm">
                  <span>Join a Service</span>
                  <ArrowRight size={13} />
                </Button>
                <Button
                  href="/about"
                  variant="ghost-white"
                  className="text-[10px] tracking-widest uppercase py-3.5 px-6 font-extrabold"
                >
                  <span>Our Beliefs</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column: Draggable Photo Card Deck */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-[380px] aspect-[4/3]">
                {heroCards.map((card, i) => {
                  const offset = (i - activeCard + heroCards.length) % heroCards.length;
                  const isTop = offset === 0;

                  return (
                    <AnimatePresence key={i} mode="popLayout">
                      <motion.div
                        layout
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{
                          scale: 1 - offset * 0.06,
                          y: offset * -12,
                          opacity: offset > 2 ? 0 : 1 - offset * 0.25,
                          rotateZ: offset === 0 ? 0 : offset * 2,
                        }}
                        exit={{ x: 250, opacity: 0, rotateZ: 12 }}
                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                        drag={isTop}
                        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={isTop ? handleDragEnd : undefined}
                        style={{
                          zIndex: heroCards.length - offset,
                          position: offset === 0 ? "relative" : "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          cursor: isTop ? "grab" : "default",
                        }}
                        whileDrag={{ cursor: "grabbing", scale: 1.04, rotateZ: -3 }}
                         className={`w-full aspect-[4/3] ${card.bg} rounded-2xl overflow-hidden shadow-2xl select-none relative group`}
                      >
                        {/* Background Image if available */}
                        {card.img && (
                          <div 
                            className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${card.img})` }}
                          />
                        )}
                        {/* Bottom gradient overlay for caption */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient}`} />

                        {/* Caption at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                          <h3 className="font-serif font-light text-2xl text-white leading-tight uppercase drop-shadow-md">
                            {card.title}
                          </h3>
                          <p className="font-sans text-[10px] tracking-widest uppercase text-white/70 mt-1.5 drop-shadow-sm">
                            {card.caption}
                          </p>
                        </div>

                        {/* Subtle yellow accent dot */}
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-yellow/80 z-10" />
                      </motion.div>
                    </AnimatePresence>
                  );
                })}

                {/* Card indicator dots */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {heroCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCard(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeCard ? "bg-yellow w-6" : "bg-white/30 hover:bg-white/50 w-1.5"
                      }`}
                      aria-label={`Go to card ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Quick Links Horizontal Ribbon */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm py-5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 flex flex-row items-center justify-center gap-10 font-sans text-[10px] text-white/50 font-bold uppercase tracking-widest">
            <Link
              href="https://pmcc4thwatch.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-2 transition-colors duration-300"
            >
              <BookMarked size={12} className="text-yellow" />
              <span>Global Feeds</span>
            </Link>
            <div className="w-[1px] h-3 bg-white/20" />
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-2 transition-colors duration-300"
            >
              <Tv size={12} className="text-yellow" />
              <span>Media Stream</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
         2. ABOUT SNAPSHOT (ELEGANT EDITORIAL BLOCK)
         ========================================== */}
      <section className="bg-surface/30 py-24 border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Title Column: Cormorant Serif Title */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <SectionTag theme="yellow">WHO WE ARE</SectionTag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-navy uppercase leading-[0.95] mt-6">
                  Built on truth.
                  <br />
                  Open to all.
                </h2>
              </Reveal>
            </div>
            
            {/* Right Paragraphs Column */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={0.3}>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  The Pulupandan Chapter of the Pentecostal Missionary Church of Christ (4th Watch) is a welcoming community of believers in Negros Occidental. We gather weekly to study the Bible, pray together, and support one another in faith.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  We hold to the original teachings of Christ and the apostles. Through weekly worship, Bible study, and prayer, we help believers of all ages grow in faith and walk in Christian love.
                </p>
              </Reveal>
              <Reveal delay={0.5} className="pt-4">
                <Link
                  href="/about"
                  className="font-sans font-extrabold text-[10px] tracking-widest uppercase text-navy hover:text-yellow transition-colors inline-flex items-center gap-2 focus:outline-none"
                >
                  <span>Our detailed beliefs</span>
                  <ArrowRight size={13} />
                </Link>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         3. SERVICES SNAPSHOT (PROGRAM DIRECTORY)
         ========================================== */}
      <section className="bg-navy py-28 relative overflow-hidden text-white border-t border-b border-white/5">
        {/* Dynamic Ambient Blurred Background Glow (Swaps with fading smooth transitions on hover) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000">
          <AnimatePresence>
            {hoveredService !== null ? (
              <motion.div
                key={hoveredService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={[
                    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
                    "/assets/sunday_worship.jpg",
                    "https://images.unsplash.com/photo-1504052434569-70ad58565b90?q=80&w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop"
                  ][hoveredService]}
                  alt=""
                  className="w-full h-full object-cover filter blur-[80px] saturate-150"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-navy z-0"
              />
            )}
          </AnimatePresence>
          {/* Faint baseline gold center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </div>
        
        {/* Geometric Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5 z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col items-center text-center mb-20 max-w-xl mx-auto">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">WEEKLY CALENDAR</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase mt-6 mb-6">
                Regular Services
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                Connect with our local church family through structured worship, prayer meetings, and systematic Bible instruction.
              </p>
            </Reveal>
          </div>

          {/* Premium Glassmorphic Cards Grid */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                num: "I",
                title: "Sunday School",
                time: "Sunday • 8:00 AM - 9:00 AM",
                desc: "Weekly Bible lessons and interactive classes for children, youth, and adults.",
                icon: <BookOpen size={18} />,
                img: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
              },
              {
                num: "II",
                title: "Sunday Worship",
                time: "Sunday • 9:00 AM - 12:00 PM",
                desc: "Our main weekly service featuring praise, congregational prayer, and scripture message.",
                icon: <Sun size={18} />,
                img: "/assets/sunday_worship.jpg",
              },
              {
                num: "III",
                title: "Bible Study",
                time: "Tuesday • 7:00 PM",
                desc: "Midweek Bible study focused on understanding scripture together.",
                icon: <BookMarked size={18} />,
                img: "https://images.unsplash.com/photo-1504052434569-70ad58565b90?q=80&w=600&auto=format&fit=crop",
              },
              {
                num: "IV",
                title: "Prayer Meeting",
                time: "Thursday • 7:00 PM",
                desc: "Weekly gathering for congregational prayer, encouragement, and support.",
                icon: <Heart size={18} />,
                img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop",
              },
            ].map((service, index) => {
              const isMobileActive = activeMobileIndices.includes(index);
              const isDesktopActive = hoveredService === index;
              const isHovered = isMobileActive || isDesktopActive;

              return (
                <Reveal key={service.title} delay={index * 0.08} yOffset={15}>
                  <motion.div 
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                    className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/10 hover:border-yellow/30 p-8 h-full flex flex-col justify-between transition-all duration-500 shadow-premium relative overflow-hidden select-none"
                  >
                    {/* Card Inner Background Image Overlay (Zooms & fades to full opacity on hover) */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none rounded-2xl bg-[#070D1E]">
                      <motion.div
                        animate={{ 
                          opacity: isHovered ? 0.45 : 0, 
                          scale: isHovered ? 1.06 : 1 
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.img})` }}
                      />
                      {/* Ambient dark gradient overlay to ensure perfect contrast */}
                      <motion.div
                        animate={{ 
                          opacity: isHovered ? 0.85 : 0 
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/85 to-[#0A1128]/45"
                      />
                    </div>

                    <div className="relative z-10 flex-grow flex flex-col justify-between h-full">
                      <div>
                        {/* Roman Numeral Accent Badge */}
                        <motion.div 
                          animate={{ 
                            opacity: isMobileActive ? 0 : 1,
                            y: isMobileActive ? -12 : 0, 
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex justify-between items-start mb-8"
                        >
                          <motion.div 
                            animate={{
                              borderColor: isHovered ? "rgba(255, 217, 61, 0.4)" : "rgba(255, 255, 255, 0.1)",
                              color: isHovered ? "#FFD93D" : "rgba(255, 255, 255, 0.7)",
                              backgroundColor: isHovered ? "rgba(255, 217, 61, 0.05)" : "rgba(255, 255, 255, 0.05)",
                              scale: isHovered ? 1.05 : 1
                            }}
                            transition={{ duration: 0.4 }}
                            className="w-10 h-10 rounded-full border flex items-center justify-center font-serif text-[13px] italic font-semibold shadow-inner select-none transition-all duration-300"
                          >
                            {service.num}
                          </motion.div>
                        </motion.div>

                        {/* Title */}
                        <motion.h3 
                          animate={{ 
                            color: isHovered ? "#FFD93D" : "#FFFFFF",
                            y: isHovered ? -2 : 0 
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="font-sans font-extrabold text-[13px] tracking-[0.15em] uppercase mb-3 transition-colors duration-300"
                        >
                          {service.title}
                        </motion.h3>
                        
                        {/* Description */}
                        <motion.p 
                          animate={{ 
                            opacity: isHovered ? 0.9 : 0.5,
                            y: isHovered ? 2 : 0,
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="font-sans text-xs text-white leading-relaxed mt-3"
                        >
                          {service.desc}
                        </motion.p>
                      </div>
                      
                      {/* Time Badge */}
                      <motion.div 
                        animate={{ 
                          borderColor: isHovered ? "rgba(255, 217, 61, 0.4)" : "rgba(255, 255, 255, 0.1)",
                          color: isHovered ? "#FFD93D" : "rgba(255, 255, 255, 0.7)",
                          backgroundColor: isHovered ? "rgba(255, 217, 61, 0.05)" : "rgba(255, 255, 255, 0.05)",
                          y: isHovered ? 4 : 0 
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full mt-6 border font-sans text-[10px] font-bold tracking-widest uppercase text-center py-3 px-4 rounded-xl shadow-sm transition-all duration-300"
                      >
                        {service.time}
                      </motion.div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center relative z-10">
            <Reveal delay={0.4}>
              <Link
                href="/schedule"
                className="font-sans font-extrabold text-[10px] tracking-widest uppercase text-white/60 hover:text-yellow transition-all duration-300 inline-flex items-center gap-2.5 focus:outline-none border-b border-white/10 hover:border-yellow/40 pb-1.5"
              >
                <span>View full calendar</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
         4. EVENTS SNAPSHOT (MAGAZINE BULLETIN)
         ========================================== */}
      <section className="bg-surface/30 py-24 border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">LATEST NOTICES</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl tracking-tight text-navy uppercase mt-6">
                Upcoming Highlights
              </h2>
            </Reveal>
          </div>

          {/* Clean Magazine Bulletin List */}
          <div className="flex flex-col gap-4 mb-12">
            {[
              {
                num: "01",
                type: "WEEKLY",
                title: "Sunday Worship Service",
                desc: "Our main weekly gathering for congregational worship, prayer, and Bible teaching.",
                loc: "Pulupandan Chapter Chapel",
              },
              {
                num: "02",
                type: "YOUTH",
                title: "Youth Service & Fellowship",
                desc: "A weekly gathering for young people to study scripture, fellowship, and sing together.",
                loc: "Pulupandan Chapter Chapel",
              },
              {
                num: "03",
                type: "OUTREACH",
                title: "Community Outreach",
                desc: "Our local community program helping families in Pulupandan with food sharing and basic support.",
                loc: "Pulupandan, Negros Occidental",
              },
            ].map((event, index) => {
              return (
                <Reveal key={event.title} delay={index * 0.08} yOffset={10}>
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="group border border-neutral-100 hover:border-transparent bg-white/40 hover:bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-navy/5 px-6 md:px-8 transition-all duration-500 rounded-2xl relative overflow-hidden select-none cursor-pointer"
                  >
                    {/* Active Left Golden Sliding Edge accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

                    {/* Left: Classic Bulletin Num */}
                    <div className="flex items-center gap-6 min-w-[120px]">
                      <span className="font-serif italic text-sm text-navy/20 font-bold group-hover:text-yellow/40 transition-colors duration-300">
                        {event.num}
                      </span>
                      <span className="font-sans font-extrabold text-[8px] tracking-widest text-navy group-hover:text-yellow bg-white border border-neutral-150 group-hover:border-yellow/30 px-3 py-1.5 rounded-lg uppercase transition-all duration-300 shadow-sm">
                        {event.type}
                      </span>
                    </div>

                    {/* Center: Title / Details */}
                    <div className="flex-grow max-w-xl">
                      <h3 className="font-sans font-extrabold text-xs text-navy uppercase tracking-widest mb-2 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="font-sans text-[11px] text-muted group-hover:text-ink/80 transition-colors duration-300 mb-3 leading-relaxed">
                        {event.desc}
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] text-navy/40 group-hover:text-navy/60 font-sans tracking-widest uppercase font-bold transition-colors duration-300">
                        <MapPin size={11} className="text-yellow mr-1" />
                        <span>{event.loc}</span>
                      </div>
                    </div>

                    {/* Right: Minimal Arrow */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-10 h-10 rounded-full border border-neutral-200 group-hover:border-yellow group-hover:bg-yellow group-hover:text-navy flex items-center justify-center text-navy/60 transition-all duration-500 self-end md:self-center shadow-sm group-hover:translate-x-1 group-hover:shadow-md"
                    >
                      <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                    </motion.div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
         5. GALLERY SNAPSHOT (VISUAL ARCHIVE)
         ========================================== */}
      <section className="bg-black py-28 border-t border-b border-white/5 relative">
        {/* Faint gold background glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Reveal delay={0.1}>
                <SectionTag theme="yellow">VISUAL DIARY</SectionTag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl tracking-tight text-white uppercase mt-6">
                  Life at PMCC
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.3}>
              <Link
                href="/gallery"
                className="font-sans font-extrabold text-[10px] tracking-widest uppercase text-white/60 hover:text-yellow transition-all duration-300 inline-flex items-center gap-2.5 focus:outline-none border-b border-white/10 hover:border-yellow/40 pb-1.5"
              >
                <span>View full gallery</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Immersive Scroll-Zoom Parallax Showcase */}
        <div className="relative w-full z-0">
          {isMobileView ? (
            /* MOBILE GALLERY VIEW: Premium Horizontal Snapping Swiper */
            <div className="w-full overflow-hidden py-8">
              <div 
                className="w-full overflow-x-auto flex gap-4 px-6 snap-x snap-mandatory scroll-smooth" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryImages.map(({ src, alt }, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[78vw] max-w-[280px] aspect-[4/5] snap-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)] relative bg-[#070D1E] group"
                  >
                    <img 
                      src={src || '/placeholder.svg'} 
                      alt={alt || `Gallery Image ${index + 1}`} 
                      className="w-full h-full object-cover rounded-2xl" 
                    />
                    {/* Luxury dark gradient fade overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/95 via-[#0A1128]/25 to-transparent pointer-events-none" />
                    
                    {/* Caption Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="text-[9px] uppercase tracking-[0.18em] font-sans font-black text-yellow">
                        {String(index + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                      </span>
                      {alt && (
                        <h4 className="text-xs font-sans font-extrabold uppercase text-white tracking-wider mt-1">
                          {alt}
                        </h4>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Soft swipe helper indicator */}
              <div className="flex justify-center items-center gap-1.5 mt-6 opacity-60">
                <div className="w-8 h-[2px] bg-yellow rounded-full" />
                <span className="text-[8px] uppercase tracking-widest font-sans font-bold text-white/50">
                  Swipe to Explore
                </span>
                <div className="w-8 h-[2px] bg-white/20 rounded-full" />
              </div>
            </div>
          ) : (
            /* DESKTOP GALLERY VIEW: 3D Flight-Zoom Parallax (rendered directly to preserve sticky container metrics) */
            <ZoomParallax images={galleryImages} />
          )}
        </div>

        <div className="text-center font-sans text-[10px] text-white/20 tracking-widest uppercase mt-12 relative z-10 select-none">
          LIFE AT PMCC PULUPANDAN • IMMERSIVE VISUAL CATALOG
        </div>
      </section>

      {/* ==========================================
         6. CALL TO ACTION SECTION (NAVY MONOGRAPH)
         ========================================== */}
      <section 
        onMouseMove={handleCtaMouseMove}
        className="bg-navy py-32 text-white relative overflow-hidden border-t border-white/5 cursor-default group"
      >
        {/* Subtle grid layout in background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

        {/* Dynamic Spring-Interpolated Mouse Spotlight Glow */}
        <motion.div
          className="absolute pointer-events-none rounded-full w-[600px] h-[600px] bg-yellow/[0.04] group-hover:bg-yellow/[0.08] blur-[100px] z-0 left-0 top-0 transition-colors duration-500"
          animate={{
            x: ctaMousePos.x - 300,
            y: ctaMousePos.y - 300,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 120, mass: 0.8 }}
        />

        {/* Static Gold Ambient Glow (Fallback / Base) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow/5 rounded-full blur-[80px] pointer-events-none z-0" />

        {/* Slow-Drifting Glowing Diagonal Gradient Lines */}
        <motion.div
          animate={{
            x: [-150, 150, -150],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[25%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-yellow/45 to-transparent rotate-[18deg] blur-[1px] pointer-events-none z-0"
        />
        <motion.div
          animate={{
            x: [150, -150, 150],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute right-[-10%] bottom-[30%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/35 to-transparent -rotate-[12deg] blur-[2px] pointer-events-none z-0"
        />

        {/* Ambient floating color blobs */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[8%] top-[12%] w-[250px] h-[250px] bg-yellow/[0.02] rounded-full blur-[70px] pointer-events-none z-0"
        />
        <motion.div
          animate={{
            x: [0, -60, 80, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute right-[12%] bottom-[12%] w-[300px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[80px] pointer-events-none z-0"
        />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center z-10 relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center relative">

            <Reveal delay={0.1}>
              <SectionTag theme="yellow">COME AS YOU ARE</SectionTag>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h2 className="font-serif font-light text-4xl md:text-6xl tracking-tight text-white uppercase mt-6 mb-6 leading-[0.95] max-w-2xl">
                Connect with our <span className="font-normal italic text-yellow text-shadow-glow">local church</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="font-sans text-white/60 text-xs md:text-sm tracking-wide leading-relaxed mb-10 max-w-md select-none">
                Experience a genuine, active community of faith in Pulupandan. We would love to welcome you in person to our weekly services.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
              <Button href="/contact" variant="primary" className="w-full sm:w-auto text-[10px] tracking-widest uppercase py-4 px-10 font-extrabold shadow-lg hover:shadow-yellow/10 transition-all duration-300">
                <span>Plan Your Visit</span>
              </Button>
              <Button href="/contact" variant="ghost-white" className="w-full sm:w-auto text-[10px] tracking-widest uppercase py-4 px-10 font-extrabold hover:bg-white/5 transition-all duration-300">
                <span>Get in Touch</span>
              </Button>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-center justify-center gap-2 text-white/40 text-[9px] font-sans tracking-widest uppercase font-bold select-none">
                <MapPin size={11} className="text-yellow mr-1" />
                <span>Pulupandan, Negros Occidental</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}
