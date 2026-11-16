import { useState } from "react";
import { useInView } from "../../../ds/motion.js";
import "./Implantacao.css";

// Seção 7 · Implantação: reduz o medo da mudança.
// Ilustração plana: a tela "Plano de implantação", com uma linha e uma barra de progresso por etapa.
// Passar o mouse (ou focar) numa etapa destaca a linha dela na tela.

const ETAPAS = [
  { titulo: "Migração", texto: "Os dados que a prefeitura já tem entram no novo sistema.", ph: "O que migra e como" },
  { titulo: "Treinamento", texto: "Servidores aprendem a usar antes de abrir para o cidadão.", ph: "Formato e público" },
  { titulo: "Suporte", texto: "Uma equipe acompanha a prefeitura depois da implantação.", ph: "Canais e prazo de atendimento" },
  { titulo: "Continuidade", texto: "Dados e serviços seguem funcionando na troca de gestão.", ph: "Dados e serviço na troca de gestão" },
];

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
    <section ref={ref} className={`im ${on ? "is-in" : ""}`} id="implantacao">
      <div className="container">
        <header className="im-head">
          <h2>Mudança com segurança,<br />do contrato ao uso.</h2>
          <p>A Cubo conduz a implantação junto com a equipe da prefeitura, etapa por etapa, para ninguém ficar sem atendimento no meio do caminho.</p>
        </header>

        <div className="im-stage" aria-hidden="true">
          <div className={`im-plan ${ativo != null ? "has-active" : ""}`}>
            <header className="im-plan__head">
              <span className="im-plan__icon" />
              <div>
                <strong>Plano de implantação</strong>
                <small>Cidade Conectada · Prefeitura Municipal</small>
              </div>
              <span className="im-plan__badge">Em andamento</span>
            </header>
            <ul className="im-plan__rows">
              {PLANO.map((p, i) => (
                <li key={ETAPAS[i].titulo} className={i === ativo ? "is-active" : ""} style={{ "--d": `${400 + i * 160}ms` }}>
                  <span className="im-plan__num">{String(i + 1).padStart(2, "0")}</span>
                  <b>{ETAPAS[i].titulo}</b>
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
