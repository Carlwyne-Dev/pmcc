"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import SectionTag from "@/components/SectionTag";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API call for V1 (e.g., Formspree or Resend mock)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* 1. Page Hero */}
      <PageHero
        title="Get in touch"
        tag="CONTACT US"
        subtitle="Have questions? Want to connect with our local ministry? We would love to hear from you."
        variant="dark"
      />

      {/* 2. Contact Grid Dashboard */}
      <section className="py-24 bg-white border-b border-navy/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column (Contact Details) */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <Reveal delay={0.1}>
                  <SectionTag theme="yellow">CONNECT LOCALLY</SectionTag>
                </Reveal>
                <Reveal delay={0.2}>
                  <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-6">
                    Connect With Our Chapter
                  </h2>
                </Reveal>
                <Reveal delay={0.3}>
                  <p className="font-sans text-muted text-sm leading-relaxed">
                    Reach out directly to our local ministers or visit one of our services. We are here to support you in your spiritual walk.
                  </p>
                </Reveal>
              </div>

              {/* Info Items List */}
              <div className="space-y-6">
                <Reveal delay={0.4}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                      <MapPin size={18} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-navy mb-1">
                        Church Location
                      </h4>
                      <p className="font-sans text-xs text-muted leading-relaxed">
                        Pulupandan, Negros Occidental, Philippines
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                      <Phone size={18} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-navy mb-1">
                        Phone Number
                      </h4>
                      <p className="font-sans text-xs text-muted">
                        +63 917 123 4567
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.6}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                      <Mail size={18} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-navy mb-1">
                        Email Address
                      </h4>
                      <p className="font-sans text-xs text-muted">
                        pulupandan@pmcc4thwatch.org
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.7}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-small bg-surface flex items-center justify-center shrink-0 border border-navy/5">
                      <Clock size={18} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-navy mb-1">
                        Weekly Worship
                      </h4>
                      <p className="font-sans text-xs text-muted leading-relaxed">
                        Sundays • 8:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Social Connect Link */}
              <Reveal delay={0.8}>
                <div className="border-t border-navy/10 pt-8">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans font-bold text-xs tracking-wider uppercase text-navy hover:text-yellow transition-colors duration-300"
                  >
                    <Facebook size={16} className="text-yellow" />
                    <span>PMCC 4th Watch Pulupandan</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column (Contact Form) */}
            <div className="lg:col-span-7 bg-surface rounded-large border border-navy/5 p-8 md:p-12 shadow-premium">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-sans font-bold text-2xl text-navy mb-2">
                        Send a Message
                      </h3>
                      <p className="font-sans text-xs text-muted">
                        Fill out the form below and we will respond as soon as possible.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="font-sans font-bold text-xs text-navy uppercase tracking-wide"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full bg-white border border-navy/10 rounded-md py-3 px-4 text-sm font-sans focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all duration-300"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="font-sans font-bold text-xs text-navy uppercase tracking-wide"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          className="w-full bg-white border border-navy/10 rounded-md py-3 px-4 text-sm font-sans focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="font-sans font-bold text-xs text-navy uppercase tracking-wide"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        className="w-full bg-white border border-navy/10 rounded-md py-3 px-4 text-sm font-sans focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all duration-300 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      className="w-full py-4 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 flex flex-col items-center gap-6"
                  >
                    <div className="w-16 h-16 bg-yellow/10 rounded-full flex items-center justify-center text-yellow">
                      <CheckCircle size={40} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-3xl text-navy mb-3">
                        Thank you!
                      </h3>
                      <p className="font-sans text-muted text-base leading-relaxed max-w-sm mx-auto">
                        Your message has been sent successfully. One of our local ministers will get in touch with you shortly.
                      </p>
                    </div>
                    <Button onClick={() => setSubmitted(false)} variant="ghost-navy">
                      Send another message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Google Maps Embed Placeholder */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 text-center">
            <Reveal delay={0.1}>
              <SectionTag theme="yellow">MAP LOCATION</SectionTag>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-navy mb-4">
                Find Our Chapel
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="w-full aspect-[21/9] rounded-large overflow-hidden shadow-premium border border-navy/10 relative bg-surface">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.434443729906!2d122.78201245000001!3d10.511317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aec0eb48dc46ab%3A0x86134b2210874e4c!2sPulupandan%2C%20Negros%20Occidental!5e0!3m2!1sen!2sph!4v1716000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
