import { useState } from "react";
import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Implantacao.css";

// Seção 7 · Implantação e migração do Zero Papel, no molde da implantação do Cidade Conectada: reduz o medo da mudança.
// Ilustração plana: a tela "Plano de implantação", com uma linha e uma barra de progresso por etapa.
// Passar o mouse (ou focar) numa etapa destaca a linha dela na tela.

const ETAPAS = [
  { titulo: "Migração de dados", curto: "Migração", texto: "O que vem do sistema atual entra no Zero Papel, definido junto com a equipe da prefeitura.", ph: "O que migra e como" },
  { titulo: "Acervo físico", curto: "Acervo", texto: "Digitalização do que já existe em papel, com uma linha de corte clara.", ph: "Como é feita a digitalização" },
  { titulo: "Treinamento", texto: "Para quem protocola, tramita e assina, no ritmo de cada setor.", ph: "Formato e público" },
  { titulo: "Base legal interna", curto: "Base legal", texto: "Decreto ou portaria que oficializa o processo eletrônico na prefeitura.", ph: "Modelo de decreto" },
]

// Estado ilustrativo do plano (não é dado real de cliente)
const PLANO = [
  { pct: 100, status: "Concluída", tom: "ok" },
  { pct: 72, status: "Em andamento", tom: "run" },
  { pct: 40, status: "Ativo", tom: "run" },
  { pct: 12, status: "Planejada", tom: "next" },
];

export default function Implantacao() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const [ativo, setAtivo] = useState(null);

  return (
    <section ref={ref} className={`im ${on ? "is-in" : ""}`} id="migracao">
      <div className="container">
        <header className="im-head">
          <h2>Mudança sem<br />perder o histórico.</h2>
          <p>Para quem já usa outro sistema ou ainda tem o arquivo em papel. A Cubo conduz a mudança junto com a equipe da prefeitura, etapa por etapa.</p>
        </header>

        <div className="im-stage" aria-hidden="true">
          <div className={`im-plan ${ativo != null ? "has-active" : ""}`}>
            <header className="im-plan__head">
              <span className="im-plan__icon" />
              <div>
                <strong>Plano de implantação</strong>
                <small>Cidade Zero Papel · Prefeitura Municipal</small>
              </div>
              <span className="im-plan__badge">Em andamento</span>
            </header>
            <ul className="im-plan__rows">
              {PLANO.map((p, i) => (
                <li key={ETAPAS[i].titulo} className={i === ativo ? "is-active" : ""} style={{ "--d": `${400 + i * 160}ms` }}>
                  <span className="im-plan__num">{String(i + 1).padStart(2, "0")}</span>
                  <b>{ETAPAS[i].curto ?? ETAPAS[i].titulo}</b>
                  <span className="im-plan__bar"><span style={{ "--w": `${p.pct}%` }} /></span>
                  <em className={`im-plan__status im-plan__status--${p.tom}`}>{p.status}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="im-team">
            <div className="im-team__avatars">
              {["var(--blue-800)", "var(--blue)", "var(--blue-400)", "var(--blue-200)"].map((c) => <i key={c} style={{ background: c }} />)}
            </div>
            <div>
              <strong>Equipe Cubo + Prefeitura</strong>
              <small>Acompanhando cada etapa</small>
            </div>
          </div>
        </div>

        <ol className="im-steps" onMouseLeave={() => setAtivo(null)}>
          {ETAPAS.map((e, i) => (
            <li
              key={e.titulo}
              tabIndex={0}
              className={i === ativo ? "is-active" : ""}
              style={{ "--d": `${300 + i * 120}ms` }}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              onBlur={() => setAtivo(null)}
            >
              <span className="im-steps__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
              <p className="im-steps__ph"><span className="ph">{e.ph}</span></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
