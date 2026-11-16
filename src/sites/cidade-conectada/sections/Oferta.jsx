import { useState } from "react";
import { useInView } from "../../../ds/motion.js";
import { PRODUTOS as CAT } from "../data/produtos.js";
import "./Oferta.css";

// Seção 8 · Oferta e contratação.
// Dois caminhos lado a lado. O "por produto" é um montador de verdade:
// a pessoa marca o que precisa e vê na hora o que levou para a conversa com a Cubo.

const PRODUTOS = [
  "SuperApp de Serviços",
  "Interoperabilidade",
  "Atendimento WhatsApp",
  "TeleAtendimento com Libras",
  "IA para Atendimento",
  "Conecta OS",
];

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="m2.5 6.2 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Oferta() {
  const [ref, on] = useInView({ threshold: 0.25 });
  const [escolhidos, setEscolhidos] = useState(["SuperApp de Serviços", "Atendimento WhatsApp"]);

  const alternar = (p) =>
    setEscolhidos((atual) => (atual.includes(p) ? atual.filter((x) => x !== p) : [...atual, p]));

  const n = escolhidos.length;
  const escolhidosSlugs = CAT.filter((p) => escolhidos.includes(p.curto)).map((p) => p.slug).join(",");
  const resumo =
    n === 0 ? "Escolha pelo menos um produto." :
    n === PRODUTOS.length ? "Você marcou todos: a solução completa é o caminho." :
    `${n} ${n === 1 ? "produto escolhido" : "produtos escolhidos"}. Dá para ampliar depois.`;

  return (
    <section ref={ref} className={`of js-reveal ${on ? "is-in" : ""}`} id="contratar">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Contrate do jeito que faz<br />sentido para a sua cidade.</h2>
          <div className="sec-head__side">
            <p>Leve os seis produtos juntos ou comece pela prioridade da gestão e amplie quando fizer sentido.</p>
          </div>
        </header>

        <div className="of-grid">
          {/* Caminho 1: completa */}
          <article className="of-card of-card--full reveal" style={{ "--rd": "80ms" }}>
            <h3>Solução completa</h3>
            <p className="of-card__text">Os seis produtos do Cidade Conectada trabalhando juntos, do pedido do cidadão à equipe em campo.</p>
            <ul className="of-list">
              {PRODUTOS.map((p) => (
                <li key={p}><span className="of-list__check"><Check /></span>{p}</li>
              ))}
            </ul>
            <a className="btn btn--primary of-card__cta" href="/cidade-conectada/produtos">Ver o que inclui</a>
          </article>

          {/* Caminho 2: por produto, com montador */}
          <article className="of-card reveal" style={{ "--rd": "160ms" }}>
            <h3>Por produto</h3>
            <p className="of-card__text">Marque o que a sua prefeitura precisa agora.</p>
            <div className="of-picker" role="group" aria-label="Escolha os produtos">
              {PRODUTOS.map((p) => {
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
              href={n === 0 ? undefined : `/cidade-conectada/demonstracao?produtos=${escolhidosSlugs}`}
              aria-disabled={n === 0}
            >
              Montar minha solução
            </a>
          </article>
        </div>

        <div className="of-foot reveal" style={{ "--rd": "240ms" }}>
          <p>Preço, documentos e etapas em uma só página. Para processos internos, some o <a href="/cidade-zero-papel">Cidade Zero Papel</a>.</p>
          <a className="sec-link" href="/cidade-conectada/como-contratar">
            Ver como contratar
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
