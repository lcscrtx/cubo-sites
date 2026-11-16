import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "./Secretarias.css";

// Seção 3 · O que dá para fazer na sua secretaria.
// Layout inspirado no "Built for how you actually work" do getsymmetry.com:
// acordeão à esquerda, painel azul com mini tela isométrica à direita.
// Gira sozinho entre as secretarias até a pessoa clicar em uma.

const SECRETARIAS = [
  {
    id: "saude",
    nome: "Saúde",
    itens: [
      { t: "Exames e cirurgias", d: "Marcação e acompanhamento da fila pelo app." },
      { t: "Cartão SUS", d: "Pedido e segunda via sem ir ao posto." },
      { t: "Vacinação domiciliar", d: "Agendamento para quem não pode sair de casa." },
      { t: "Remédio em Casa", d: "Entrega de medicamentos de uso contínuo." },
    ],
  },
  {
    id: "infraestrutura",
    nome: "Infraestrutura e Zeladoria",
    itens: [
      { t: "Iluminação pública", d: "Poste apagado registrado com foto e localização." },
      { t: "Tapa-buraco", d: "Pedido vai direto para a equipe da região." },
      { t: "Coleta de poda", d: "Agendamento da retirada de galhos e entulho." },
      { t: "Limpeza de terrenos", d: "Denúncia de terreno baldio com mato ou lixo." },
    ],
  },
  {
    id: "meio-ambiente",
    nome: "Meio Ambiente",
    itens: [
      { t: "Poda de árvores", d: "Solicitação com avaliação técnica da secretaria." },
      { t: "Poluição sonora", d: "Denúncia registrada e encaminhada à fiscalização." },
      { t: "Esgoto a céu aberto", d: "Ocorrência com foto, local e acompanhamento." },
      { t: "Áreas de preservação", d: "Denúncia de ocupação ou desmatamento." },
    ],
  },
];

const OUTRAS = ["Desenvolvimento Social", "Finanças", "Mobilidade", "Desenvolvimento Urbano", "Proteção Animal", "Educação", "Procon, Defesa Civil e mais"];

function Mais({ aberto }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="sc-acc__icon">
      <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {!aberto && <path d="M7 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}

function Tela({ s, ativa }) {
  return (
    <div className={`sc-plane ${ativa ? "is-active" : ""}`} aria-hidden={!ativa}>
      <div className="sc-ui">
        <header className="sc-ui__head">
          <span className="sc-ui__icon" />
          <div>
            <strong>Secretaria de {s.nome}</strong>
            <small>Serviços disponíveis no app e no WhatsApp</small>
          </div>
        </header>
        <ul className="sc-ui__list">
          {s.itens.slice(0, 3).map((i, n) => (
            <li key={i.t} style={{ "--d": `${120 + n * 90}ms` }}>
              <span>{i.t}</span>
              <em>App</em>
              <em>WhatsApp</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Secretarias() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const [ativa, setAtiva] = useState(0);
  const [manual, setManual] = useState(false);

  // gira sozinho a cada 5 s até a pessoa escolher uma secretaria
  useEffect(() => {
    if (!on || manual || prefersReducedMotion()) return;
    const id = setInterval(() => setAtiva((a) => (a + 1) % SECRETARIAS.length), 5000);
    return () => clearInterval(id);
  }, [on, manual]);

  const escolher = (i) => {
    setManual(true);
    setAtiva(i);
  };

  return (
    <section ref={ref} className={`sc ${on ? "is-in" : ""}`} id="secretarias">
      <div className="container">
        <header className="sc-head">
          <h2>O que dá para fazer<br />na sua secretaria.</h2>
          <div className="sc-head__side">
            <p>Exemplos reais de serviços que as prefeituras já oferecem com o Cidade Conectada, organizados por pasta.</p>
            <a className="sc-link" href="/cidade-conectada/secretarias">
              Ver todos os exemplos
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>

        <div className="sc-body">
          <div className="sc-acc">
            {SECRETARIAS.map((s, i) => {
              const aberto = i === ativa;
              return (
                <div key={s.id} className={`sc-acc__item ${aberto ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="sc-acc__btn"
                    aria-expanded={aberto}
                    aria-controls={`sc-${s.id}`}
                    onClick={() => escolher(i)}
                  >
                    {s.nome}
                    <Mais aberto={aberto} />
                  </button>
                  <div className="sc-acc__panel" id={`sc-${s.id}`} role="region" aria-label={s.nome}>
                    <div className="sc-acc__inner">
                      <ul>
                        {s.itens.map((it) => (
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
              <span>Também:</span>
              {OUTRAS.map((o) => <a key={o} href="/cidade-conectada/secretarias" className="sc-chip">{o}</a>)}
            </div>
          </div>

          <div className="sc-art" aria-hidden="true">
            <div className="sc-grid-lines" />
            {SECRETARIAS.map((s, i) => <Tela key={s.id} s={s} ativa={i === ativa} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
