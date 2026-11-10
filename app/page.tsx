
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

const navigation = [
  { number: "01", label: "About", id: "about" },
  { number: "02", label: "Work", id: "work" },
  { number: "03", label: "Achievements", id: "achievements" },
  { number: "04", label: "Skills", id: "skills" },
  { number: "05", label: "Contact", id: "contact" },
];

const skills = [
  { name: "C Programming", category: "Programming", level: "Learning", detail: "Exploring programming fundamentals and problem-solving with C." },
  { name: "Python", category: "Programming", level: "Learning", detail: "Learning Python from the basics and applying it to small experiments." },
  { name: "HTML & CSS", category: "Web", level: "Practising", detail: "Building page structures, layouts, and responsive interfaces." },
  { name: "JavaScript", category: "Web", level: "Learning", detail: "Exploring the language behind interactive web experiences." },
  { name: "React", category: "Web", level: "Exploring", detail: "Learning component-based interfaces and modern frontend development." },
  { name: "Database Management", category: "Technology", level: "Exploring", detail: "Learning how applications organise and work with data." },
  { name: "Linux & Command Line", category: "Technology", level: "Practising", detail: "Using Linux and terminal tools in my development environment." },
  { name: "AI & Machine Learning", category: "Emerging Tech", level: "Exploring", detail: "Discovering how intelligent systems are designed and trained." },
  { name: "Cloud Computing", category: "Emerging Tech", level: "Exploring", detail: "Learning about cloud platforms and distributed services." },
  { name: "Robotics", category: "Emerging Tech", level: "Exploring", detail: "Interested in the connection between software and physical systems." },
  { name: "Cybersecurity", category: "Technology", level: "Exploring", detail: "Learning about digital safety, security principles, and vulnerabilities." },
];

const developerStatuses = [
  "Probably debugging something.",
  "Turning caffeine into code. ☕",
  "Currently fighting a missing semicolon.",
  "Learning today. Building tomorrow.",
  "Works on my machine. Probably.",
  "404: Boring ideas not found.",
];

const interests = [
  ["01", "Web Development", "Creating digital experiences"],
  ["02", "Artificial Intelligence", "Exploring intelligent systems"],
  ["03", "Software Development", "Turning ideas into applications"],
  ["04", "Cybersecurity", "Understanding digital security"],
  ["05", "Creative Experiments", "Following interesting ideas"],
];

const projectTags = {
  smartCity: ["Smart City", "Science Exhibition", "Team Project"],
  cooling: ["Physics", "Experiment", "Thermal Science"],
  portfolio: ["Next.js", "TypeScript", "Tailwind CSS"],
  echo: ["Python", "PySide6", "Linux"],
};

const reactions = [
  { emoji: "🔥", label: "Cool" },
  { emoji: "💚", label: "Love it" },
  { emoji: "🚀", label: "Keep going" },
  { emoji: "🧠", label: "Interesting" },
];

type TerminalLine = {
  text: string;
  type: "command" | "output" | "error" | "success";
};

