"use client";

import React, { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

type Category = "all" | "worship" | "youth" | "outreach" | "events";

const GalleryCard = ({ item }: { item: any }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!item.images || item.images.length <= 1) return;

    const checkIsMobile = () => {
      return typeof window !== "undefined" && window.innerWidth < 768;
    };

    let intervalId: NodeJS.Timeout | null = null;

    const startCycle = () => {
      if (checkIsMobile()) {
        intervalId = setInterval(() => {
          setIdx((prev) => (prev + 1) % item.images.length);
        }, 3500); // Cycle every 3.5 seconds
      }
    };

    startCycle();

    const handleResize = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      startCycle();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [item.images]);

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`break-inside-avoid w-full ${item.ratio} relative group`}
    >
      {/* Background Peeking Images (The Folder Stack) */}
      {item.images && item.images.map((src: string, i: number) => {
        if (i === idx) return null; // Don't render the active image in the background stack

        // Calculate a cleaner, slightly tighter fan-out spread to avoid collision with adjacent cards
        const rotate = (i - 1.5) * 8; 
        const x = (i - 1.5) * 35;
        const y = -15 + Math.abs(i - 1.5) * -8;

        return (
          <motion.div
            key={src}
            onClick={(e) => { 
              e.stopPropagation(); 
              setIdx(i); 
            }}
            className="absolute inset-0 m-auto w-full h-full cursor-pointer origin-bottom hover:!z-50"
            variants={{
               initial: { rotate: rotate * 0.1, x: 0, y: 0, scale: 0.95, opacity: 0 },
               animate: { rotate: rotate * 0.1, x: 0, y: 0, scale: 0.95, opacity: 1 },
               hover: { rotate, x, y, scale: 1.05, opacity: 1 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img 
              src={src} 
              alt="Background stack" 
              className="w-full h-full object-cover rounded-large shadow-lg border border-white/50 transition-transform duration-200 hover:scale-105" 
            />
          </motion.div>
        );
      })}

      {/* Main Front Card */}
      <div className="relative z-10 w-full h-full bg-surface rounded-large border border-navy/5 flex flex-col justify-between p-8 overflow-hidden shadow-premium">
        {item.images ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={item.images[idx]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/15 transition-colors duration-300 z-0 pointer-events-none" />
        )}

        <div className="relative z-20 pointer-events-none h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-sans font-bold text-[10px] tracking-tracked text-navy/40 uppercase bg-white/95 px-3 py-1 border border-navy/10 rounded-full shadow-sm">
              {item.cat}
            </span>
            <div className="flex items-center gap-3">
              {item.images && (
                <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {item.images.map((_: any, i: number) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'bg-yellow scale-125' : 'bg-white/40'}`} />
                  ))}
                </div>
              )}
              <ImageIcon size={16} className={`transition-colors ${item.images ? "text-white drop-shadow-md group-hover:text-yellow" : "text-navy/20 group-hover:text-navy/40"}`} />
            </div>
          </div>

          <div className={`mt-auto ${item.images ? "text-white" : "text-navy"}`}>
            <h3 className="font-sans font-bold text-lg mb-1 leading-snug drop-shadow-sm">
              {item.title}
            </h3>
            <p className={`font-sans text-[10px] tracking-wider uppercase ${item.images ? "text-white/70" : "text-muted"}`}>
              Negros Occidental
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { label: string; value: Category }[] = [
    { label: "All Photos", value: "all" },
    { label: "Worship Services", value: "worship" },
    { label: "Special Events", value: "events" },
  ];

  const items = [
    { 
      id: 1, 
      title: "Home Free Global Crusade Bacolod", 
      cat: "events", 
      ratio: "aspect-[16/10]",
      images: [
        "/assets/homefree.jpg",
        "/assets/hf_1.jpg",
        "/assets/hf_2.jpg",
        "/assets/hf_3.jpg"
      ]
    },
    {
      id: 2,
      title: "Lord's Day Sunday Worship Service",
      cat: "worship",
      ratio: "aspect-[4/3]",
      images: [
        "/assets/worship.jpg",
        "/assets/sunday_worship.jpg",
        "/assets/gallery_2.jpg"
      ]
    }
  ];

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.cat === activeCategory);

  return (
    <div className="bg-white">
      <PageHero
        title="Life at PMCC"
        tag="GALLERY"
        subtitle="A visual window into the active faith, dynamic worship, and community service of the Pulupandan Chapter."
        variant="dark"
        bgImage="/assets/worship.jpg"
      />

      {/* 2. Interactive Category Switcher */}
      <section className="py-8 bg-surface/30 border-b border-navy/5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 lg:px-20 relative">
          
          {/* Mobile view: Horizontal scrolling pills with gradients */}
          <div className="md:hidden relative w-full">
            {/* Fade Gradients for visual scrolling indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#faf9f6] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#faf9f6] to-transparent pointer-events-none z-10" />
            
            <div className="overflow-x-auto no-scrollbar flex items-center gap-2 px-4 py-1.5 scroll-smooth">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-navy text-white shadow-md shadow-navy/10 scale-[1.02]"
                        : "bg-white border border-navy/5 text-navy/60 hover:text-navy"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop view: Sliding Segmented Control */}
          <div className="hidden md:flex items-center justify-center p-1.5 bg-white rounded-full border border-navy/5 shadow-sm mx-auto max-w-fit gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 whitespace-nowrap ${
                    isActive ? "text-white" : "text-navy/50 hover:text-navy"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-navy rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Asymmetric Masonry Placeholder Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <Reveal delay={0.1}>
            <div className="text-center mb-12 font-sans text-xs text-muted tracking-widest uppercase">
              PMCC Pulupandan Chapter Gallery
            </div>
          </Reveal>

          {/* Grid list using Framer Motion layout animations for smooth filtering */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
