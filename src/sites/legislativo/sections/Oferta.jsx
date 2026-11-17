import { useState } from "react";
import { useInView } from "../../../ds/motion.js";
import { CONTATO } from "../../../ds/contato.js";
import "../../cidade-conectada/sections/Oferta.css";

// Seção 9 · Oferta e contratação do Legislativo, no molde da oferta do Cidade Conectada.
// Dois caminhos lado a lado. O "por recurso" é um montador de verdade: a pessoa marca o que a
// Câmara precisa e o botão abre o e-mail de demonstração já com a lista escolhida.

const RECURSOS = [
  "App da Câmara com IA",
  "WhatsApp oficial com IA",
  "TV Câmara ao vivo",
  "Atendimento em Libras",
  "Painel do Vereador",
  "Pesquisas regionalizadas",
];

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="m2.5 6.2 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function emailDemo(lista) {
  const assunto = "Demonstração do Legislativo Conectado";
  const corpo = lista.length ? `Recursos de interesse:\n- ${lista.join("\n- ")}` : "";
  return `mailto:${CONTATO.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}

export default function Oferta() {
  const [ref, on] = useInView({ threshold: 0.25 });
  const [escolhidos, setEscolhidos] = useState(["WhatsApp oficial com IA", "Painel do Vereador"]);

  const alternar = (p) =>
    setEscolhidos((atual) => (atual.includes(p) ? atual.filter((x) => x !== p) : [...atual, p]));

  const n = escolhidos.length;
  const resumo =
    n === 0 ? "Escolha pelo menos um recurso." :
    n === RECURSOS.length ? "Você marcou todos: a solução completa é o caminho." :
    `${n} ${n === 1 ? "recurso escolhido" : "recursos escolhidos"}. Dá para ampliar depois.`;

  return (
    <section ref={ref} className={`of js-reveal ${on ? "is-in" : ""}`} id="contratar">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Contrate do jeito que faz<br />sentido para a sua Câmara.</h2>
          <div className="sec-head__side">
            <p>Leve o Legislativo Conectado completo ou comece pelo que a Casa mais precisa e amplie quando fizer sentido.</p>
          </div>
        </header>

        <div className="of-grid">
          {/* Caminho 1: completa */}
          <article className="of-card of-card--full reveal" style={{ "--rd": "80ms" }}>
            <h3>Solução completa</h3>
            <p className="of-card__text">Todos os recursos trabalhando juntos, da mensagem do cidadão à resposta registrada pela Câmara.</p>
            <ul className="of-list">
              {RECURSOS.map((p) => (
                <li key={p}><span className="of-list__check"><Check /></span>{p}</li>
              ))}
            </ul>
            <a className="btn btn--primary of-card__cta" href="#solucao">Ver o que inclui</a>
          </article>

          {/* Caminho 2: por recurso, com montador */}
          <article className="of-card reveal" style={{ "--rd": "160ms" }}>
            <h3>Por recurso</h3>
            <p className="of-card__text">Marque o que a sua Câmara precisa agora.</p>
            <div className="of-picker" role="group" aria-label="Escolha os recursos">
              {RECURSOS.map((p) => {
                const marcado = escolhidos.includes(p);
                return (
                  <button key={p} type="button" className={`of-chip ${marcado ? "is-on" : ""}`} aria-pressed={marcado} onClick={() => alternar(p)}>
                    <span className="of-chip__box"><Check /></span>
                    {p}
                  </button>
                );
              })}
            </div>
            <p className="of-summary" aria-live="polite">{resumo}</p>
            <a
              className={`btn btn--ghost of-card__cta ${n === 0 ? "is-disabled" : ""}`}
              href={n === 0 ? undefined : emailDemo(escolhidos)}
              aria-disabled={n === 0}
            >
              Montar minha solução
            </a>
          </article>
        </div>

        <div className="of-foot reveal" style={{ "--rd": "240ms" }}>
          <p>Para tramitar protocolo, proposições e documentos sem papel, some o <a href="/cidade-zero-papel">Cidade Zero Papel</a>.</p>
          <a className="sec-link" href={emailDemo([])}>
            Falar com a Cubo
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
