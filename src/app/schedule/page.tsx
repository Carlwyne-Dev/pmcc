"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import SectionTag from "@/components/SectionTag";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import {
  Sun,
  BookOpen,
  BookMarked,
  Heart,
  Clock,
  MapPin,
  Facebook,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Schedule() {
  const services = [
    {
      title: "Sunday School",
      time: "Sunday • 8:00 AM - 9:00 AM",
      desc: "Doctrine training and interactive bible classes for all age groups, focused on building clear scripture conviction.",
      location: "Pulupandan Main Chapel",
      icon: <BookOpen className="text-navy" size={28} />,
    },
    {
      title: "Sunday Worship Service",
      time: "Sunday • 9:00 AM - 12:00 PM",
      desc: "Gather with our congregation for Spirit-filled corporate praise, dynamic prayer, and a practical apostolic message that makes your faith come alive.",
      location: "Pulupandan Main Chapel",
      icon: <Sun className="text-navy" size={28} />,
    },
    {
      title: "Midweek Bible Study",
      time: "Tuesday • 7:00 PM",
      desc: "Doctrine teachings and scripture-by-scripture studies aimed at establishing solid biblical literacy and personal conviction.",
      location: "Pulupandan Main Chapel",
      icon: <BookMarked className="text-navy" size={28} />,
    },
    {
      title: "Congregational Prayer Meeting",
      time: "Thursday • 7:00 PM",
      desc: "An essential midweek spiritual powerhouse of unified corporate intercession, spiritual breakthrough prayers, and healing prayers for the sick.",
      location: "Pulupandan Main Chapel",
      icon: <Heart className="text-navy" size={28} />,
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <PageHero
        title="Gather with us"
        tag="WEEKLY SCHEDULE"
        subtitle="Our doors are open to everyone. Join us this week for Sunday School, worship, Bible study, and corporate prayer."
        variant="dark"
        bgImage="/assets/gathering.jpg"
      />

      {/* 2. Expanded Weekly Schedule */}
      <section className="py-24 bg-white border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">WEEKLY FELLOWSHIPS</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy">
                Regular Service Schedule
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Reveal key={service.title} delay={idx * 0.15} yOffset={30}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white border border-navy/10 hover:border-yellow rounded-large p-8 md:p-10 shadow-premium h-full flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-xl text-navy">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-yellow font-bold uppercase mt-1">
                          <Clock size={12} />
                          <span>{service.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div className="border-t border-navy/5 pt-6 flex items-center gap-2 text-xs text-navy/60 font-semibold uppercase tracking-wider mt-auto">
                    <MapPin size={14} className="text-yellow" />
                    <span>{service.location}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Special Events */}
      <section className="py-24 bg-surface border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <SectionTag theme="navy">BULLETINS</SectionTag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-6 leading-tight">
                  Special Events & Local Outreach
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={0.3}>
                <p className="font-sans text-muted text-base leading-relaxed">
                  Alongside our weekly services, we coordinate regular fellowships, community support programs, and youth gatherings throughout the year in Pulupandan and surrounding areas.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="font-sans text-muted text-base leading-relaxed">
                  Specific dates, times, and location details for upcoming youth nights, local medical programs, or outreach events are announced weekly during our Sunday services. Please check our Sunday bulletin or contact us directly for the latest updates.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Stream Segment */}
      <section className="py-24 bg-white border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">ONLINE CHURCH</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-6">
                Live stream coming soon
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-muted text-base leading-relaxed mb-8 max-w-md">
                We are actively setting up high-definition streaming for our Sunday Worship Services on Facebook and YouTube to support members who are traveling or online seekers globally.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex gap-4">
                <Button
                  href="https://www.facebook.com/people/PMCC-4th-Watch-Pulupandan-Young-Watchers/100066300444799/"
                  variant="ghost-navy"
                  className="flex items-center gap-2"
                >
                  <Facebook size={16} className="text-yellow" />
                  <span>Facebook Live</span>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-navy py-24 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-5 bg-white"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center z-10 relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">COME AS YOU ARE</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-extrabold text-4xl md:text-6xl tracking-tightest leading-tight text-white mb-6">
                Ready to experience
                <br />
                <span className="text-yellow">something real?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                No dress code. No judgment. Just a genuine community of believers and a God who welcomes you as you are.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="flex flex-col sm:flex-row items-center gap-4">
              <Button href="/contact" variant="primary">
                Plan Your Visit
              </Button>
              <Button href="/contact" variant="ghost-white">
                Get in Touch
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