export default function Home() {
  const [lightMode, setLightMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);

  // Interactive feature state
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: "ECHO TERMINAL v1.0 — Personal portfolio interface", type: "success" },
    { text: 'Type "help" to see available commands.', type: "output" },
  ]);
  const [skillFilter, setSkillFilter] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [reactionCounts, setReactionCounts] = useState([0, 0, 0, 0]);
  const [myReaction, setMyReaction] = useState<number | null>(null);

  // Contact form state
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | "">("");

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Intro screen
  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  // Rotating developer status
  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % developerStatuses.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  // Scroll progress and active navigation
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "work",
      "achievements",
      "skills",
      "contact",
    ];

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

      setScrollProgress(progress);
      setShowTopButton(window.scrollY > 500);

      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= 160) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl/Cmd + K opens the command center
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Focus command search when it opens
  useEffect(() => {
    if (commandOpen) {
      window.setTimeout(() => commandInputRef.current?.focus(), 50);
    }
  }, [commandOpen]);

  // Keep terminal scrolled to the latest line
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  const themeText = lightMode
    ? "text-[#263F34]"
    : "text-[#EAF1E5]";

  const mutedText = lightMode
    ? "text-[#65776A]"
    : "text-[#A5B5A8]";

  const accentText = lightMode
    ? "text-[#315D49]"
    : "text-[#A9D2B2]";

  const sectionLabel = lightMode
    ? "text-[#56866B]"
    : "text-[#A9D2B2]";

  const cardStyle = lightMode
    ? "border-[#C7D4C3] bg-[#F0F4EC] hover:border-[#75A98B] hover:shadow-xl hover:shadow-[#315D49]/10"
    : "border-white/10 bg-white/[0.03] hover:border-[#75A98B]/50 hover:bg-white/[0.05]";

  const borderColor = lightMode
    ? "border-[#C7D4C3]"
    : "border-white/10";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  const goToSection = useCallback((id: string) => {
    setCommandOpen(false);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commandItems = useMemo(
    () => [
      { label: "Go to Home", detail: "Back to the beginning", id: "home", icon: "⌂" },
      { label: "About me", detail: "A little introduction", id: "about", icon: "◎" },
      { label: "Explore projects", detail: "Academic and personal work", id: "work", icon: "⌘" },
      { label: "Achievements", detail: "Milestones and recognition", id: "achievements", icon: "✳" },
      { label: "Explore skills", detail: "What I'm learning", id: "skills", icon: "◇" },
      { label: "Contact", detail: "Start a conversation", id: "contact", icon: "↗" },
    ],
    []
  );

  const filteredCommands = commandItems.filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(commandSearch.toLowerCase())
  );

  const runTerminalCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    const addLines = (lines: TerminalLine[]) => {
      setTerminalLines((previous) => [
        ...previous,
        { text: `visitor@portfolio:~$ ${rawCommand}`, type: "command" },
        ...lines,
      ]);
    };

    switch (command) {
      case "help":
        addLines([
          { text: "Available commands:", type: "success" },
          { text: "help       — Show available commands", type: "output" },
          { text: "about      — Learn about Swarit", type: "output" },
          { text: "projects   — List current projects", type: "output" },
          { text: "skills     — List areas I'm exploring", type: "output" },
          { text: "contact    — Jump to contact section", type: "output" },
          { text: "clear      — Clear terminal", type: "output" },
          { text: "whoami     — Display user information", type: "output" },
          { text: "sudo hire-swarit — Try your luck 😄", type: "output" },
        ]);
        break;

      case "about":
        addLines([
          { text: "I'm Swarit Nidhi, a Class XII Science student from Nepal.", type: "success" },
          { text: "Curious about technology, science, and building things.", type: "output" },
        ]);
        break;

      case "projects":
        addLines([
          { text: "01  Smart City Model — Academic exhibition project", type: "success" },
          { text: "02  Newton's Law of Cooling — Physics project", type: "output" },
          { text: "03  Personal Portfolio — In development", type: "output" },
          { text: "04  ECHO-7 — Desktop experiment in development", type: "output" },
        ]);
        break;

      case "skills":
        addLines([
          { text: "C, Python, HTML, CSS, JavaScript, React", type: "success" },
          { text: "Linux, databases, AI, cloud, robotics, cybersecurity", type: "output" },
          { text: "Some are familiar; others are still being explored.", type: "output" },
        ]);
        break;

      case "contact":
        addLines([
          { text: "Opening the contact section...", type: "success" },
        ]);
        window.setTimeout(() => goToSection("contact"), 350);
        break;

      case "whoami":
        addLines([
          { text: "visitor@portfolio", type: "success" },
          { text: "A curious human exploring Swarit Nidhi's corner of the internet.", type: "output" },
        ]);
        break;

      case "sudo hire-swarit":
        addLines([
          { text: "Permission request received.", type: "success" },
          { text: "First, let's talk about the idea. No admin privileges required. 😄", type: "output" },
        ]);
        break;

      case "clear":
        setTerminalLines([]);
        setTerminalInput("");
        return;

      default:
        addLines([
          { text: `Command not found: ${rawCommand}`, type: "error" },
          { text: 'Try "help" to see what this terminal can do.', type: "output" },
        ]);
    }

    setTerminalInput("");
  };

  const filteredSkills = skills.filter((skill) =>
    skillFilter === "All" ? true : skill.category === skillFilter
  );

  // Visitor reactions
  const handleReaction = (index: number) => {
    setReactionCounts((previous) => {
      const next = [...previous];

      if (myReaction === index) {
        next[index] = Math.max(0, next[index] - 1);
      } else {
        if (myReaction !== null) {
          next[myReaction] = Math.max(0, next[myReaction] - 1);
        }
        next[index] += 1;
      }

      return next;
    });

    setMyReaction((previous) => (previous === index ? null : index));
  };

  // AJAX contact form submission
 const handleContactSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (sending) return;

  setSending(true);
  setFormStatus("");

  const form = event.currentTarget;

  try {
    const response = await fetch("https://formspree.io/f/myeerwnn", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setFormStatus("success");
      form.reset();
    } else {
      const result = await response.json();
      console.error("Formspree error:", result);
      setFormStatus("error");
    }
  } catch (error) {
    console.error("Submission error:", error);
    setFormStatus("error");
  } finally {
    setSending(false);
  }
};

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        lightMode
          ? "light-theme bg-[#E5EBDD] text-[#263F34]"
          : "dark-theme bg-[#14251F] text-[#EAF1E5]"
      }`}
    >
      {/* ORIGINAL RUNNING AVATAR SCROLL PROGRESS */}
      <div
        className="scroll-avatar-track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div className="scroll-avatar-rail" />
        <div
          className="scroll-avatar-fill"
          style={{ width: `${scrollProgress}%` }}
        />
        <img
          src="/avatar-run.gif"
          alt=""
          aria-hidden="true"
          className="scroll-avatar"
          style={{ left: `${scrollProgress}%` }}
        />
      </div>

      {/* ORIGINAL AVATAR INTRO SCREEN */}
      {showIntro && (
        <div className="intro-screen">
          <div className="speech-bubble">
            <p>Checking if my code works.</p>
            <strong>Wish me luck. 💀</strong>
          </div>

          <div className="runner-track">
            <div className="avatar-sprite" />
          </div>

          <div className="intro-status">
            INITIALIZING PERSONAL EXPERIENCE
          </div>
        </div>
      )}

      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-40 top-20 h-96 w-96 rounded-full blur-[130px] ${
            lightMode ? "bg-[#A9C5A0]/30" : "bg-[#56866B]/15"
          }`}
        />

        <div
          className={`absolute -right-40 top-40 h-96 w-96 rounded-full blur-[130px] ${
            lightMode ? "bg-[#C7D5B9]/40" : "bg-[#315D49]/20"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            lightMode ? "opacity-[0.12]" : "opacity-[0.08]"
          }`}
          style={{
            backgroundImage: lightMode
              ? "linear-gradient(#78927A18 1px, transparent 1px), linear-gradient(90deg, #78927A18 1px, transparent 1px)"
              : "linear-gradient(#A9C5A018 1px, transparent 1px), linear-gradient(90deg, #A9C5A018 1px, transparent 1px)",
            backgroundSize: "65px 65px",
          }}
        />

        <div className="absolute left-[8%] top-[48%] h-24 w-24 rounded-full border border-emerald-500/10" />
        <div className="absolute right-[7%] top-[75%] h-40 w-40 rounded-full border border-emerald-500/10" />
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          lightMode
            ? "border-[#C7D4C3]/70 bg-[#E5EBDD]/90 shadow-lg shadow-[#263F34]/5"
            : "border-white/10 bg-[#14251F]/90 shadow-lg shadow-black/10"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <a href="#home" onClick={closeMenu} className="group flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-transform duration-300 group-hover:rotate-6 ${
                lightMode
                  ? "bg-[#315D49] text-[#F2F5E9]"
                  : "bg-[#A9D2B2] text-[#183D32]"
              }`}
            >
              S.
            </span>

            <span>
              <span className={`block text-sm font-bold tracking-[0.12em] ${themeText}`}>
                SWARIT
              </span>
              <span className={`block text-[9px] tracking-[0.2em] ${mutedText}`}>
                CLASS XII · SCIENCE STUDENT
              </span>
            </span>
          </a>

          <div
            className={`hidden items-center gap-1 rounded-full border p-1 md:flex ${
              lightMode ? "border-[#C7D4C3] bg-[#EDF1E8]" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? lightMode
                      ? "bg-[#315D49] text-white"
                      : "bg-[#A9D2B2] text-[#183D32]"
                    : lightMode
                      ? "text-[#65776A] hover:bg-[#DCE6D7] hover:text-[#263F34]"
                      : "text-[#A5B5A8] hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="mr-2 opacity-60">{item.number}</span>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              title="Open command center"
              className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-xs transition hover:border-emerald-500/50 sm:flex ${
                lightMode ? "border-[#C7D4C3] text-[#65776A]" : "border-white/10 text-[#A5B5A8]"
              }`}
            >
              <span>⌕</span>
              <span>Quick find</span>
              <kbd className="rounded border border-current/20 px-1.5 py-0.5 text-[9px]">⌘ K</kbd>
            </button>

            <button
              onClick={() => setLightMode((previous) => !previous)}
              className={`theme-rope ${lightMode ? "is-light" : "is-dark"}`}
              aria-label={`Switch to ${lightMode ? "dark" : "light"} mode`}
              title="Pull to change theme"
            >
              <span className="rope-line" />
              <span className="rope-handle">
                <span className="rope-grip" />
              </span>
            </button>

            <button
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg md:hidden ${
                lightMode ? "border-[#C7D4C3] text-[#315D49]" : "border-white/10 text-[#EAF1E5]"
              }`}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`border-t px-5 py-3 md:hidden ${
            lightMode ? "border-[#C7D4C3] bg-[#E5EBDD]" : "border-white/10 bg-[#14251F]"
          }`}>
            <button
              onClick={() => { closeMenu(); setCommandOpen(true); }}
              className={`mb-2 w-full rounded-xl border px-4 py-3 text-left text-sm ${
                lightMode ? "border-[#C7D4C3]" : "border-white/10"
              }`}
            >
              ⌕ Quick find <span className="float-right opacity-50">Ctrl K</span>
            </button>
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={`flex items-center justify-between border-b py-4 text-sm ${
                  lightMode ? "border-[#C7D4C3] text-[#315D49]" : "border-white/10 text-[#EAF1E5]"
                }`}
              >
                {item.label}
                <span className="text-xs opacity-50">{item.number} ↗</span>
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* COMMAND CENTER */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCommandOpen(false);
          }}
        >
          <div className={`w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl ${
            lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/15 bg-[#172B23]"
          }`}>
            <div className="flex items-center gap-3 border-b border-current/10 px-5">
              <span className="text-xl opacity-60">⌕</span>
              <input
                ref={commandInputRef}
                value={commandSearch}
                onChange={(event) => setCommandSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filteredCommands[0]) {
                    goToSection(filteredCommands[0].id);
                    setCommandSearch("");
                  }
                }}
                placeholder="Where would you like to go?"
                className={`h-16 w-full bg-transparent text-sm outline-none placeholder:opacity-40 ${themeText}`}
              />
              <kbd className="rounded border border-current/20 px-2 py-1 text-[10px] opacity-50">ESC</kbd>
            </div>

            <div className="p-2">
              <p className={`px-3 py-2 text-[10px] uppercase tracking-[0.2em] ${mutedText}`}>
                Quick navigation
              </p>
              {filteredCommands.length ? filteredCommands.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { goToSection(item.id); setCommandSearch(""); }}
                  className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition ${
                    lightMode ? "hover:bg-[#DCE6D7]" : "hover:bg-white/[0.07]"
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    lightMode ? "bg-[#DCE6D7]" : "bg-white/[0.06]"
                  }`}>{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-medium ${themeText}`}>{item.label}</span>
                    <span className={`block text-xs ${mutedText}`}>{item.detail}</span>
                  </span>
                  <span className="text-xs opacity-40">↵</span>
                </button>
              )) : (
                <p className={`px-4 py-8 text-center text-sm ${mutedText}`}>No matching destination found.</p>
              )}
            </div>
            <div className={`flex justify-between border-t border-current/10 px-5 py-3 text-[10px] ${mutedText}`}>
              <span>SWARIT'S COMMAND CENTER</span>
              <span>Navigate · Explore · Connect</span>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-12"
      >
        <div className="relative max-w-2xl">
          <div className={`mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
            lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/10 bg-white/[0.04]"
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#75A98B] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#75A98B]" />
            </span>
            <span className={`text-[10px] font-medium tracking-[0.2em] ${sectionLabel}`}>
              COMPUTER SCIENCE STUDENT · NEPAL
            </span>
          </div>

          <p className={`mb-4 text-sm tracking-[0.25em] ${mutedText}`}>HELLO, WORLD. I'M</p>

          <h1 className="hero-heading text-6xl font-semibold leading-[1.05] tracking-[-0.065em] sm:text-7xl lg:text-[6.5rem]">
            Swarit
            <span className="gradient-text block">.. Nidhi.</span>
          </h1>

          <h2 className={`mt-7 max-w-lg text-xl font-medium leading-relaxed sm:text-2xl ${themeText}`}>
            Curious about technology.
            <span className={accentText}> Driven to create.</span>
          </h2>

          <p className={`mt-5 max-w-lg text-sm leading-8 sm:text-base ${mutedText}`}>
            I'm a Class XII Science student from Nepal exploring
            technology, creativity, and problem-solving. I enjoy
            experimenting with ideas, learning how things work,
            and turning curiosity into meaningful projects.
          </p>

          <div className={`mt-6 inline-flex min-h-10 items-center gap-3 rounded-xl border px-4 py-2 ${
            lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/10 bg-white/[0.03]"
          }`}>
            <span className="text-xs text-emerald-500">●</span>
            <span className={`text-xs ${mutedText}`}>{developerStatuses[statusIndex]}</span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work" className="group inline-flex items-center gap-4 rounded-full bg-[#A9D2B2] px-7 py-4 text-sm font-semibold text-[#183D32] shadow-lg shadow-[#75A98B]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#C5DFC7] hover:shadow-xl hover:shadow-[#75A98B]/20">
              Explore my work
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
            <a href="#about" className={`group inline-flex items-center gap-2 px-4 py-3 text-sm transition-all duration-300 hover:gap-4 ${accentText}`}>
              Get to know me <span>→</span>
            </a>
          </div>

          <div className={`mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6 ${
            lightMode ? "border-[#C7D4C3]" : "border-white/10"
          }`}>
            <div>
              <p className={`text-[10px] tracking-[0.2em] ${mutedText}`}>CURRENT FOCUS</p>
              <p className={`mt-2 text-sm font-medium ${themeText}`}>Learning · Building · Exploring</p>
            </div>
            <div>
              <p className={`text-[10px] tracking-[0.2em] ${mutedText}`}>BASED IN</p>
              <p className={`mt-2 text-sm font-medium ${themeText}`}>Nepal 🇳🇵</p>
            </div>
          </div>
        </div>

        {/* PORTRAIT */}
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute inset-10 rounded-full bg-[#75A98B]/20 blur-[90px]" />
          <div className={`absolute inset-x-5 bottom-5 top-5 rotate-3 rounded-[2.5rem] border ${
            lightMode ? "border-[#A9C5A0]" : "border-[#A9D2B2]/20"
          }`} />

          <div className={`relative overflow-hidden rounded-[2.5rem] border ${
            lightMode ? "border-[#C7D4C3] bg-[#DCE6D7]" : "border-white/10 bg-[#1B3028]"
          }`}>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "linear-gradient(rgba(169,210,178,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(169,210,178,0.12) 1px, transparent 1px)",
              backgroundSize: "35px 35px",
            }} />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#75A98B]/20" />
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[#75A98B]/20" />

            <div className="relative flex min-h-[440px] items-end justify-center sm:min-h-[540px]">
              <img
                src="/portrait.png"
                alt="Portrait of Swarit Nidhi"
                className="relative z-10 h-[420px] w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.04] sm:h-[520px]"
              />
            </div>

            <div className={`absolute bottom-5 left-5 z-20 rounded-xl border px-4 py-3 backdrop-blur-xl ${
              lightMode ? "border-[#C7D4C3] bg-[#E5EBDD]/90" : "border-white/10 bg-[#14251F]/80"
            }`}>
              <p className={`text-[9px] tracking-[0.2em] ${mutedText}`}>CURRENTLY EXPLORING</p>
              <p className={`mt-1 text-xs font-semibold ${themeText}`}>The world of technology ↗</p>
            </div>
          </div>

          <div className={`absolute -right-2 top-12 z-20 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8 ${
            lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/10 bg-[#1B3028]/90"
          }`}>
            <span className={`text-xs font-semibold ${accentText}`}>
              Think.<br />Create.<br />Repeat.
            </span>
          </div>

          <div className="absolute -bottom-5 right-5 z-20 rotate-[-4deg] rounded-full border border-emerald-500/20 bg-[#A9D2B2] px-4 py-2 text-xs font-bold text-[#183D32] shadow-lg">
            100% curious ✳
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.3em] ${sectionLabel}`}>A LITTLE ABOUT ME</p>
            <h2 className={`mb-7 text-4xl font-bold tracking-tight md:text-5xl ${themeText}`}>
              Not limited by <span className="gradient-text">one path.</span>
            </h2>
            <div className={`space-y-5 text-base leading-8 ${mutedText}`}>
              <p>I'm Swarit Nidhi — a Class XII Science student from Nepal with a mind that rarely sticks to just one thing.</p>
              <p>Some days, I'm exploring web development. Other days, I'm experimenting with AI, writing code, learning about cybersecurity, or building something simply because an idea caught my attention.</p>
              <p>I enjoy understanding how things work, experimenting with new technologies, and turning random ideas into real projects. I'm still learning, still exploring, and that's what makes the journey exciting.</p>
            </div>
            <p className={`mt-8 border-l-2 border-emerald-500 pl-4 text-lg font-semibold ${themeText}`}>
              I don't follow just one path. I follow curiosity.
            </p>
          </div>

          <div className={`rounded-3xl border p-7 shadow-xl shadow-emerald-900/5 backdrop-blur-xl md:p-9 ${
            lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/10 bg-white/[0.03]"
          }`}>
            <p className={`mb-2 text-sm uppercase tracking-[0.2em] ${sectionLabel}`}>Beyond the basics</p>
            <h3 className={`mb-7 text-2xl font-bold ${themeText}`}>Currently exploring</h3>
            <div className="space-y-4">
              {interests.map(([number, title, description]) => (
                <div key={number} className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-emerald-500/20 hover:bg-emerald-500/5">
                  <span className="text-sm font-semibold text-emerald-500">{number}</span>
                  <div>
                    <h4 className={`font-semibold ${themeText}`}>{title}</h4>
                    <p className={`text-sm ${mutedText}`}>{description}</p>
                  </div>
                  <span className="ml-auto text-emerald-500 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">↗</span>
                </div>
              ))}
            </div>
            <div className={`mt-7 border-t pt-5 ${borderColor}`}>
              <p className={`text-xs ${mutedText}`}>SIDE QUEST: figuring out how the universe works. 🌌</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className={`mb-6 text-xs font-semibold uppercase tracking-[0.25em] ${mutedText}`}>02 / SELECTED WORK</p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className={`max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl ${themeText}`}>
              Ideas become<span className="gradient-text"> experiments.</span>
            </h2>
            <p className={`max-w-sm text-sm leading-7 ${mutedText}`}>
              A collection of academic work, personal projects, and concepts I'm exploring along the way.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <article className={`group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyle}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs uppercase tracking-widest ${sectionLabel}`}>Academic Exhibition</span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-600">🥉 Third Place</span>
              </div>
              <h3 className={`mt-8 text-2xl font-semibold ${themeText}`}>Smart City Model</h3>
              <p className={`mt-4 leading-7 ${mutedText}`}>A science exhibition project exploring the idea of a smarter, more connected urban environment through a physical city model.</p>
              <div className="mt-8 flex flex-wrap gap-2">{projectTags.smartCity.map((tag) => <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${borderColor}`}>{tag}</span>)}</div>
            </article>

            <article className={`group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyle}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs uppercase tracking-widest ${sectionLabel}`}>Academic Project</span>
                <span className={`rounded-full px-3 py-1 text-xs ${lightMode ? "bg-black/5" : "bg-white/5"}`}>Completed</span>
              </div>
              <h3 className={`mt-8 text-2xl font-semibold ${themeText}`}>Newton's Law of Cooling</h3>
              <p className={`mt-4 leading-7 ${mutedText}`}>An academic physics project exploring how the temperature of an object changes as it cools toward the temperature of its surroundings.</p>
              <div className="mt-8 flex flex-wrap gap-2">{projectTags.cooling.map((tag) => <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${borderColor}`}>{tag}</span>)}</div>
            </article>

            <article className={`group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyle}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs uppercase tracking-widest ${sectionLabel}`}>Personal Project</span>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-500">In Development</span>
              </div>
              <h3 className={`mt-8 text-2xl font-semibold ${themeText}`}>Personal Portfolio</h3>
              <p className={`mt-4 leading-7 ${mutedText}`}>My personal space on the web, designed to document my learning journey, showcase projects, and express my curiosity through interactive web development.</p>
              <div className="mt-8 flex flex-wrap gap-2">{projectTags.portfolio.map((tag) => <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${borderColor}`}>{tag}</span>)}</div>
            </article>

            <article className={`group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyle}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs uppercase tracking-widest ${sectionLabel}`}>Personal Experiment</span>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-500">In Development</span>
              </div>
              <h3 className={`mt-8 text-2xl font-semibold ${themeText}`}>ECHO-7</h3>
              <p className={`mt-4 leading-7 ${mutedText}`}>A lightweight desktop system intelligence experiment exploring system monitoring, interactive interfaces, and a futuristic computing experience.</p>
              <div className="mt-8 flex flex-wrap gap-2">{projectTags.echo.map((tag) => <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${borderColor}`}>{tag}</span>)}</div>
            </article>
          </div>

          <div className="mt-20">
            <p className={`mb-6 text-xs font-semibold uppercase tracking-[0.25em] ${mutedText}`}>IDEAS & CONCEPTS</p>
            <div className="grid gap-4 md:grid-cols-2">
              <article className={`rounded-2xl border p-6 ${cardStyle}`}>
                <span className="text-xs text-purple-500">FinTech Concept</span>
                <h3 className={`mt-3 text-xl font-semibold ${themeText}`}>Intelligent Payment Scheduling</h3>
                <p className={`mt-3 text-sm leading-7 ${mutedText}`}>An idea exploring automated payment scheduling and intelligent approaches to managing payment timing and workflows.</p>
              </article>
              <article className={`rounded-2xl border p-6 ${cardStyle}`}>
                <span className="text-xs text-purple-500">Prototype Concept</span>
                <h3 className={`mt-3 text-xl font-semibold ${themeText}`}>React KYC OS</h3>
                <p className={`mt-3 text-sm leading-7 ${mutedText}`}>A concept for an identity verification interface exploring digital onboarding and KYC workflows using React.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={sectionLabel}>03 / RECOGNITION</p>
              <h2 className={`mt-5 text-4xl font-semibold tracking-tight md:text-6xl ${themeText}`}>Earned through curiosity.</h2>
            </div>
            <p className={`max-w-sm leading-relaxed ${mutedText}`}>Milestones from my journey in science, academics, and exploring what is possible.</p>
          </div>

          <div className="relative mb-6 overflow-hidden rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.07] p-7 transition-all duration-500 hover:border-emerald-500/50 md:p-11">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-emerald-500/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-emerald-500/10" />
            <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">INTERNATIONAL REPRESENTATION</span>
                  <span className={`text-sm ${mutedText}`}>2025 — PRESENT</span>
                </div>
                <h3 className={`mt-7 text-3xl font-semibold leading-tight md:text-5xl ${themeText}`}>
                  IAAC<span className="block text-emerald-600 dark:text-emerald-400">Ambassador.</span>
                </h3>
                <p className={`mt-5 max-w-xl leading-relaxed ${mutedText}`}>
                  An opportunity to represent the International Astronomy and Astrophysics Competition as an ambassador, connecting my interest in astronomy and science with a wider international community.
                </p>
                <div className="mt-7 inline-flex rounded-full border border-emerald-500/25 px-5 py-2">
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">International Astronomy & Astrophysics Competition</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] transition-transform duration-500 hover:rotate-12 md:h-48 md:w-48">
                  <div className="text-center">
                    <span className="block text-5xl font-semibold tracking-tighter text-emerald-600 dark:text-emerald-400 md:text-6xl">IAAC</span>
                    <span className={`mt-3 block text-xs tracking-[0.25em] ${mutedText}`}>AMBASSADOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className={`${cardStyle} flex min-h-[245px] flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1`}>
              <div>
                <p className={sectionLabel}>01 / INTERNATIONAL</p>
                <h3 className={`mt-7 text-2xl font-semibold ${themeText}`}>IAAC 2025 Finalist</h3>
                <p className={`mt-3 leading-relaxed ${mutedText}`}>Reached the finalist stage of the International Astronomy and Astrophysics Competition 2025.</p>
              </div>
              <p className={`mt-8 text-sm font-medium ${accentText}`}>INTERNATIONAL COMPETITION</p>
            </div>

            <div className={`${cardStyle} flex min-h-[245px] flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1`}>
              <div>
                <p className={sectionLabel}>02 / SCIENCE & INNOVATION</p>
                <h3 className={`mt-7 text-2xl font-semibold ${themeText}`}>Smart City Model</h3>
                <p className={`mt-3 leading-relaxed ${mutedText}`}>Recognized at a science exhibition for a technology-focused Smart City Model.</p>
              </div>
              <p className={`mt-8 text-sm font-medium ${accentText}`}>THIRD PLACE · BRONZE AWARD</p>
            </div>

            <div className={`${cardStyle} flex min-h-[245px] flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1`}>
              <div>
                <p className={sectionLabel}>03 / ACADEMIC PARTICIPATION</p>
                <h3 className={`mt-7 text-2xl font-semibold ${themeText}`}>Presentations & Collaboration</h3>
                <p className={`mt-3 leading-relaxed ${mutedText}`}>Taking part in academic presentations and collaborative activities that encourage sharing ideas and learning from others.</p>
              </div>
              <p className={`mt-8 text-sm font-medium ${accentText}`}>LEARNING TOGETHER ↗</p>
            </div>
          </div>

          <div className={`mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-current/10 pt-6 text-xs tracking-widest ${mutedText}`}>
            <span>LEARNING THROUGH EVERY EXPERIENCE</span>
            <span>03 — MILESTONES</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SKILLS */}
      <section id="skills" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-12">
        <p className={`text-xs tracking-[0.3em] ${sectionLabel}`}>04 / EXPLORATION</p>
        <h2 className={`mt-5 text-4xl font-semibold sm:text-5xl ${themeText}`}>
          Always <span className="gradient-text">learning.</span>
        </h2>
        <p className={`mt-5 max-w-xl leading-7 ${mutedText}`}>
          Skills grow through curiosity, practice, and the willingness to experiment with unfamiliar things. Select a topic to see what I'm exploring.
        </p>

        <div className="mt-9 flex flex-wrap gap-2">
          {["All", "Programming", "Web", "Technology", "Emerging Tech"].map((category) => (
            <button
              key={category}
              onClick={() => { setSkillFilter(category); setSelectedSkill(null); }}
              className={`rounded-full border px-4 py-2 text-xs transition-all ${
                skillFilter === category
                  ? "border-[#A9D2B2] bg-[#A9D2B2] text-[#183D32]"
                  : lightMode
                    ? "border-[#C7D4C3] text-[#65776A] hover:border-[#75A98B]"
                    : "border-white/10 text-[#A5B5A8] hover:border-[#75A98B]/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill((current) => current === skill.name ? null : skill.name)}
              className={`group rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                selectedSkill === skill.name
                  ? "border-emerald-500/60 bg-emerald-500/[0.08]"
                  : cardStyle
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`font-semibold ${themeText}`}>{skill.name}</span>
                <span className="text-emerald-500 transition-transform group-hover:translate-x-1">↗</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs ${mutedText}`}>{skill.category}</span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-600 dark:text-emerald-400">{skill.level}</span>
              </div>
              {selectedSkill === skill.name && (
                <p className={`mt-4 border-t border-current/10 pt-4 text-sm leading-6 ${mutedText}`}>
                  {skill.detail}
                </p>
              )}
            </button>
          ))}
        </div>

        <p className={`mt-7 text-xs ${mutedText}`}>⚡ Skill level: permanently updating...</p>
      </section>

      {/* INTERACTIVE TERMINAL */}
      <section id="terminal" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mb-8">
          <p className={`text-xs tracking-[0.3em] ${sectionLabel}`}>A LITTLE EXPERIMENT</p>
          <h2 className={`mt-5 text-4xl font-semibold sm:text-5xl ${themeText}`}>
            Take a look <span className="gradient-text">under the hood.</span>
          </h2>
          <p className={`mt-4 max-w-xl leading-7 ${mutedText}`}>
            A tiny terminal for curious visitors. Try a command and see what happens.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#101B17] shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-xs text-[#A5B5A8]">visitor@swarit — terminal</span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-emerald-400">ONLINE</span>
          </div>

          <div className="h-[300px] overflow-y-auto p-5 font-mono text-xs sm:p-7 sm:text-sm">
            {terminalLines.map((line, index) => (
              <p key={`${index}-${line.text}`} className={`mb-2 whitespace-pre-wrap ${
                line.type === "command" ? "text-[#EAF1E5]" :
                line.type === "success" ? "text-emerald-400" :
                line.type === "error" ? "text-red-400" : "text-[#A5B5A8]"
              }`}>
                {line.text}
              </p>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              runTerminalCommand(terminalInput);
            }}
            className="flex items-center gap-3 border-t border-white/10 px-5 py-4"
          >
            <span className="font-mono text-sm text-emerald-400">›</span>
            <input
              value={terminalInput}
              onChange={(event) => setTerminalInput(event.target.value)}
              placeholder="Type a command..."
              aria-label="Terminal command"
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/30"
            />
            <button type="submit" className="rounded-lg bg-emerald-500/15 px-3 py-2 font-mono text-xs text-emerald-300 transition hover:bg-emerald-500/25">
              RUN ↵
            </button>
          </form>
          <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3">
            {["help", "about", "projects", "skills", "whoami"].map((command) => (
              <button
                key={command}
                onClick={() => runTerminalCommand(command)}
                className="rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[10px] text-[#A5B5A8] transition hover:border-emerald-500/40 hover:text-emerald-300"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VISITOR REACTIONS */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className={`rounded-3xl border p-7 md:p-10 ${
          lightMode ? "border-[#C7D4C3] bg-[#F0F4EC]" : "border-white/10 bg-white/[0.03]"
        }`}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className={`text-xs tracking-[0.25em] ${sectionLabel}`}>YOUR TURN</p>
              <h2 className={`mt-3 text-2xl font-semibold ${themeText}`}>What's your reaction?</h2>
              <p className={`mt-2 text-sm ${mutedText}`}>Leave a little reaction before you go.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {reactions.map((reaction, index) => (
                <button
                  key={reaction.label}
                  onClick={() => handleReaction(index)}
                  aria-pressed={myReaction === index}
                  className={`flex min-w-[75px] flex-col items-center gap-2 rounded-2xl border px-4 py-3 transition-all duration-300 hover:-translate-y-1 ${
                    myReaction === index
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : lightMode
                        ? "border-[#C7D4C3] hover:border-[#75A98B]"
                        : "border-white/10 hover:border-emerald-500/40"
                  }`}
                >
                  <span className="text-2xl transition-transform hover:scale-125">{reaction.emoji}</span>
                  <span className={`text-[10px] ${mutedText}`}>{reaction.label}</span>
                  <span className={`text-xs font-semibold ${accentText}`}>{reactionCounts[index]}</span>
                </button>
              ))}
            </div>
          </div>
          <p className={`mt-5 text-[10px] ${mutedText}`}>
            {myReaction === null ? "Choose one reaction. You can change it anytime." : "Thanks for leaving a reaction! 💚"}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${sectionLabel}`}>
              Get in touch
            </p>

            <h2 className={`mb-5 text-4xl font-bold md:text-5xl ${themeText}`}>
              Have something interesting in mind?
            </h2>

            <p className={`mx-auto max-w-xl ${mutedText}`}>
              Have an idea, a question, or just want to connect?
              I'd love to hear from you. Let's make something meaningful.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className={`space-y-6 rounded-3xl border p-6 shadow-xl backdrop-blur-xl md:p-10 ${
              lightMode
                ? "border-[#C7D4C3] bg-[#F0F4EC]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="contact-name" className={`mb-2 block text-sm font-medium ${themeText}`}>
                Your name
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="What should I call you?"
                required
                className={`w-full rounded-xl border bg-transparent px-4 py-4 outline-none transition focus:border-emerald-500 ${
                  lightMode
                    ? "border-[#C7D4C3] placeholder:text-[#829184]"
                    : "border-white/10 placeholder:text-white/30"
                }`}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={`mb-2 block text-sm font-medium ${themeText}`}>
                Your email
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className={`w-full rounded-xl border bg-transparent px-4 py-4 outline-none transition focus:border-emerald-500 ${
                  lightMode
                    ? "border-[#C7D4C3] placeholder:text-[#829184]"
                    : "border-white/10 placeholder:text-white/30"
                }`}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={`mb-2 block text-sm font-medium ${themeText}`}>
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me what's on your mind..."
                required
                className={`w-full resize-none rounded-xl border bg-transparent px-4 py-4 outline-none transition focus:border-emerald-500 ${
                  lightMode
                    ? "border-[#C7D4C3] placeholder:text-[#829184]"
                    : "border-white/10 placeholder:text-white/30"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {sending ? "Sending message..." : "Send Message →"}
            </button>

            {formStatus === "success" && (
              <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-600 dark:text-emerald-400">
                Message sent successfully! Thanks for reaching out. 💚
              </p>
            )}

            {formStatus === "error" && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            <p className={`text-center text-sm ${mutedText}`}>
              Your message will be delivered to my inbox.
            </p>
          </form>

          <p className={`mt-8 text-center ${accentText}`}>
            ● Open to learning, collaboration & interesting ideas
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`relative z-10 border-t px-6 py-7 text-center text-xs ${
        lightMode ? "border-[#C7D4C3] text-[#78877A]" : "border-white/10 text-[#87998B]"
      }`}>
        <p>© 2026 Swarit Nidhi. Built with curiosity.</p>
        <p className="mt-2 opacity-70">Made with code, curiosity & occasional confusion. 💚</p>
        <button
          onClick={() => setCommandOpen(true)}
          className="mt-4 rounded-full border border-current/20 px-3 py-1.5 transition hover:border-emerald-500/50 hover:text-emerald-500"
        >
          Open command center · Ctrl K
        </button>
      </footer>

      {/* BACK TO TOP */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#75A98B]/40 bg-[#315D49] text-xl text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#56866B]"
        >
          ↑
        </button>
      )}
    </main>
  );
}
