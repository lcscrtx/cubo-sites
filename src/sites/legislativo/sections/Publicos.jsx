import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Secretarias.css";

// Seção 3 · Um produto, três públicos (quadro "Legislativo Conectado · Home"), no molde da seção
// "O que dá para fazer na sua secretaria" do Cidade Conectada: acordeão à esquerda e, à direita,
// o painel azul com a mini tela isométrica do público aberto. Gira sozinho até a pessoa escolher.
// Os itens vêm do wireframe; as telas são exemplos de interface.

const PUBLICOS = [
  {
    id: "cidadao",
    nome: "Para o cidadão",
    tela: "App da Câmara",
    sub: "Canais do cidadão com a Casa",
    canais: ["App", "WhatsApp"],
    itens: [
      { t: "App com assistente de IA", d: "O cidadão pergunta e recebe a resposta com a fonte oficial." },
      { t: "WhatsApp oficial com IA", d: "Demandas com foto e localização, já com protocolo." },
      { t: "TV Câmara ao vivo", d: "As sessões no app e no site, com a pauta do dia." },
      { t: "Atendimento em Libras", d: "Avatar e videochamada com tradução para a pessoa surda." },
    ],
  },
  {
    id: "vereador",
    nome: "Para o vereador",
    tela: "Painel do Vereador",
    sub: "Demandas da sua região",
    canais: ["Bairro", "Tema"],
    itens: [
      { t: "Painel do Vereador", d: "As demandas do mandato num só lugar." },
      { t: "Demandas por bairro e tema", d: "O que a população mais pede, região por região." },
      { t: "Histórico de respostas", d: "O que já foi respondido, com data e protocolo." },
      { t: "Pesquisas na sua região", d: "Ouvir os bairros antes de propor. Nas assembleias, Painel do Deputado." },
    ],
  },
  {
    id: "camara",
    nome: "Para a Câmara",
    tela: "Gestão da Câmara",
    sub: "Comissões, comunicação e processos",
    canais: ["Comissões", "Gestão"],
    itens: [
      { t: "Área das Comissões", d: "Pautas, pareceres e documentos de cada comissão." },
      { t: "Comunicação ativa", d: "Avisos da Casa enviados a quem pediu para receber." },
      { t: "Painel de gestão", d: "Volume, temas e satisfação do atendimento da Câmara." },
      { t: "Processo eletrônico", d: "Protocolo e proposições tramitando sem papel." },
    ],
  },
];

const PARA_QUEM = ["Câmaras Municipais", "Assembleias Legislativas"];

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
    <section ref={ref} className={`sc ${on ? "is-in" : ""}`} id="solucao">
      <div className="container">
        <header className="sc-head">
          <h2>Um produto,<br />três públicos.</h2>
          <div className="sc-head__side">
            <p>A mesma lógica do Cidade Conectada, pensada para câmaras municipais e assembleias legislativas.</p>
          </div>
        </header>

        <div className="sc-body">
          <div className="sc-acc">
            {PUBLICOS.map((p, i) => {
              const aberto = i === ativa;
              return (
                <div key={p.id} id={p.id} className={`sc-acc__item ${aberto ? "is-open" : ""}`}>
                  <button type="button" className="sc-acc__btn" aria-expanded={aberto} aria-controls={`lc-${p.id}`} onClick={() => escolher(i)}>
                    {p.nome}
                    <Mais aberto={aberto} />
                  </button>
                  <div className="sc-acc__panel" id={`lc-${p.id}`} role="region" aria-label={p.nome}>
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
              <span>Para:</span>
              {PARA_QUEM.map((o) => <a key={o} href="#ganhos" className="sc-chip">{o}</a>)}
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
