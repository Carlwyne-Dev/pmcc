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
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError("Email service configuration is missing. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables.");
      setLoading(false);
      return;
    }

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Please verify your EmailJS keys.");
      }
    } catch (err: any) {
      setError(err?.text || "An unexpected error occurred while sending the email. Please verify your keys.");
    } finally {
      setLoading(false);
    }
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
        bgImage="/assets/pmcc.png"
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
                        <a href="mailto:pmcc4wpulup@gmail.com" className="hover:text-navy transition-colors">
                          pmcc4wpulup@gmail.com
                        </a>
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
                    href="https://www.facebook.com/people/PMCC-4th-Watch-Pulupandan-Young-Watchers/100066300444799/"
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

                    {error && (
                      <div className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-md p-3.5 font-sans">
                        {error}
                      </div>
                    )}

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
                src="https://maps.google.com/maps?q=PMCC%204th%20Watch%20Pulupandan,%20Negros%20Occidental&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
