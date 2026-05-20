"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import SectionTag from "@/components/SectionTag";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { Globe, Shield, Compass } from "lucide-react";

export default function About() {
  const beliefs = [
    {
      num: "01",
      title: "The Bible",
      desc: "In the Holy Scriptures, as verbally inspired by God and the sole authority for faith, life, and conduct.",
    },
    {
      num: "02",
      title: "Godhead",
      desc: "In God as Father, Son, and Holy Spirit. The Son, Jesus Christ, lived sinless, died, rose again, and will return to receive His followers.",
    },
    {
      num: "03",
      title: "Salvation",
      desc: "In Salvation attained by grace through faith, not of works. That believers have been atoned, regenerated, forgiven, justified and to be glorified by Christ.",
    },
    {
      num: "04",
      title: "Holiness",
      desc: "In living a holy and godly life, not involved in worldly vices, whether it is the lust of the eyes, lust of the flesh, pride of life, and other acts that defile the body.",
    },
    {
      num: "05",
      title: "Apostolic Church",
      desc: "In one and only apostolic church of Christ, composed of true disciples washed and forgiven; living under the guidance of the Holy Spirit.",
    },
    {
      num: "06",
      title: "The 4th Watch",
      desc: "We believe in the imminence of Christ’s return in our time—the 4th watch. True believers waiting for this blessed hope must live in holiness and service.",
    },
  ];



  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <PageHero
        title="Who we are"
        tag="ABOUT US"
        subtitle="A local congregation of the Pentecostal Missionary Church of Christ (4th Watch), established to serve and make faith come alive in Pulupandan."
        variant="dark"
        bgImage="/assets/chapel.jpg"
      />

      {/* 2. Mission & Vision (2-column) */}
      <section className="py-24 bg-white border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <SectionTag theme="yellow">OUR COMPASS</SectionTag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-6 leading-tight">
                  Driven by purpose, anchored in truth.
                </h2>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7 space-y-12">
              <Reveal delay={0.3}>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                    <Compass size={20} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-navy mb-4">Our Mission</h3>
                    <p className="font-sans text-muted text-base leading-relaxed">
                      To bring the saving gospel of Jesus Christ to the municipality of Pulupandan and surrounding cities, baptizing believers in the name of the Lord Jesus Christ, and discipling all generations to live holy, set-apart lives dedicated to kingdom service.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                    <Shield size={20} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-navy mb-4">Our Vision</h3>
                    <p className="font-sans text-muted text-base leading-relaxed">
                      To see a fully transformed community in Pulupandan where families are restored, individuals operate in their spiritual callings, and a vibrant, Spirit-filled congregation stands ready in holiness for the glorious return of our Lord.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Beliefs */}
      <section className="py-24 bg-surface border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <Reveal delay={0.1}>
              <SectionTag theme="navy">WHAT WE STAND ON</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-4">
                Our Core Beliefs
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-muted text-sm leading-relaxed">
                We believe that modern faith must align exactly with the original teachings and practices established by Christ and the apostles.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beliefs.map((belief, idx) => (
              <Reveal key={belief.title} delay={idx * 0.15} yOffset={35}>
                <div className="bg-white border border-navy/10 border-t-4 border-t-yellow rounded-large p-8 md:p-10 relative overflow-hidden group shadow-premium h-full flex flex-col justify-between">
                  <span className="font-sans font-black text-6xl text-navy/5 absolute top-6 right-6 transition-all duration-300 group-hover:scale-110 group-hover:text-navy/10 select-none">
                    {belief.num}
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-sans font-bold text-xl text-navy mb-6">
                      {belief.title}
                    </h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">
                      {belief.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership */}
      <section className="py-24 bg-white border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <SectionTag theme="yellow">OUR SHEPHERDS</SectionTag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mt-6">
                  Pastoral Care & Shepherding
                </h2>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={0.3}>
                <p className="font-sans text-muted text-base leading-relaxed">
                  Our local chapter is led by dedicated pastors and leaders committed to serving the congregation and the local community of Pulupandan. From our Sunday School teachers to our outreach coordinators, our team is here to support you in your journey of faith.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="font-sans text-muted text-base leading-relaxed">
                  We believe in supportive, active leadership—anchored firmly in scripture and dedicated to ministering to families, youth, and children alike. Please feel free to reach out to any of our coordinators during services for pastoral support or guidance.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Connection */}
      <section className="py-24 bg-surface border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">GLOBAL CONNECTION</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-6">
                Part of a global movement
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-muted text-base leading-relaxed mb-10 max-w-lg">
                The Pulupandan Chapter is in active communion with the global Pentecostal Missionary Church of Christ (4th Watch) family—with churches planted across Asia, North America, Europe, and Australia.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Button
                href="https://pmcc4thwatch.org"
                variant="ghost-navy"
                className="flex items-center gap-2"
              >
                <Globe size={16} className="text-yellow" />
                <span>Visit Global Website</span>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. CTA Block */}
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
