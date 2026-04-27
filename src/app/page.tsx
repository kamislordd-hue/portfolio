"use client";

import { useState, useEffect, useRef } from "react";

/* ─── DATA ─── */
const projects = [
  {
    id: 1,
    tag: "Full Stack",
    title: "Lumina Finance",
    desc: "Dashboard de finanças pessoais com IA, gráficos em tempo real e notificações inteligentes.",
    stack: ["Next.js", "Prisma", "OpenAI", "Recharts"],
    year: "2024",
    color: "#A78BFA",
  },
  {
    id: 2,
    tag: "Front-end",
    title: "Bloom Design System",
    desc: "Sistema de design acessível com 60+ componentes, Storybook e documentação interativa.",
    stack: ["React", "TypeScript", "Storybook", "Radix"],
    year: "2024",
    color: "#F472B6",
  },
  {
    id: 3,
    tag: "Mobile",
    title: "Flora App",
    desc: "App de rastreamento de hábitos com gamificação, notificações e sync em nuvem.",
    stack: ["React Native", "Expo", "Supabase"],
    year: "2023",
    color: "#34D399",
  },
  {
    id: 4,
    tag: "Back-end",
    title: "Orbit API",
    desc: "API REST escalável para plataforma SaaS com autenticação, webhooks e rate limiting.",
    stack: ["Node.js", "Fastify", "PostgreSQL", "Redis"],
    year: "2023",
    color: "#60A5FA",
  },
];

const skills = [
  { name: "JavaScript", level: 85 },
  { name: "Java", level: 75 },
  { name: "Python", level: 70 },
];

const tools = [
  "JavaScript","Java","Python","React","Next.js","Node.js",
  "Tailwind","Git","GitHub","HTML","CSS","SQL",
];

const navLinks = ["Início","Sobre","Projetos","Skills","Contato"];

