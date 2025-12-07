"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" } // Adjusted margin
    );

    const sections = document.querySelectorAll("section[id], div[id='top']");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Reordered links: Expertise -> Work -> About
  const navLinks = [
    { label: "Expertise", href: "#expertise" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav className="pointer-events-auto flex h-12 items-center gap-1 rounded-full border border-zinc-200/60 bg-white/80 px-2 shadow-lg shadow-zinc-800/5 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/80">
        <a
          href="#top"
          onClick={() => handleLinkClick("top")}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            activeSection === "top"
              ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
              : "text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          Ryan
        </a>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {navLinks.map((link) => {
          const sectionId = link.href.substring(1);
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(sectionId)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive
                  ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
              }`}
            >
              {link.label}
            </a>
          );
        })}

        <a
          href="#contact"
          onClick={() => handleLinkClick("contact")}
          className={`ml-1 rounded-full px-5 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
            activeSection === "contact"
              ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black ring-2 ring-zinc-300 dark:ring-zinc-700"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
