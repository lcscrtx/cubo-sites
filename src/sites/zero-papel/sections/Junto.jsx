import Icone from "../../../ds/Icone.jsx";
import { useInView, useTicker } from "../../../ds/motion.js";
import { CC_HOME, LC_HOME } from "../../comum/marcas.jsx";
import "../../cidade-conectada/sections/Produtos.css";
import "./Junto.css";

// Seção 5 · Junto com os outros produtos Cubo, no molde da seção de produtos do Cidade Conectada:
// cards com uma mini tela em cima. Cada mini tela mostra o pedido de fora virando processo eletrônico
// dentro da Casa, etapa por etapa. Os passos são exemplos de interface.

const JUNTOS = [
  {
    nome: "Com o Cidade Conectada",
    texto: "O que o cidadão pede no app ou no WhatsApp já chega à prefeitura como processo, sem redigitar nada.",
    href: CC_HOME,
    link: "Conhecer o Cidade Conectada",
    passos: [["app", "Pedido no app"], ["arquivo", "Processo eletrônico"], ["check", "Resposta ao cidadão"]],
  },
  {
    nome: "Com o Legislativo Conectado",
    texto: "Na Câmara, protocolo, proposições e documentos tramitam sem papel, com tudo rastreável.",
    href: LC_HOME,
    link: "Conhecer o Legislativo Conectado",
    passos: [["chat", "Demanda no WhatsApp"], ["arquivo", "Indicação protocolada"], ["check", "Tramitação sem papel"]],
  },
];

function Fluxo({ passos, on, atraso }) {
  const ativo = useTicker(on, 1400 + atraso) % passos.length;
  return (
    <div className="zpj">
      {passos.map(([ic, t], k) => (
        <div key={t} className="zpj__linha">
          {k > 0 && <i className={`zpj__fio ${k <= ativo ? "is-on" : ""}`} />}
          <span className={`zpj__passo ${k === ativo ? "is-now" : k < ativo ? "is-past" : ""}`}>
            <Icone nome={ic} size={15} />{t}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Junto() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`pd zpj-sec ${on ? "is-in" : ""}`} id="junto">
      <div className="container">
        <header className="pd-head">
          <h2>Ainda melhor junto<br />dos outros produtos Cubo.</h2>
          <div className="pd-head__side">
            <p>O Cidade Zero Papel funciona sozinho e também pode ser somado. Aí o pedido que vem de fora segue digital até a decisão.</p>
          </div>
        </header>

        <div className="pd-grid zpj-grid">
          {JUNTOS.map((j, i) => (
            <a key={j.nome} className="pd-card" href={j.href} style={{ "--d": `${i * 80}ms` }} data-in={on || undefined}>
              <div className="pd-card__art" aria-hidden="true"><Fluxo passos={j.passos} on={on} atraso={i * 200} /></div>
              <div className="pd-card__body">
                <h3>{j.nome}</h3>
                <p>{j.texto}</p>
                <span className="pd-card__more">
                  {j.link}
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
