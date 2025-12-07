"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const companies = [
  "Google",
  "Microsoft",
  "Spotify",
  "Amazon",
  "Apple",
  "Netflix",
  "Meta",
  "Tesla",
  "Airbnb",
  "Uber",
];

const projects = [
  {
    title: "Project 1",
    img: "/project.png",
    description:
      "A comprehensive This website is an electronic repair service platform equipped with a CMS for managing services, customers, and orders. It also supports generating printable repair receipts and integrates Midtrans for secure online payments.",
  },
  {
    title: "Project 2",
    img: "/project2.png",
    description:
      "An innovative mobile-first application focused on real-time data visualization and seamless user interaction.",
  },
  {
    title: "Project 3",
    img: "/project3.png",
    description:
      "A comprehensive school website featuring an AI chatbot, IoT RFID-based student attendance system, and an integrated online library.",
  },
  {
    title: "Project 4",
    img: "",
    description: "Upcoming",
  },
  {
    title: "Project 5",
    img: "",
    description: "Upcoming",
  },
  {
    title: "Project 6",
    img: "",
    description: "Upcoming",
  },
];

const recognitions = [
  {
    name: "Web Developer Intern",
    year: "2025",
    img: "/award1.jpg", // Updated image
    description:
      "Completed an internship focused on web development at CV Hexa Integra Mandiri, contributing to internal projects and professional workflows.",
  },
  {
    name: "Garuda Spark",
    year: "2025",
    img: "/award.jpg", // Updated image
    description:
      "Participated in the Garuda Spark training and competition, honing skills in software development and innovation.",
  },
  {
    name: "Tech Recognition",
    year: "2025",
    img: "", // Cleared image for Upcoming state
    description: "Upcoming", // Changed description to Upcoming
  },
  {
    name: "Behance Feature",
    year: "2024",
    img: "",
    description: "Upcoming",
  },
  {
    name: "Product Hunt",
    year: "2023",
    img: "",
    description: "Upcoming",
  },
  {
    name: "Community Choice",
    year: "2021",
    img: "",
    description: "Upcoming",
  },
];

