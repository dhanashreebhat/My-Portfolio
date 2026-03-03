import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Zap,
  Briefcase,
  Camera,
  Gamepad,
  Download,
  Cpu,
  Search,
  ExternalLink,
  PenTool,
  User,
  MapPin,
  GraduationCap,
  Plane,
  Tv,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* =========================
   Constants (no UI change)
========================= */
const LINKS = {
  email: "dhanashreebhat10@gmail.com",
  github: "https://github.com/dhanashreebhat",
  linkedin: "http://linkedin.com/in/dhanashree-bhat",
  cv: "docs/DhanashreeBhat_CV.pdf",
};

/* =========================
   Motion Helpers
========================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* =========================
   Tech Icons (SVG)
========================= */
const TechIcons = {
  React: () => (
    <svg
      viewBox="-11.5 -10.23174 23 20.46348"
      className="w-6 h-6 fill-cyan-400"
    >
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  JS: () => (
    <svg viewBox="0 0 630 630" className="w-6 h-6 fill-yellow-400">
      <path d="m423.2 492.19c12.69 20.72 29.2 35.92 58.4 35.92 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.39-38.1-25.39-17.34 0-28.33 9.3-28.33 21.1 0 16.5 10.15 23.26 36.37 34.68l14.8 6.34c50.33 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.5z" />
      <path d="m165.32 492.19c11 19.03 26.2 32.54 48.2 32.54 21.1 0 33.83-10.57 33.83-36.37v-213.1h53.7v214c0 52.87-31.3 77.8-86.7 77.8-48.2 0-81.2-24.53-94.7-55.4z" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-sky-400">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Node: () => (
    <svg viewBox="0 0 448 512" className="w-6 h-6 fill-green-500">
      <path d="M224 48l-176 101.6v203.2l176 101.6 176-101.6v-203.2l-176-101.6zm144 286.2l-144 83.1-144-83.1v-166.3l144-83.1 144 83.1v166.3z" />
    </svg>
  ),
  SQL: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path
        fill="#60A5FA"
        d="M12 3c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3Zm9 6v4c0 1.66-4.03 3-9 3s-9-1.34-9-3V9c1.94 1.5 6 2 9 2s7.06-.5 9-2Zm0 7v4c0 1.66-4.03 3-9 3s-9-1.34-9-3v-4c1.94 1.5 6 2 9 2s7.06-.5 9-2Z"
      />
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path
        fill="#14B8A6"
        d="M12 2 14.4 7.6 20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2Z"
        opacity="0.95"
      />
      <circle cx="12" cy="10" r="1.2" fill="#042f2e" />
      <path
        d="M9.5 13c.7.8 1.5 1.2 2.5 1.2s1.8-.4 2.5-1.2"
        stroke="#042f2e"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
};

/* =========================
   Extra Tech Logos (SVG)
========================= */
const ExtraTechIcons = {
  HTML: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path fill="#E44D26" d="M19 3l9.3 104.8L64 125l35.7-17.2L109 3H19z" />
      <path fill="#F16529" d="M64 117V11h36.5L92 107.2 64 117z" />
      <path
        fill="#EBEBEB"
        d="M64 52.2H45.4l-1.3-14.8H64V23.4H28.9l.3 3.5 3.4 38.1H64V52.2z"
      />
      <path
        fill="#EBEBEB"
        d="M64 88.2l-.1.1-15.6-7.5-1-11.5H33.6l1.9 21.5L64 104.3V88.2z"
      />
      <path
        fill="#fff"
        d="M63.9 52.2V65H81.1l-1.6 15.7-15.6 7.5V104l28.5-13.3.2-2 3.3-37.1.3-3.5H63.9z"
      />
      <path fill="#fff" d="M63.9 23.4v14H97l.3-3.5.7-7.5.3-3H63.9z" />
    </svg>
  ),
  CSS: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path fill="#1572B6" d="M19 3l9.3 104.8L64 125l35.7-17.2L109 3H19z" />
      <path fill="#33A9DC" d="M64 117V11h36.5L92 107.2 64 117z" />
      <path
        fill="#fff"
        d="M64 52.2H81.3l1.2-14.8H64V23.4h34.7l-.3 3.5-3.4 38.1H64V52.2z"
      />
      <path
        fill="#EBEBEB"
        d="M64 52.2V65H48.9l1.4 15.7 13.7 7.5V104L35.5 90.7l-.2-2-1.8-19.4H47l1 11.5 16 7.5V88.2l-.1-.1-15.6-7.5-3.3-37.2-.3-3.5H64v14.3z"
      />
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path fill="#3178C6" d="M1 1h126v126H1z" />
      <path
        fill="#fff"
        d="M72.4 92.7c2.7 4.4 6.2 7.7 12.4 7.7 5.2 0 8.5-2.6 8.5-6.2 0-4.3-3.4-5.8-9.2-8.3l-3.1-1.3c-8.9-3.8-14.8-8.6-14.8-18.7 0-9.3 7.1-16.4 18.1-16.4 7.9 0 13.5 2.7 17.6 9.9l-9.6 6.2c-2.1-3.8-4.4-5.3-8-5.3-3.6 0-5.9 2.3-5.9 4.4 0 3.4 2.1 4.8 7.6 7.1l3.1 1.3c10.6 4.5 16.5 9.1 16.5 19.5 0 11.2-8.8 17.3-20.5 17.3-11.5 0-18.9-5.5-22.5-12.7l9.8-5.5zM55 50.6H21.8v11h11.2v49.7H44V61.6H55v-11z"
      />
    </svg>
  ),

  React: TechIcons.React,
  JavaScript: TechIcons.JS,
  Tailwind: TechIcons.Tailwind,
  Node: TechIcons.Node,
  SQL: TechIcons.SQL,

  Python: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        fill="#3776AB"
        d="M63.9 6c-30 0-28.1 13-28.1 13l.1 13.5h28.6v4.1H24.6S6 47.6 6 74.2c0 26.6 16.2 25.7 16.2 25.7h9.7V85.9s-.5-16.2 15.9-16.2h27.3s15.3.2 15.3-14.8V20.8S92.2 6 63.9 6zm-15.8 9.1c2.9 0 5.3 2.3 5.3 5.2s-2.4 5.2-5.3 5.2-5.3-2.3-5.3-5.2 2.4-5.2 5.3-5.2z"
      />
      <path
        fill="#FFD43B"
        d="M64.1 122c30 0 28.1-13 28.1-13l-.1-13.5H63.5v-4.1h39.9s18.6 2.2 18.6-24.5c0-26.6-16.2-25.7-16.2-25.7h-9.7v14.1s.5 16.2-15.9 16.2H52.9S37.6 71.3 37.6 86.3v34.9S35.8 122 64.1 122zm15.8-9.1c-2.9 0-5.3-2.3-5.3-5.2s2.4-5.2 5.3-5.2 5.3 2.3 5.3 5.2-2.4 5.2-5.3 5.2z"
      />
    </svg>
  ),

  Pandas: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path fill="#150458" d="M58 28h22v200H58zM176 28h22v200h-22z" />
      <path
        fill="#150458"
        d="M106 72h22v156h-22zM128 28h22v156h-22z"
        opacity="0.85"
      />
    </svg>
  ),

  ScikitLearn: () => (
    <div className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/25 flex items-center justify-center">
      <span className="text-[10px] font-black text-orange-200">sk</span>
    </div>
  ),
  Tkinter: () => (
    <div className="w-7 h-7 rounded-md bg-slate-300/10 border border-slate-300/25 flex items-center justify-center">
      <span className="text-[10px] font-black text-slate-200">TK</span>
    </div>
  ),
  TTKBootstrap: () => (
    <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
      <span className="text-[9px] font-black text-indigo-200">ttk</span>
    </div>
  ),

  Jest: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path
        fill="#C21325"
        d="M126 22c-26 0-47 21-47 47v46c0 26 21 47 47 47s47-21 47-47V69c0-26-21-47-47-47z"
      />
      <path
        fill="#fff"
        d="M104 72h44v12h-44zM104 98h44v12h-44z"
        opacity="0.9"
      />
      <path
        fill="#C21325"
        d="M68 160c-18 0-32 14-32 32s14 32 32 32h116c18 0 32-14 32-32s-14-32-32-32H68z"
        opacity="0.85"
      />
    </svg>
  ),

  Liquid: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path
        fill="#7AB55C"
        d="M128 18C78 72 58 104 58 142c0 38 31 69 70 69s70-31 70-69c0-38-20-70-70-124z"
      />
      <path
        fill="#fff"
        d="M108 170c6 10 16 16 28 16 11 0 22-6 28-16-9 6-18 9-28 9-11 0-20-3-28-9z"
        opacity="0.85"
      />
    </svg>
  ),

  ChatGPT: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path
        fill="#10B981"
        d="M12 2.3a4.7 4.7 0 0 1 4.6 3.6 4.7 4.7 0 0 1 3.1 5.8 4.7 4.7 0 0 1-2.1 6.2A4.7 4.7 0 0 1 12 21.7a4.7 4.7 0 0 1-4.6-3.6 4.7 4.7 0 0 1-3.1-5.8 4.7 4.7 0 0 1 2.1-6.2A4.7 4.7 0 0 1 12 2.3Z"
        opacity="0.9"
      />
      <path
        fill="#064E3B"
        d="M12 6.2c2.1 0 3.8 1.7 3.8 3.8S14.1 13.8 12 13.8 8.2 12.1 8.2 10 9.9 6.2 12 6.2Z"
        opacity="0.35"
      />
    </svg>
  ),

  Gemini: TechIcons.AI,

  GitHub: () => <Github className="w-7 h-7 text-slate-200" />,

  Copilot: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-200">
      <path
        fill="currentColor"
        d="M12 2.5c3.2 0 5.8 2 5.8 4.6 0 1.2-.6 2.4-1.5 3.2.9.8 1.5 2 1.5 3.2 0 2.6-2.6 4.6-5.8 4.6S6.2 19.5 6.2 17c0-1.2.6-2.4 1.5-3.2-.9-.8-1.5-2-1.5-3.2 0-2.6 2.6-4.6 5.8-4.6Zm0 2c-2.2 0-3.8 1.2-3.8 2.6 0 .9.6 1.8 1.5 2.2.3.1.5.4.5.7s-.2.6-.5.7c-.9.4-1.5 1.3-1.5 2.2 0 1.4 1.6 2.6 3.8 2.6s3.8-1.2 3.8-2.6c0-.9-.6-1.8-1.5-2.2-.3-.1-.5-.4-.5-.7s.2-.6.5-.7c.9-.4 1.5-1.3 1.5-2.2 0-1.4-1.6-2.6-3.8-2.6Z"
        opacity="0.9"
      />
      <circle cx="9.2" cy="11.8" r="1" fill="#0f172a" />
      <circle cx="14.8" cy="11.8" r="1" fill="#0f172a" />
    </svg>
  ),

  Figma: () => (
    <svg viewBox="0 0 38 58" className="w-6 h-6">
      <path
        d="M19 19c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"
        fill="#F24E1E"
      />
      <path
        d="M9 29c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z"
        fill="#A259FF"
      />
      <path
        d="M9 48.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V39h-8.5c-4.694 0-8.5 3.806-8.5 8.5z"
        fill="#1ABCFE"
      />
      <path
        d="M28 29c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z"
        fill="#0ACF83"
        transform="translate(-9)"
      />
      <path d="M0 10c0 4.97 4.03 9 9 9V1c-4.97 0-9 4.03-9 9z" fill="#FF7262" />
    </svg>
  ),

  Canva: () => (
    <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/25 flex items-center justify-center">
      <span className="text-[10px] font-black text-sky-200">Ca</span>
    </div>
  ),

  Excel: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path fill="#107C41" d="M40 44h120v168H40z" />
      <path fill="#185C37" d="M160 60h56v136h-56z" />
      <path
        fill="#fff"
        d="M72 92h24l16 28 16-28h24l-28 44 28 44h-24l-16-28-16 28H72l28-44-28-44z"
      />
    </svg>
  ),

  PowerPoint: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path fill="#D24726" d="M40 44h120v168H40z" />
      <path fill="#B33A1F" d="M160 60h56v136h-56z" />
      <path
        fill="#fff"
        d="M78 92h44c20 0 34 12 34 32s-14 32-34 32h-18v32H78V92zm26 24v16h16c6 0 10-3 10-8s-4-8-10-8h-16z"
      />
    </svg>
  ),

  Word: () => (
    <svg viewBox="0 0 256 256" className="w-7 h-7">
      <path fill="#185ABD" d="M40 44h120v168H40z" />
      <path fill="#0F4C81" d="M160 60h56v136h-56z" />
      <path
        fill="#fff"
        d="M76 96h22l10 52 12-52h18l12 52 10-52h22l-20 96h-22l-12-50-12 50H96L76 96z"
      />
    </svg>
  ),

  SEO: () => <Search className="w-7 h-7 text-amber-300" />,
  PageSpeed: () => <Cpu className="w-7 h-7 text-cyan-300" />,
};

