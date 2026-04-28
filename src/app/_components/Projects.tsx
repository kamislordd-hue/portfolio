"use client";

type Project = {
  id: number;
  tag: string;
  title: string;
  desc: string;
  stack: string[];
  year: string;
  color: string;
  demo: string;
  github: string;
};

const projects: Project[] = [
  {
    id: 1,
    tag: "Front-end",
    title: "To-Do List",
    desc: "Lista de tarefas com prioridade, filtros e data de criação. Dados salvos automaticamente no navegador.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    color: "#A78BFA",
    demo: "https://kamislordd-hue.github.io/projeto-list",
    github: "https://github.com/kamislordd-hue/projeto-list",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="px-6 md:px-12 py-24 bg-[#0A0812]">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#F472B6]" />
              <span className="text-[9px] tracking-[.22em] uppercase text-[#F472B6]">
                Portfólio
              </span>
            </div>
            <h2
              className="text-[clamp(28px,4.5vw,60px)] font-bold text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Projetos em destaque
            </h2>
          </div>
          <span className="hidden md:block text-[10px] tracking-[.15em] uppercase text-[#9D96B8]">
            {projects.length} trabalho{projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-2xl border border-white/[.07] bg-white/[.03] p-7 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              {/* Linha de cor */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
              />

              {/* Tag e ano */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[9px] tracking-[.14em] uppercase px-3 py-1 rounded-full border"
                  style={{ color: p.color, borderColor: p.color + "44", background: p.color + "11" }}
                >
                  {p.tag}
                </span>
                <span className="text-[10px] text-[#9D96B8]">{p.year}</span>
              </div>

              {/* Título */}
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {p.title}
              </h3>

              {/* Descrição */}
              <p className="text-[11px] leading-relaxed text-[#9D96B8] mb-6">
                {p.desc}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] bg-white/[.05] border border-white/[.08] text-[#9D96B8] px-2.5 py-1 rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-white/[.08]">
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[.12em] uppercase text-[#A78BFA] hover:text-white transition-colors"
                >
                  Ver demo
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[.12em] uppercase text-[#9D96B8] hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}