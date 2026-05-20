"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
const cn = (...inputs: unknown[]) => inputs.filter(Boolean).join(" ");
import { Mail, Phone, MapPin, Facebook, Youtube, Heart } from "lucide-react";

// ==========================================
// 1. TEXT HOVER EFFECT (GIANT PMCC BACKDROP)
// ==========================================
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      if (svgRect.width > 0 && svgRect.height > 0) {
        const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
        
        if (!isNaN(cxPercentage) && !isNaN(cyPercentage)) {
          setMaskPosition({
            cx: `${cxPercentage}%`,
            cy: `${cyPercentage}%`,
          });
        }
      }
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        {/* Molten Luxury Gold Gradient for Hover Reveal */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#fef08a" /> {/* Yellow-200 */}
              <stop offset="25%" stopColor="#eab308" /> {/* Yellow-500 */}
              <stop offset="50%" stopColor="#f59e0b" /> {/* Amber-500 */}
              <stop offset="75%" stopColor="#d97706" /> {/* Amber-600 */}
              <stop offset="100%" stopColor="#b45309" /> {/* Amber-700 */}
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      
      {/* Background Stroke (Hidden by default, slightly visible on hover) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200/5 font-serif font-black text-8xl dark:stroke-white/5"
        style={{ opacity: hovered ? 0.3 : 0 }}
      >
        {text}
      </text>

      {/* Main Animated Stroke (Yellow/Gold Outline) */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-yellow/20 font-serif font-black text-8xl dark:stroke-yellow/15"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Interactive Molten Gold Filled Text (Revealed by Mask under Cursor) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-serif font-black text-8xl"
      >
        {text}
      </text>
    </svg>
  );
};

// ==========================================
// 2. BACKGROUND AMBIENT GRADIENT OVERLAY
// ==========================================
export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 10%, rgba(10, 17, 40, 0.4) 40%, rgba(234, 179, 8, 0.03) 100%)",
      }}
    />
  );
};

// ==========================================
// 3. MAIN COMPONENT (PMCC HOVER FOOTER)
// ==========================================
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerContainerRef = useRef<HTMLElement>(null);

  // Track scroll progress of the footer relative to screen bottom
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"],
  });


  
  // Parallax Float-up Translation of Footer Content (shifted down initially, rises to 0)
  const contentY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  interface FooterLink {
    label: string;
    href: string;
    target?: string;
    pulse?: boolean;
  }

  // Custom PMCC Links
  const footerLinks: { title: string; links: FooterLink[] }[] = [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "About Our Story", href: "/about" },
        { label: "Weekly Services", href: "/schedule" },
        { label: "Life at PMCC", href: "/gallery" },
      ],
    },
    {
      title: "Resources & News",
      links: [
        { label: "Global Announcements", href: "https://pmcc4thwatch.org", target: "_blank" },
        { label: "Watch Live Broadcasts", href: "https://www.youtube.com/@pmcc4thwatchofficial", target: "_blank", pulse: true },
        { label: "Community Chapters", href: "https://pmcc4thwatch.org", target: "_blank" },
      ],
    },
  ];

  // Chapel Contact Info
  const contactInfo = [
    {
      icon: <Mail size={16} className="text-yellow" />,
      text: "pmcc4wpulup@gmail.com",
      href: "mailto:pmcc4wpulup@gmail.com",
    },
    {
      icon: <Phone size={16} className="text-yellow" />,
      text: "+63 912 345 6789",
      href: "tel:+639123456789",
    },
    {
      icon: <MapPin size={16} className="text-yellow" />,
      text: "Pulupandan, Negros Occidental",
    },
  ];

  // Social Links
  const socialLinks = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "https://www.facebook.com/people/PMCC-4th-Watch-Pulupandan-Young-Watchers/100066300444799/" },
    { icon: <Youtube size={18} />, label: "YouTube", href: "https://www.youtube.com/@pmcc4thwatchofficial" },
  ];

  return (
    <footer 
      ref={footerContainerRef} 
      className="bg-navy relative h-fit pt-28 pb-4 mt-[-60px] rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-yellow/15 text-white/70 overflow-visible z-20"
    >

      {/* Brand & Content Container (with Parallax Float-up inside the floating card) */}
      <motion.div 
        style={{ y: contentY }}
        className="max-w-7xl mx-auto px-8 md:px-14 z-10 relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          
          {/* Brand Stack Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex flex-col group select-none">
              <span className="text-white text-2xl font-sans font-bold tracking-tight leading-none group-hover:text-yellow transition-colors duration-300">
                PMCC 4th Watch
              </span>
              <span className="text-yellow text-[10px] font-sans font-semibold tracking-widest uppercase mt-1">
                Pulupandan Chapter
              </span>
            </Link>
            <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-xs">
              Dedicated to bringing apostolic truth, passionate Spirit-filled worship, and true fellowship to the community of Pulupandan.
            </p>
            
            {/* Social media links (highly visible and cleanly aligned under branding) */}
            <div className="flex space-x-3 pt-1">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-yellow/30 hover:bg-yellow/10 text-white/50 hover:text-yellow flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Blocks */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-sans font-bold uppercase tracking-wider mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 text-xs md:text-sm">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    {link.target ? (
                      <a
                        href={link.href}
                        target={link.target}
                        rel="noopener noreferrer"
                        className="hover:text-yellow text-white/50 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-yellow text-white/50 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.pulse && (
                      <span className="absolute top-1 -right-3 w-1.5 h-1.5 rounded-full bg-yellow animate-ping"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details Block */}
          <div>
            <h4 className="text-white text-sm font-sans font-bold uppercase tracking-wider mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-xs md:text-sm">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 select-none">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/50 hover:text-yellow transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white/50">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/5 my-8" />

        {/* Footer Bottom Metadata */}
        <div className="flex flex-col items-center justify-center text-center text-xs text-white/40 pb-4 select-none w-full">
          {/* Copyright notice and Global family stamp */}
          <div className="flex flex-col md:flex-row items-center gap-3.5 text-center">
            <p>&copy; {currentYear} PMCC 4th Watch. All rights reserved.</p>
            <span className="hidden md:inline text-white/15">|</span>
            <p className="text-yellow/70 font-semibold tracking-wide flex items-center gap-1">
              <Heart size={10} className="fill-yellow text-yellow" />
              <span>Part of the global family.</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Molten Gold Text Hover Effect at Bottom */}
      <div className="lg:flex hidden h-[22rem] -mt-24 mb-0 relative z-10">
        <TextHoverEffect text="PMCC" className="w-full h-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