/* ─── COMPONENT ─── */
export default function KamilyDev() {
  const [visible, setVisible]         = useState(false);
  const [activeProject, setActive]    = useState<number | null>(null);
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 });
  const heroRef                       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
  });

  return (
    <main className="min-h-screen bg-[#0D0B14] text-[#E8E2F5] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body  { font-family:'JetBrains Mono',monospace; background:#0D0B14; }
        .f-syne { font-family:'Syne',sans-serif; }

        @keyframes float  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
        @keyframes orbit  { from{transform:rotate(0deg) translateX(120px) rotate(0deg)} to{transform:rotate(360deg) translateX(120px) rotate(-360deg)} }
        @keyframes glow   { 0%,100%{opacity:.55} 50%{opacity:1} }
        @keyframes marquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scanline{ from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer{ from{background-position:200% center} to{background-position:-200% center} }

        .float    { animation: float 6s ease-in-out infinite; }
        .orbit    { animation: orbit 8s linear infinite; }
        .glow-pulse { animation: glow 3s ease-in-out infinite; }
        .marquee  { animation: marquee 28s linear infinite; }
        .blink    { animation: blink 1.1s step-end infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #A78BFA, #F472B6, #60A5FA, #34D399, #A78BFA);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .card-glow {
          transition: box-shadow .3s, transform .3s, border-color .3s;
        }
        .card-glow:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 32px rgba(167,139,250,.2), 0 20px 40px rgba(0,0,0,.4);
          border-color: rgba(167,139,250,.4);
        }

        .skill-bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }

        .nav-pill {
          transition: background .2s, color .2s;
        }
        .nav-pill:hover {
          background: rgba(167,139,250,.12);
          color: #A78BFA;
        }

        .tag-chip {
          background: rgba(167,139,250,.1);
          border: 1px solid rgba(167,139,250,.2);
          transition: background .2s, border-color .2s;
        }
        .tag-chip:hover {
          background: rgba(167,139,250,.2);
          border-color: rgba(167,139,250,.5);
        }

        /* scanline subtle overlay */
        .scanline-overlay::before {
          content:'';
          position:absolute; inset:0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,.06) 3px,
            rgba(0,0,0,.06) 4px
          );
          pointer-events:none;
          z-index:1;
        }
      `}</style>

      {/* ════════ NAV ════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50
                      flex items-center justify-between
                      px-6 md:px-12 py-5
                      bg-[#0D0B14]/80 backdrop-blur-md
                      border-b border-white/[.06]">

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A78BFA] glow-pulse" />
          <span className="f-syne font-700 text-base tracking-tight text-white">
            kamily<span className="text-[#A78BFA]">.dev</span>
          </span>
        </div>

        <ul className="hidden md:flex gap-1 list-none">
          {navLinks.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace("í","i")}`}
                className="nav-pill text-[11px] tracking-[.12em] uppercase text-[#9D96B8]
                           px-4 py-2 rounded-full"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="text-[10px] tracking-[.15em] uppercase text-[#0D0B14]
                     bg-[#A78BFA] hover:bg-[#C4B5FD] transition-colors
                     px-4 py-2 rounded-full font-500"
        >
          Contratar
        </a>
      </nav>

      {/* ════════ HERO ════════ */}
      <section
        id="início"
        ref={heroRef}
        className="scanline-overlay relative min-h-screen flex flex-col justify-center
                   px-6 md:px-12 pt-24 pb-20 overflow-hidden"
      >
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%,
                rgba(167,139,250,.12) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 80% 20%,
                rgba(244,114,182,.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 10% 80%,
                rgba(52,211,153,.06) 0%, transparent 60%)
            `,
            transition: "background .1s",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-24 right-16 md:right-32 float"
             style={{ animationDelay: "0s" }}>
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full opacity-20"
               style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)" }} />
        </div>
        <div className="absolute bottom-20 left-8 float"
             style={{ animationDelay: "2s" }}>
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full opacity-15"
               style={{ background: "radial-gradient(circle, #F472B6 0%, transparent 70%)" }} />
        </div>
        <div className="absolute top-1/2 right-8 float"
             style={{ animationDelay: "4s" }}>
          <div className="w-24 h-24 rounded-full opacity-20"
               style={{ background: "radial-gradient(circle, #34D399 0%, transparent 70%)" }} />
        </div>

        {/* Grid dots */}
        <div className="absolute inset-0 pointer-events-none opacity-[.04]"
             style={{
               backgroundImage: "radial-gradient(circle, #A78BFA 1px, transparent 1px)",
               backgroundSize: "40px 40px",
             }} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          <div style={fadeUp(0)} className="flex items-center gap-3 mb-8">
            <span className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
              <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            </span>
            <span className="text-[10px] tracking-[.2em] uppercase text-[#9D96B8]">
              Disponível para projetos
            </span>
            <span className="w-2 h-2 rounded-full bg-[#34D399] glow-pulse" />
          </div>

          <h1 className="f-syne font-800 leading-[1] tracking-tight mb-6" style={fadeUp(100)}>
            <span className="block text-[clamp(42px,8vw,110px)] text-white">
              Olá, eu sou
            </span>
            <span
              className="block text-[clamp(46px,9vw,124px)] shimmer-text"
            >
              Kamily
            </span>
          </h1>

          <p
            className="text-[clamp(14px,1.6vw,20px)] text-[#9D96B8] max-w-xl leading-relaxed mb-10"
            style={fadeUp(220)}
          >
            Desenvolvedora Full Stack apaixonada por criar{" "}
            <span className="text-[#F472B6]">experiências digitais bonitas</span>{" "}
            e soluções de software{" "}
            <span className="text-[#A78BFA]">elegantes e escaláveis</span>.
          </p>

          <div className="flex flex-wrap gap-4" style={fadeUp(340)}>
            <a
              href="#projetos"
              className="f-syne font-600 text-sm tracking-wide
                         bg-[#A78BFA] hover:bg-[#C4B5FD]
                         text-[#0D0B14] px-7 py-3.5 rounded-full
                         transition-all duration-200 hover:shadow-[0_0_24px_rgba(167,139,250,.5)]"
            >
              Ver projetos →
            </a>
            <a
              href="#contato"
              className="f-syne font-600 text-sm tracking-wide
                         border border-white/10 hover:border-[#A78BFA]/50
                         text-[#E8E2F5] px-7 py-3.5 rounded-full
                         transition-all duration-200"
            >
              Me contate
            </a>
          </div>

          {/* Terminal prompt */}
          <div
            className="mt-14 flex items-center gap-3 text-[11px] text-[#9D96B8]"
            style={fadeUp(460)}
          >
            <span className="text-[#34D399]">▶</span>
            <span>kamily@dev</span>
            <span className="text-[#A78BFA]">~</span>
            <span className="text-white">$ npm run make-something-amazing</span>
            <span className="blink text-[#A78BFA]">▋</span>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE TOOLS ════════ */}
      <div className="overflow-hidden border-y border-white/[.06] py-4
                      bg-gradient-to-r from-[#A78BFA]/10 via-transparent to-[#F472B6]/10">
        <div className="marquee flex whitespace-nowrap gap-10 w-max">
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="text-[10px] tracking-[.18em] uppercase text-[#9D96B8]">{t}</span>
              <span className="text-[#A78BFA]/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ ABOUT ════════ */}
      <section id="sobre" className="px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Visual card */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full opacity-30"
                   style={{ background: "conic-gradient(from 0deg, #A78BFA, #F472B6, #60A5FA, #34D399, #A78BFA)", filter: "blur(16px)" }} />
              {/* Avatar placeholder */}
              <div className="relative z-10 w-full h-full rounded-full border border-white/10
                              flex items-center justify-center overflow-hidden
                              bg-gradient-to-br from-[#1A1628] to-[#0D0B14]">
                <div className="text-center">
                  <div className="text-6xl mb-2">👩‍💻</div>
                  <span className="text-[10px] tracking-[.15em] text-[#9D96B8] uppercase">Kamily Dev</span>
                </div>
              </div>
              {/* Orbiting badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="orbit absolute">
                  <div className="bg-[#A78BFA] text-[#0D0B14] text-[9px] font-500 tracking-wide
                                  px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Full Stack
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#A78BFA]" />
              <span className="text-[9px] tracking-[.22em] uppercase text-[#A78BFA]">
                Sobre mim
              </span>
            </div>

            <h2 className="f-syne font-700 text-[clamp(28px,3.5vw,46px)] leading-tight mb-6 text-white">
              Código limpo,{" "}
              <span className="text-[#F472B6]">design bonito</span>,<br />
              impacto real.
            </h2>

            <p className="text-[12px] leading-[2] text-[#9D96B8] mb-8">
              Sou desenvolvedora Full Stack com foco em React, Next.js e Node.js. Acredito que tecnologia e design andam de mãos dadas — escrevo código que funciona bem <em className="text-[#E8E2F5] not-italic">e</em> parece incrível.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "✦", label: "Ano de exp.", val: "1" },
                { icon: "◆", label: "Projetos entregues", val: "10+" },
                { icon: "▲", label: "Open source", val: "5" },
                { icon: "●", label: "Tecnologias dominadas", val: "10" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="border border-white/[.07] rounded-2xl p-4
                             bg-white/[.02] hover:bg-white/[.04] transition-colors"
                >
                  <div className="text-[#A78BFA] text-xs mb-1">{s.icon}</div>
                  <div className="f-syne font-700 text-2xl text-white">{s.val}</div>
                  <div className="text-[10px] text-[#9D96B8] tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROJECTS ════════ */}
      <section id="projetos" className="px-6 md:px-12 py-24 bg-[#0A0812]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#F472B6]" />
                <span className="text-[9px] tracking-[.22em] uppercase text-[#F472B6]">
                  Portfólio
                </span>
              </div>
              <h2 className="f-syne font-700 text-[clamp(28px,4.5vw,60px)] text-white leading-tight">
                Projetos em{" "}
                <span className="shimmer-text">destaque</span>
              </h2>
            </div>
            <span className="hidden md:block text-[10px] tracking-[.15em] uppercase text-[#9D96B8]">
              0{projects.length} trabalhos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="card-glow group relative rounded-2xl border border-white/[.07]
                           bg-gradient-to-br from-white/[.03] to-transparent
                           p-7 cursor-pointer overflow-hidden"
                onClick={() => setActive(activeProject === p.id ? null : p.id)}
              >
                {/* Color accent top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
                />
                {/* Glow spot */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${p.color}22 0%, transparent 70%)` }}
                />

                <div className="flex items-start justify-between mb-5">
                  <span
                    className="tag-chip text-[9px] tracking-[.14em] uppercase px-3 py-1 rounded-full"
                    style={{ color: p.color }}
                  >
                    {p.tag}
                  </span>
                  <span className="text-[10px] text-[#9D96B8]">{p.year}</span>
                </div>

                <h3
                  className="f-syne font-700 text-[clamp(20px,2.5vw,28px)] text-white mb-3
                             group-hover:transition-colors"
                  style={{ color: activeProject === p.id ? p.color : undefined,
                           transition: "color .2s" }}
                >
                  {p.title}
                </h3>

                <p className="text-[11px] leading-[1.9] text-[#9D96B8] mb-6">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] tracking-wide bg-white/[.05] border border-white/[.08]
                                 text-[#9D96B8] px-2.5 py-1 rounded-lg"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Expand */}
                {activeProject === p.id && (
                  <div className="mt-5 pt-5 border-t border-white/[.08] flex gap-4">
                    <a href="#" className="text-[10px] tracking-[.12em] uppercase
                                          text-[#A78BFA] hover:text-white transition-colors">
                      Ver demo →
                    </a>
                    <a href="#" className="text-[10px] tracking-[.12em] uppercase
                                          text-[#9D96B8] hover:text-white transition-colors">
                      GitHub ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SKILLS ════════ */}
      <section id="skills" className="px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#60A5FA]" />
              <span className="text-[9px] tracking-[.22em] uppercase text-[#60A5FA]">
                Habilidades
              </span>
            </div>
            <h2 className="f-syne font-700 text-[clamp(28px,3.5vw,48px)] text-white leading-tight mb-4">
              Stack &{" "}
              <span className="text-[#60A5FA]">expertise</span>
            </h2>
            <p className="text-[11px] leading-[2] text-[#9D96B8]">
              Trabalho com as tecnologias mais modernas do ecossistema JavaScript,
              sempre buscando as melhores práticas de performance e acessibilidade.
            </p>
          </div>

          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-[11px] tracking-wide text-[#E8E2F5]">{s.name}</span>
                  <span className="text-[11px] text-[#A78BFA]">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-white/[.06] rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    style={{
                      width: visible ? `${s.level}%` : "0%",
                      background: `linear-gradient(90deg, #A78BFA, #F472B6)`,
                      transitionDelay: `${i * 100 + 400}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section
        id="contato"
        className="relative px-6 md:px-12 py-28 md:py-44 overflow-hidden
                   bg-gradient-to-b from-[#0A0812] to-[#0D0B14]"
      >
        {/* Big glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[400px] pointer-events-none opacity-15"
             style={{ background: "radial-gradient(ellipse, #A78BFA 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#34D399]" />
            <span className="text-[9px] tracking-[.22em] uppercase text-[#34D399]">
              Contato
            </span>
            <span className="w-8 h-px bg-[#34D399]" />
          </div>

          <h2 className="f-syne font-800 text-[clamp(36px,6vw,80px)] text-white
                         leading-[1.05] tracking-tight mb-6">
            Vamos criar algo{" "}
            <span className="shimmer-text">incrível</span>{" "}
            juntas?
          </h2>

          <p className="text-[12px] leading-[2] text-[#9D96B8] max-w-md mx-auto mb-12">
            Estou aberta a projetos freelance, colaborações e oportunidades full-time. Me chama!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:kamislordd@gmail.com"
              className="f-syne font-600 inline-flex items-center gap-2
                         text-[clamp(13px,1.6vw,18px)] tracking-wide text-white
                         border border-white/10 hover:border-[#A78BFA]/60
                         px-8 py-4 rounded-2xl
                         bg-white/[.03] hover:bg-[#A78BFA]/10
                         transition-all duration-300
                         hover:shadow-[0_0_40px_rgba(167,139,250,.2)]"
            >
              <span className="text-[#A78BFA]">✉</span>
              kamislordd@gmail.com
            </a>

            <a
              href="tel:+5521977405347"
              className="f-syne font-600 inline-flex items-center gap-2
                         text-[clamp(13px,1.6vw,18px)] tracking-wide text-white
                         border border-white/10 hover:border-[#34D399]/60
                         px-8 py-4 rounded-2xl
                         bg-white/[.03] hover:bg-[#34D399]/10
                         transition-all duration-300
                         hover:shadow-[0_0_40px_rgba(52,211,153,.2)]"
            >
              <span className="text-[#34D399]">✆</span>
              21 97740-5347
            </a>
          </div>

          <div className="flex justify-center gap-8 mt-14">
            {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[9px] tracking-[.18em] uppercase text-[#9D96B8]
                           hover:text-[#A78BFA] transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3
                         px-6 md:px-12 py-7
                         border-t border-white/[.06]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
          <span className="f-syne font-700 text-sm text-white">
            kamily<span className="text-[#A78BFA]">.dev</span>
          </span>
        </div>
        <p className="text-[9px] tracking-[.12em] uppercase text-[#9D96B8]/60">
          © 2024 · Feito com 💜 no Brasil
        </p>
        <p className="text-[9px] tracking-[.12em] uppercase text-[#9D96B8]/60">
          Next.js · Tailwind CSS
        </p>
      </footer>
    </main>
  );
}