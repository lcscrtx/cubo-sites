import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Secretarias.css";

// Seção 3 · Do protocolo à gestão, no molde da seção "O que dá para fazer na sua secretaria" do
// Cidade Conectada: acordeão à esquerda e, à direita, o painel azul com a mini tela isométrica do
// grupo aberto. Gira sozinho até a pessoa escolher. Os recursos vêm da home anterior do Zero Papel;
// as telas são exemplos de interface.

const PUBLICOS = [
  {
    id: "protocolo",
    nome: "Para o protocolo",
    tela: "Protocolo eletrônico",
    sub: "Pedidos que entram hoje",
    canais: ["Balcão", "Internet"],
    itens: [
      { t: "Protocolo eletrônico", d: "O pedido entra digital, com número e data, pelo balcão ou pela internet." },
      { t: "Documentos anexados", d: "Arquivos e fotos entram junto com o pedido, sem cópia em papel." },
      { t: "Acompanhamento", d: "Quem pediu consulta em que etapa o processo está." },
      { t: "Junto com o Cidade Conectada", d: "O que o cidadão pede no app já chega como processo." },
    ],
  },
  {
    id: "setores",
    nome: "Para as secretarias",
    tela: "Caixa do setor",
    sub: "Processos com o seu setor",
    canais: ["Prazo", "Responsável"],
    itens: [
      { t: "Tramitação de processos", d: "Cada etapa com responsável e prazo, do setor que recebe ao que decide." },
      { t: "Assinatura eletrônica", d: "Documentos assinados sem imprimir, com registro de quem assinou e quando." },
      { t: "Despachos e pareceres", d: "Escritos e anexados no próprio processo, sem pasta circulando." },
      { t: "Histórico completo", d: "Quem fez, quando e o que mudou, em cada passo." },
    ],
  },
  {
    id: "gestao",
    nome: "Para a gestão",
    tela: "Painel da gestão",
    sub: "Processos da prefeitura",
    canais: ["Etapa", "Tempo"],
    itens: [
      { t: "Relatórios e indicadores", d: "Quantos processos estão em cada etapa e onde o tempo está parando." },
      { t: "Gestão de documentos", d: "Ofícios, pareceres e contratos organizados e fáceis de encontrar." },
      { t: "Arquivo digital", d: "O processo encerrado fica guardado e rastreável, sem caixas." },
      { t: "Transparência", d: "Publicidade dos atos com acompanhamento aberto ao cidadão." },
    ],
  },
];

const JUNTO = [["Cidade Conectada", "/cidade-conectada"], ["Legislativo Conectado", "/legislativo-conectado"]];

function Mais({ aberto }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="sc-acc__icon">
      <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {!aberto && <path d="M7 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}

function Tela({ p, ativa }) {
  return (
    <div className={`sc-plane ${ativa ? "is-active" : ""}`} aria-hidden={!ativa}>
      <div className="sc-ui">
        <header className="sc-ui__head">
          <span className="sc-ui__icon" />
          <div>
            <strong>{p.tela}</strong>
            <small>{p.sub}</small>
          </div>
        </header>
        <ul className="sc-ui__list">
          {p.itens.slice(0, 3).map((i, n) => (
            <li key={i.t} style={{ "--d": `${120 + n * 90}ms` }}>
              <span>{i.t}</span>
              {p.canais.map((c) => <em key={c}>{c}</em>)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Publicos() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const [ativa, setAtiva] = useState(0);
  const [manual, setManual] = useState(false);

  // gira sozinho a cada 5 s até a pessoa escolher um público
  useEffect(() => {
    if (!on || manual || prefersReducedMotion()) return;
    const id = setInterval(() => setAtiva((a) => (a + 1) % PUBLICOS.length), 5000);
    return () => clearInterval(id);
  }, [on, manual]);

  const escolher = (i) => {
    setManual(true);
    setAtiva(i);
  };

  return (
    <section ref={ref} className={`sc ${on ? "is-in" : ""}`} id="recursos">
      <div className="container">
        <header className="sc-head">
          <h2>Do protocolo<br />à gestão.</h2>
          <div className="sc-head__side">
            <p>Tudo o que um processo precisa para andar dentro da prefeitura, para cada setor que toca nele.</p>
          </div>
        </header>

        <div className="sc-body">
          <div className="sc-acc">
            {PUBLICOS.map((p, i) => {
              const aberto = i === ativa;
              return (
                <div key={p.id} className={`sc-acc__item ${aberto ? "is-open" : ""}`}>
                  <button type="button" className="sc-acc__btn" aria-expanded={aberto} aria-controls={`zp-${p.id}`} onClick={() => escolher(i)}>
                    {p.nome}
                    <Mais aberto={aberto} />
                  </button>
                  <div className="sc-acc__panel" id={`zp-${p.id}`} role="region" aria-label={p.nome}>
                    <div className="sc-acc__inner">
                      <ul>
                        {p.itens.map((it) => (
                          <li key={it.t}>
                            <strong>{it.t}</strong>
                            <span>{it.d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {aberto && !manual && on && <span className="sc-acc__timer" key={ativa} aria-hidden="true" />}
                </div>
              );
            })}

            <div className="sc-outras">
              <span>Soma com:</span>
              {JUNTO.map(([o, href]) => <a key={o} href={href} className="sc-chip">{o}</a>)}
            </div>
          </div>

          <div className="sc-art" aria-hidden="true">
            <div className="sc-grid-lines" />
            {PUBLICOS.map((p, i) => <Tela key={p.id} p={p} ativa={i === ativa} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