const HOBBIES = [
  { name: "Travelling", icon: Plane, color: "text-sky-400" },
  { name: "Watching Anime", icon: Tv, color: "text-violet-400" },
  { name: "Doodling", icon: PenTool, color: "text-rose-400" },
  { name: "Gaming", icon: Gamepad, color: "text-cyan-400" },
  { name: "Photography", icon: Camera, color: "text-amber-400" },
  { name: "Modeling", icon: User, color: "text-emerald-400" },
];

const EXPERIENCE = [
  {
    role: "Associate Front-End Developer",
    company: "SCLERAVDMS PRIVATE LIMITED",
    period: "2024 - 2025",
    desc: "Developed dynamic React.js websites, integrated RESTful APIs (+30% functionality), and reduced code issues by 30% using SonarLint.",
    bullets: [
      "Developed dynamic, responsive user interfaces using React.js.",
      "Integrated RESTful APIs to enhance application functionality (reported +30%).",
      "Improved code quality and reduced issues using SonarLint (reported ~30%).",
      "Implemented SEO-friendly structure and on-page best practices (semantic HTML, meta tags, performance-oriented UI).",
      "Built smooth UI interactions and micro-animations using Framer Motion to improve user experience.",
      "Collaborated on UI fixes, component updates, and feature enhancements.",
    ],
    tech: [
      "React",
      "JavaScript",
      "REST APIs",
      "SonarLint",
      "SEO",
      "Framer Motion",
    ],
  },
  {
    role: "Jr. Front-End Developer",
    company: "Access Research Labs",
    period: "2023 - 2024",
    desc: "Designed mobile-first layouts with 90%+ compatibility and increased user interaction by 20% through custom CSS animations.",
    bullets: [
      "Designed mobile-first layouts with strong cross-device compatibility (90%+).",
      "Built responsive UI components using HTML, CSS and JavaScript.",
      "Created custom CSS animations to improve user interaction (reported +20%).",
      "Improved website structure using semantic HTML and accessibility-friendly patterns.",
      "Optimised page performance through cleaner CSS, reduced DOM complexity, and reusable UI blocks.",
      "Collaborated with stakeholders to implement UI updates and ensure consistent design across pages.",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive UI",
      "Accessibility",
      "Performance",
    ],
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. Industrial Engineering & Int. Management",
    school: "Hochschule Fresenius",
    location: "Köln, Germany",
    period: "2025 - Present",
  },
  {
    degree: "B.E in Computer Science & Engineering",
    school: "Canara Engineering College (VTU)",
    location: "Mangalore, India",
    period: "2019 - 2023",
  },
];