export default function Home() {
  // Supabase client using provided URL and anon key
  const supabase = createClient(
    "https://dydbrokaasnezuvebpnr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZGJyb2thYXNuZXp1dmVicG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTg3MTYsImV4cCI6MjA4MDMzNDcxNn0.qIDi0-RHbIRq8mvuXzBLIn-XpXkjsEv3ikMOmKWEOj0"
  );

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedAward, setSelectedAward] = useState<{
    name: string;
    year: string;
    description: string;
    img?: string; // Add optional img property
  } | null>(null); // New state for modal

  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    img: string;
    description: string;
  } | null>(null);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    try {
      // REMOVED: Hardcoded sign-in. Ensure your Supabase 'contacts' table RLS policy allows public inserts.
      // If you must sign in, ensure the email is a valid email address, not a username.
      /*
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: "Ryan-Task", // This likely needs to be a real email like 'ryan@example.com'
        password: "/?!fu$SiRB4N4Qn",
      });
      if (signInError) throw signInError;
      */

      const { error: insertError } = await supabase
        .from("contacts")
        .insert({ name, email, message, created_at: new Date().toISOString() });

      if (insertError) throw insertError;

      // Send email notification via API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      setStatus("Message sent successfully.");
      form.reset();
    } catch (err: any) {
      setStatus(err?.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black" id="top">
      {/* Full-bleed Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full"
      >
        <div className="relative h-[450px] sm:h-[520px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover scale-100"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
          <div className="relative z-10 mx-auto max-w-7xl h-full px-6 sm:px-8 flex flex-col-reverse justify-center gap-4 sm:flex-row sm:items-center sm:justify-between pt-32 sm:pt-0">
            <div className="max-w-2xl text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                Hi, I&apos;m Aryanto Tri Nashrullah
              </h1>
              <p className="mt-3 text-zinc-100/90 text-lg">
                You can call me Ryan. I craft clean interfaces, thoughtful
                motion, and timeless neutral tones.
              </p>
            </div>
            {/* Large profile on the right */}
            <div className="block">
              <div className="relative h-32 w-32 sm:h-56 sm:w-56 rounded-full ring-4 ring-white/70 dark:ring-white/20 shadow-xl overflow-hidden mx-auto sm:mx-0">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Infinite Carousel */}
      <section className="w-full overflow-hidden bg-white py-8 border-b border-zinc-200/60 dark:bg-black dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-6 mb-6"></div>
        <div className="flex relative">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...companies, ...companies].map((company, i) => (
              <div key={i} className="flex items-center justify-center">
                <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-8 bg-white dark:bg-black">
        {/* Feature tiles: link to in-page sections */}
        <section className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Portfolio",
                href: "#work",
                cta: "View work",
                img: "/porto.jpg",
              },
              {
                title: "About Me",
                href: "#about",
                cta: "Learn more",
                img: "/about1.jpg",
              },
            ].map((t, i) => (
              <motion.a
                key={t.title}
                href={t.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 relative"
              >
                <div className="aspect-[4/3] relative bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={t.img}
                    alt={t.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-black dark:text-zinc-50">
                      {t.title}
                    </h3>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:underline">
                      {t.cta}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Story */}
        <motion.section
          id="story"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
            Watch my story
          </h2>
          <div className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-video relative">
            <Image
              src="/story1.jpg"
              alt="My Story"
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            A short reel about process, craft, and attention to detail.
          </p>
        </motion.section>

        {/* Expertise */}
        <section
          id="expertise"
          className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-8">
            Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                t: "Interface Design",
                d: "Systems, layouts, and visual polish.",
              },
              { t: "Interaction", d: "Micro‑animations and smooth flows." },
              { t: "Performance", d: "Fast, accessible, and stable builds." },
              { t: "Delivery", d: "Clean code, docs, and handoff." },
            ].map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4"
              >
                <p className="text-lg font-medium text-black dark:text-zinc-50">
                  {s.t}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-8">
            Education
          </h2>
          <div className="space-y-8">
            {[
              {
                school: "SMKN 2 Buduran Sidoarjo",
                degree: "Software Engineering (RPL)",
                year: "2023 - 2026",
                desc: "Vocational high school focused on practical software development skills, including web programming, database management, and object-oriented programming.",
              },
              {
                school: "SMPN 2 Sidoarjo",
                degree: "Junior High School",
                year: "2020 - 2023",
                desc: "A reputable public school in Sidoarjo known for its strong academic curriculum and emphasis on character building and discipline.",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="max-w-xl">
                  <h3 className="text-lg font-medium text-black dark:text-zinc-50">
                    {edu.school}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                    {edu.desc}
                  </p>
                </div>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                  {edu.year}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                role: "Web Developer (Freelance Team)",
                company: "Heptabyte",
                year: "2025 - Present",
                desc: "Collaborating with the Heptabyte team to deliver custom web solutions for various clients. Managing projects from concept to deployment using modern web technologies.",
              },
              {
                role: "Web Developer Intern",
                company: "CV Hexa Integra Mandiri",
                year: "2025",
                desc: "Completed an internship focused on web development, contributing to internal projects and gaining practical experience in professional software development workflows.",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="max-w-xl">
                  <h3 className="text-lg font-medium text-black dark:text-zinc-50">
                    {exp.role}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                    {exp.desc}
                  </p>
                </div>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                  {exp.year}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio gallery */}
        <section
          id="work"
          className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 cursor-pointer"
              >
                <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
                  {project.img ? (
                    <>
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {project.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-500"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="aspect-video relative w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-6 overflow-hidden">
                  <Image
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Awards */}
        <motion.section
          id="awards"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-8">
            Award Winning
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Highlighted Award - Made Clickable */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSelectedAward({
                  name: "JHIC 2025",
                  year: "2025",
                  img: "/project3.png", // Added image for detail view
                  description:
                    "A prestigious national-level competition organized by Jagoan Cloud and Komdigi. Our team competed against over 300 teams to develop an innovative, cloud-based school website. This achievement was highlighted in national media outlets like Radar Jatim and Antara News.",
                })
              }
              className="relative group overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/project3.png"
                  alt="JHIC 2025"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-medium text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                    National Competition
                  </span>
                  <h3 className="text-2xl font-bold text-white">JHIC 2025</h3>
                  <p className="mt-2 text-zinc-200 text-sm max-w-md">
                    National web competition by Jagoan Cloud & Komdigi. 300+
                    teams competed to build the best cloud-based school website.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Other Awards List */}
            <div className="flex flex-col justify-center gap-6">
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                Recognized by organizers and national media for innovation in
                school website development.
              </p>
              {[
                {
                  title: "Jagoan Cloud",
                  award: "Organizer",
                  year: "2025",
                  description:
                    "Cloud hosting provider and competition organizer.",
                },
                {
                  title: "Komdigi",
                  award: "Organizer",
                  year: "2025",
                  description: "Ministry of Communication and Digital Affairs.",
                },
                {
                  title: "Radar Jatim",
                  award: "Media Coverage",
                  year: "2025",
                  description: "Featured in regional news coverage.",
                },
                {
                  title: "Antara News",
                  award: "Media Coverage",
                  year: "2025",
                  description: "Featured in national news coverage.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setSelectedAward({
                      name: item.title,
                      year: item.year,
                      description: item.description,
                    })
                  }
                  className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 p-2 rounded-lg transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-black dark:text-zinc-50">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {item.award}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-zinc-400">
                    {item.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Awards & Recognitions */}
        <section className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
            Awards & Recognitions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recognitions.map((a, i) => (
              <motion.div
                key={`${a.name}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedAward(a)} // Set selected award on click
                className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-3 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800 mb-2 overflow-hidden rounded-md">
                  {a.img ? (
                    <Image
                      src={a.img}
                      alt={a.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-black dark:text-zinc-50">
                  {a.img ? a.name : "Upcoming"}
                </p>
                <p className="text-xs text-zinc-700 dark:text-zinc-300">
                  {a.img ? a.year : "Soon"}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Award Detail Modal */}
        <AnimatePresence>
          {selectedAward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAward(null)}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setSelectedAward(null)}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-500"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Description & Date */}
                  <div className="flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-full w-fit">
                      {selectedAward.year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
                      {selectedAward.name}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
                      {selectedAward.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Awarded for excellence in design and implementation.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Image Preview */}
                  <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden relative">
                    {selectedAward.img ? (
                      <Image
                        src={selectedAward.img}
                        alt={selectedAward.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-400 dark:text-zinc-600">
                        <span className="text-sm">No Preview Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About */}
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="py-16 border-b border-zinc-200/60 dark:border-zinc-800/80"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
            About Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
              <Image
                src="/design.png"
                alt="Design"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
              <Image
                src="/toolkit.png"
                alt="Toolkit"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-video rounded-xl bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
              <Image
                src="/collaborate.jpg"
                alt="Collaborate"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <p className="text-zinc-700 dark:text-zinc-300">
              I value clarity, performance, and small details that make
              interfaces feel effortless.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              My toolkit: Next.js, React, TypeScript, Tailwind, and modern
              workflows.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              I collaborate closely and iterate quickly to reach a refined
              outcome.
            </p>
          </div>
        </motion.section>

        {/* Contact Us (Supabase) - Centered */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="py-16 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
            Contact Us
          </h2>
          <form
            onSubmit={handleContactSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="h-11 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-zinc-800 dark:text-zinc-200"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="h-11 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-zinc-800 dark:text-zinc-200"
            />
            <textarea
              name="message"
              required
              placeholder="Your message"
              className="sm:col-span-2 min-h-[120px] rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200"
            />
            <button
              type="submit"
              disabled={submitting}
              className="sm:col-span-2 inline-flex h-11 items-center justify-center rounded-full bg-black text-white dark:bg-zinc-100 dark:text-black px-5 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send"}
            </button>
          </form>
          {status && (
            <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
              {status}
            </p>
          )}
        </motion.section>
      </main>
    </div>
  );
}
