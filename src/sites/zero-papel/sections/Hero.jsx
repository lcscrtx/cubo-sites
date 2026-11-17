import { useEffect, useState } from "react";
import Grainient from "../../../ds/bg/Grainient.jsx";
import Icone from "../../../ds/Icone.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Hero.css";
import "./Hero.css";

// Hero do Cidade Zero Papel, no mesmo molde do hero do Cidade Conectada (degradê da marca,
// texto centralizado, cena embaixo), com uma cena própria do produto: um processo nasce no
// protocolo, tramita, é assinado e vai para o arquivo, sem papel.
// No centro, o processo eletrônico com o documento e a linha de tramitação; à esquerda, o protocolo
// sendo gerado; à direita, as assinaturas chegando. Números, setores e cargos são exemplos de interface.

const ETAPAS = ["Protocolo", "Análise", "Assinatura", "Publicação", "Arquivo"];
const PASSO_MS = 1300;
const PAUSA = 2; // passos parados com o processo arquivado antes de recomeçar

const ASSINANTES = [["Fiscal de obras", "Análise técnica"], ["Secretário de Obras", "Decisão"]];

function CenaProcesso() {
  const reduzido = prefersReducedMotion();
  const [t, setT] = useState(reduzido ? ETAPAS.length - 1 : 0);

  useEffect(() => {
    if (reduzido) return;
    const id = setInterval(() => setT((x) => (x + 1) % (ETAPAS.length + PAUSA)), PASSO_MS);
    return () => clearInterval(id);
  }, [reduzido]);

  const passo = Math.min(t, ETAPAS.length - 1);
  const assinado = passo >= 2;
  const fim = passo === ETAPAS.length - 1;

  return (
    <div className="zph" aria-hidden="true">
      {/* protocolo: o pedido entra digital e ganha número */}
      <div className="zph-card zph-prot">
        <div className="zph-card__top"><span className="zph-ico"><Icone nome="arquivo" size={13} /></span>Protocolo eletrônico</div>
        <div className="zph-prot__linha"><small>Pedido</small><span>Alvará de construção</span></div>
        <div className="zph-prot__linha"><small>Entrada</small><span>Portal da prefeitura · 09:42</span></div>
        <div className="zph-prot__num"><Icone nome="check" size={13} />Nº 4021/2026 gerado</div>
      </div>

      {/* processo: documento e tramitação */}
      <div className="zph-doc">
        <div className="zph-doc__top">
          <span className="zph-ico zph-ico--azul"><Icone nome="arquivo" size={14} /></span>
          <div>
            <strong>Processo 4021/2026</strong>
            <small>Secretaria de Obras</small>
          </div>
          <span className={`zph-status ${fim ? "is-on" : ""}`}>{fim ? "Arquivado" : ETAPAS[passo]}</span>
        </div>

        <div className="zph-doc__folha">
          <div className="zph-folha">
            <b>Despacho</b>
            <i style={{ width: "92%" }} /><i style={{ width: "100%" }} /><i style={{ width: "84%" }} /><i style={{ width: "60%" }} />
            <div className={`zph-assina ${assinado ? "is-on" : ""}`}>
              <svg viewBox="0 0 120 34" width="120" height="34">
                <path d="M4 24c8-14 14-18 16-12s-6 14 2 12 10-16 16-14-2 14 6 12 8-10 14-10 4 8 12 6 14-8 22-6 12 2 18 0" />
              </svg>
              <small>Assinado eletronicamente</small>
            </div>
          </div>
        </div>

        <ol className="zph-tram">
          {ETAPAS.map((e, i) => (
            <li key={e} className={i < passo ? "is-past" : i === passo ? "is-now" : ""}><i />{e}</li>
          ))}
        </ol>
      </div>

      {/* assinaturas */}
      <div className="zph-card zph-ass">
        <div className="zph-card__top"><span className="zph-ico"><Icone nome="assinatura" size={13} /></span>Assinaturas</div>
        <ul>
          {ASSINANTES.map(([cargo, papel], k) => {
            const ok = passo >= 1 + k;
            return (
              <li key={cargo} className={ok ? "is-ok" : ""}>
                <span className="zph-ass__av" />
                <span><strong>{cargo}</strong><small>{papel}</small></span>
                <em>{ok ? <Icone nome="check" size={12} /> : null}</em>
              </li>
            );
          })}
        </ul>
        <small className="zph-ass__nota">Sem imprimir, com data e hora de cada assinatura.</small>
      </div>
    </div>
  );
}

export default function Hero({ demo }) {
  return (
    <section className="cc-hero">
      <div className="cc-hero__bg" aria-hidden="true">
        <Grainient
          colors={["#16205B", "#1F299C", "#0372FF", "#4F9BFF"]}
          angle={160}
          speed={prefersReducedMotion() ? 0 : 0.5}
          flow={0.9}
          softness={1}
          silk={0.5}
          grainAmount={0}
          contrast={1.05}
          stir={0.8}
        />
      </div>

      <div className="container cc-hero__copy">
        <span className="cc-hero__eyebrow">Entre a prefeitura e o cidadão, a gente.</span>
        <h1 className="cc-hero__title">Toda a prefeitura em processos eletrônicos.</h1>
        <p className="cc-hero__lead">
          Menos papel dentro da prefeitura, mais agilidade para responder ao cidadão, com tudo rastreável: quem fez, quando e em que etapa está.
        </p>
        <div className="cc-hero__actions">
          <a className="btn btn--light" href={demo}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href="#recursos">Conhecer recursos</a>
        </div>
      </div>

      <div className="container cc-hero__scene">
        <CenaProcesso />
      </div>
    </section>
  );
}