const PROJECTS = [
  {
    title: "Universal Song Recommender",
    description:
      "A content-based music recommendation desktop application built in Python using audio feature normalization and cosine similarity, integrated with external REST APIs for media retrieval and preview streaming.",
    tech: [
      "Python 3, Tkinter, ttkbootstrap, pandas, scikit-learn, fuzzy matching (difflib), iTunes Search API.",
    ],
    link: LINKS.github + "/Universal-Song-Recommender",
  },
  {
    title: "Maze-Path-Finder-Challenge",
    description:
      "JavaScript challenge project implementing path-finding logic and algorithmic problem solving.",
    tech: ["TypeScript, CSS, Jest"],
    link: LINKS.github + "/Maze-Path-Finder-Challenge",
  },
  {
    title: "Gym-managment-System",
    description:
      "HTML-based gym management system interface project with structured pages and form-driven layout.",
    tech: ["HTML, CSS, JavaScript"],
    link: LINKS.github + "/Gym-managment-System",
  },
  {
    title: "Nuncio-WebApplication",
    description:
      "HTML web application project showcasing foundational page structuring and front-end implementation.",
    tech: ["HTML"],
    link: LINKS.github + "/Nuncio-WebApplication",
  },
];

/* =========================
   Tech Stack Sections
========================= */
const TECH_SECTIONS = [
  {
    title: "Front-End",
    subtitle: "UI, languages & motion",
    items: [
      {
        name: "HTML",
        icon: "HTML",
        ring: "ring-orange-500/25",
        bg: "bg-orange-500/10",
      },
      {
        name: "CSS",
        icon: "CSS",
        ring: "ring-sky-500/25",
        bg: "bg-sky-500/10",
      },
      {
        name: "Tailwind CSS",
        icon: "Tailwind",
        ring: "ring-cyan-500/25",
        bg: "bg-cyan-500/10",
      },
      {
        name: "TypeScript",
        icon: "TypeScript",
        ring: "ring-blue-500/25",
        bg: "bg-blue-500/10",
      },
      {
        name: "JavaScript",
        icon: "JavaScript",
        ring: "ring-yellow-500/25",
        bg: "bg-yellow-500/10",
      },
      {
        name: "React",
        icon: "React",
        ring: "ring-indigo-500/25",
        bg: "bg-indigo-500/10",
      },
      {
        name: "Framer Motion",
        icon: null,
        ring: "ring-fuchsia-500/25",
        bg: "bg-fuchsia-500/10",
      },
      {
        name: "Liquid",
        icon: "Liquid",
        ring: "ring-emerald-500/20",
        bg: "bg-emerald-500/10",
      },
    ],
  },
  {
    title: "Back-End / Data / Testing",
    subtitle: "APIs, DB, testing & analysis",
    items: [
      {
        name: "Node.js",
        icon: "Node",
        ring: "ring-green-500/25",
        bg: "bg-green-500/10",
      },
      {
        name: "SQL",
        icon: "SQL",
        ring: "ring-blue-400/20",
        bg: "bg-blue-500/10",
      },
      {
        name: "Python",
        icon: "Python",
        ring: "ring-yellow-400/20",
        bg: "bg-yellow-500/10",
      },
      {
        name: "Pandas",
        icon: "Pandas",
        ring: "ring-violet-500/20",
        bg: "bg-violet-500/10",
      },
      {
        name: "scikit-learn",
        icon: "ScikitLearn",
        ring: "ring-orange-500/20",
        bg: "bg-orange-500/10",
      },
      {
        name: "Tkinter",
        icon: "Tkinter",
        ring: "ring-slate-300/15",
        bg: "bg-slate-300/10",
      },
      {
        name: "ttkbootstrap",
        icon: "TTKBootstrap",
        ring: "ring-indigo-500/20",
        bg: "bg-indigo-500/10",
      },
      {
        name: "Jest",
        icon: "Jest",
        ring: "ring-rose-500/25",
        bg: "bg-rose-500/10",
      },
    ],
  },
  {
    title: "Tools / Office / Optimisation",
    subtitle: "AI, productivity & design",
    items: [
      {
        name: "ChatGPT",
        icon: "ChatGPT",
        ring: "ring-emerald-500/20",
        bg: "bg-emerald-500/10",
      },
      {
        name: "Gemini",
        icon: "Gemini",
        ring: "ring-teal-500/20",
        bg: "bg-teal-500/10",
      },
      {
        name: "GitHub",
        icon: "GitHub",
        ring: "ring-slate-300/15",
        bg: "bg-slate-300/10",
      },
      {
        name: "Copilot",
        icon: "Copilot",
        ring: "ring-slate-300/15",
        bg: "bg-slate-300/10",
      },
      {
        name: "Excel",
        icon: "Excel",
        ring: "ring-emerald-500/20",
        bg: "bg-emerald-500/10",
      },
      {
        name: "PowerPoint",
        icon: "PowerPoint",
        ring: "ring-orange-500/20",
        bg: "bg-orange-500/10",
      },
      {
        name: "Word",
        icon: "Word",
        ring: "ring-sky-500/20",
        bg: "bg-sky-500/10",
      },
      {
        name: "Figma",
        icon: "Figma",
        ring: "ring-pink-500/20",
        bg: "bg-pink-500/10",
      },
      {
        name: "Canva",
        icon: "Canva",
        ring: "ring-sky-500/20",
        bg: "bg-sky-500/10",
      },
      {
        name: "SEO",
        icon: "SEO",
        ring: "ring-amber-500/25",
        bg: "bg-amber-500/10",
      },
      {
        name: "Google PageSpeed Insights",
        icon: "PageSpeed",
        ring: "ring-cyan-500/20",
        bg: "bg-cyan-500/10",
      },
    ],
  },
];

