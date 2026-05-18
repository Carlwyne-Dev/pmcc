"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

type Category = "all" | "worship" | "youth" | "outreach" | "events";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { label: string; value: Category }[] = [
    { label: "All Photos", value: "all" },
    { label: "Worship Services", value: "worship" },
    { label: "Youth Fellowships", value: "youth" },
    { label: "Community Outreach", value: "outreach" },
    { label: "Special Events", value: "events" },
  ];

  const items = [
    { id: 1, title: "Sunday Praise & Worship", cat: "worship", ratio: "aspect-[16/10]" },
    { id: 2, title: "Systematic Bible Study Session", cat: "worship", ratio: "aspect-[1/1]" },
    { id: 3, title: "Saturday Youth Music Practice", cat: "youth", ratio: "aspect-[1/1]" },
    { id: 4, title: "Barangay Health Pack Distribution", cat: "outreach", ratio: "aspect-[16/10]" },
    { id: 5, title: "Chapter Anniversary Praise Event", cat: "events", ratio: "aspect-[1/1]" },
    { id: 6, title: "Youth Fellowship Group Discussion", cat: "youth", ratio: "aspect-[16/10]" },
    { id: 7, title: "Midweek Prayer Focus Gathering", cat: "worship", ratio: "aspect-[1/1]" },
    { id: 8, title: "Barangay Outreach Family Sharing", cat: "outreach", ratio: "aspect-[16/10]" },
    { id: 9, title: "Congregational Fellowship Dinner", cat: "events", ratio: "aspect-[1/1]" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.cat === activeCategory);

  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <PageHero
        title="Life at PMCC"
        tag="GALLERY"
        subtitle="A visual window into the active faith, dynamic worship, and community service of the Pulupandan Chapter."
        variant="light"
      />

      {/* 2. Interactive Category Switcher */}
      <section className="py-12 bg-surface/30 border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-navy text-yellow shadow-sm"
                      : "bg-white text-navy border border-navy/10 hover:border-navy/35"
                  }`}
                >
                  {cat.label}
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
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`break-inside-avoid w-full ${item.ratio} bg-surface rounded-large border border-navy/5 flex flex-col justify-between p-8 relative overflow-hidden group shadow-premium`}
                >
                  {/* Overlay background color shift on hover */}
                  <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/15 transition-colors duration-300 z-0" />
                  
                  {/* Top: Category Tag and Icon */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-sans font-bold text-[10px] tracking-tracked text-navy/40 uppercase bg-white/95 px-3 py-1 border border-navy/10 rounded-full">
                      {item.cat}
                    </span>
                    <ImageIcon size={16} className="text-navy/20 group-hover:text-navy/40 transition-colors" />
                  </div>

                  {/* Bottom: Typography Info */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-sans font-bold text-sm text-navy mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[10px] text-muted tracking-wider uppercase">
                      Negros Occidental
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