/* =========================
   Components (same output)
========================= */
function Navbar({ scrolled }) {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#top"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Dee Bee.
        </a>

        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#skills" className="hover:text-indigo-400 transition-colors">
            Skills
          </a>
          <a
            href="#experience"
            className="hover:text-indigo-400 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="hover:text-indigo-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#hobbies"
            className="hover:text-indigo-400 transition-colors"
          >
            Hobbies
          </a>
          <a
            href={`mailto:${LINKS.email}?subject=Portfolio%20Contact`}
            className="text-indigo-400"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function TechStackBubbles() {
  return (
    <section
      id="skills"
      className="py-24 bg-slate-900/30 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {TECH_SECTIONS.map((sec, sIdx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.08 }}
              className="relative rounded-[2.5rem] border border-slate-800 bg-slate-950/40 overflow-hidden p-6"
            >
              <div className="text-left mb-5">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{sec.subtitle}</p>
              </div>

              <div className="relative rounded-[2rem] border border-slate-800/80 bg-slate-950/30 overflow-hidden p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.08),transparent_55%)]" />

                <div className="relative flex flex-wrap justify-center gap-4">
                  {sec.items.map((s, i) => {
                    const floatY = 6 + (i % 4) * 2;
                    const rotate = i % 2 === 0 ? 1 : -1;
                    const duration = 3.2 + (i % 5) * 0.35;

                    const IconComp =
                      s.icon && ExtraTechIcons[s.icon]
                        ? ExtraTechIcons[s.icon]
                        : null;

                    return (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.95, y: 6 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.35 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -floatY, 0],
                            rotate: [0, rotate, 0],
                          }}
                          transition={{
                            duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          whileHover={{ scale: 1.05, y: -floatY - 4 }}
                          className={[
                            "inline-flex items-center gap-3 px-4 py-3 rounded-full",
                            "bg-slate-900/70 backdrop-blur border border-slate-800",
                            "shadow-lg shadow-slate-950/50",
                            "ring-1",
                            s.ring,
                            s.bg,
                          ].join(" ")}
                          title={s.name}
                        >
                          <span className="shrink-0">
                            {IconComp ? (
                              <IconComp />
                            ) : (
                              <Zap size={22} className="text-fuchsia-300" />
                            )}
                          </span>
                          <span className="text-xs font-bold text-slate-200 whitespace-nowrap">
                            {s.name}
                          </span>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   App (refactored, same UI)
========================= */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter
  const roles = useMemo(() => ["Front-End Developer", "Web Developer"], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Experience accordion
  const [openExpIndex, setOpenExpIndex] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Scroll + mouse listeners (same output; mouse uses rAF to reduce work)
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const handleMouseMove = (e) => {
      if (rafRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x, y });
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 90;
    const pauseTime = 1200;

    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, displayText.length - 1)
          : currentRole.slice(0, displayText.length + 1);
        setDisplayText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <div
      id="top"
      className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-x-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 origin-left z-[100]"
      />

      {/* Mouse Spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.10), transparent 70%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.08 }}
      />

      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="relative mb-10 group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-[2.8rem] border border-indigo-500/20 border-dashed"
            />

            <div className="relative w-52 h-72 md:w-72 md:h-[26rem] rounded-[2rem] overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="docs\headshot.jpeg"
                alt="Dhanashree Bhat"
                className="w-full h-full object-cover object-[50%_8%] scale-[1.02] contrast-105 brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              custom={1}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-8"
            >
              <MapPin size={12} /> Based in Germany
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={2}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
            >
              Dhanashree{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Bhat
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-lg md:text-2xl text-slate-300 mb-4 max-w-2xl mx-auto font-light leading-relaxed"
            >
              <span className="text-slate-400">I am a </span>
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent font-semibold">
                {displayText}
              </span>
              <span className="inline-block w-[2px] h-5 md:h-7 bg-cyan-400 ml-1 align-middle animate-pulse" />
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={4}
              className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            >
              I build clean, responsive, and user-friendly websites with modern
              front-end technologies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={5}
              className="flex flex-wrap justify-center gap-3"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={LINKS.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <ExternalLink size={18} />
                View CV
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={LINKS.cv}
                download="docs/DhanashreeBhat_CV.pdf"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Download size={18} />
                Download CV
              </motion.a>

              <div className="flex gap-2">
                <motion.a
                  whileHover={{ y: -4, scale: 1.04 }}
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all"
                >
                  <Github size={20} />
                </motion.a>

                <motion.a
                  whileHover={{ y: -4, scale: 1.04 }}
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <TechStackBubbles />

      {/* Experience + Education */}
      <section
        id="experience"
        className="py-24 container mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-10 flex items-center gap-3"
            >
              <Briefcase className="text-indigo-400" /> Professional Experience
            </motion.h2>

            <div className="space-y-6">
              {EXPERIENCE.map((exp, idx) => {
                const isOpen = openExpIndex === idx;

                return (
                  <motion.div
                    key={`${exp.role}-${exp.company}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setOpenExpIndex(isOpen ? null : idx)}
                    className="group cursor-pointer select-none p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-400/50 hover:bg-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-indigo-400 text-sm group-hover:text-indigo-200 transition-colors">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap ml-4 group-hover:text-indigo-200/80 transition-colors">
                          {exp.period}
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-slate-500 group-hover:text-indigo-300"
                          aria-hidden="true"
                        >
                          ▾
                        </motion.span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                      {exp.desc}
                    </p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="exp-content"
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            marginTop: 16,
                          }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3 space-y-2 text-sm text-slate-300">
                            {exp.bullets?.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="text-indigo-300 mt-[2px]">
                                  •
                                </span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          {exp.tech?.length ? (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {exp.tech.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-10 flex items-center gap-3"
            >
              <GraduationCap className="text-cyan-400" /> Academic Background
            </motion.h2>

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <motion.div
                  key={`${edu.degree}-${edu.school}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 hover:bg-cyan-500/5 hover:shadow-cyan-500/10 transition-all duration-300 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {edu.degree}
                      </h3>
                      <p className="text-cyan-400 text-sm group-hover:text-cyan-200 transition-colors">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap ml-4 group-hover:text-cyan-200/80 transition-colors">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-cyan-100/80 transition-colors">
                    <MapPin size={14} /> {edu.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-24 container mx-auto px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-center"
          >
            Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm mb-16 text-center"
          >
            Selected repositories from my GitHub portfolio.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PROJECTS.map((project, idx) => (
              <motion.a
                key={project.link}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={18}
                    className="text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0"
                  />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="py-24 bg-slate-900/30 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Interests & Hobbies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm mb-16"
          >
            What fuels my creativity outside of coding.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {HOBBIES.map((hobby, idx) => {
              const Icon = hobby.icon;
              return (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10, rotate: idx % 2 === 0 ? -1 : 1 }}
                  className="flex flex-col items-center justify-center p-6 w-32 md:w-40 bg-slate-950 border border-slate-800 rounded-3xl shadow-xl transition-all"
                >
                  <div
                    className={`${hobby.color} mb-3 p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner`}
                  >
                    <Icon size={28} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {hobby.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 text-center relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 tracking-tighter"
          >
            Get in touch
          </motion.h2>

          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${LINKS.email}?subject=Portfolio%20Contact`}
              className="inline-flex items-center justify-center gap-2 text-indigo-400 font-bold hover:underline underline-offset-8"
            >
              <Mail size={18} /> {LINKS.email}
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-indigo-400 mt-4"
            >
              <Linkedin size={18} /> LinkedIn
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-indigo-400 mt-4"
            >
              <Github size={18} /> GitHub Profile
            </a>
          </div>

          <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black">
            © 2026 Dhanashree Bhat • Germany
          </p>
        </div>
      </footer>
    </div>
  );
}
