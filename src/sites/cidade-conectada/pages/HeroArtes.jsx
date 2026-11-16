import { useEffect, useState } from "react";
import Icone from "../../../ds/Icone.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import { ARTES } from "../sections/ProdutoArt.jsx";
import { PRODUTOS } from "../data/produtos.js";

// Ilustrações dos heroes das páginas internas. Sempre sobre o fundo azul do HeroCor,
// com cards brancos e um movimento simples ligado ao tema da página.

function useCiclo(n, ms) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
}

/** Produtos: os 6 produtos orbitando o Cidade Conectada; um de cada vez acende. */
export function Orbita() {
  const ativo = useCiclo(PRODUTOS.length, 1600);
  return (
    <div className="ha-orbit">
      <div className="ha-orbit__ring" />
      <div className="ha-orbit__hub"><img src="/favicon.svg" alt="" width="44" height="44" /></div>
      {PRODUTOS.map((p, i) => (
        <div key={p.slug} className={`ha-orbit__item ${i === ativo ? "is-on" : ""}`} style={{ "--a": `${(360 / PRODUTOS.length) * i - 90}deg` }}>
          <span className="ha-orbit__tile"><Icone nome={p.icone} size={22} /></span>
          <span className="ha-orbit__label">{p.curto}</span>
        </div>
      ))}
    </div>
  );
}

/** Produto: a tela do produto numa janela, com um selo de "parte do Cidade Conectada". */
export function TelaProduto({ arte, nome }) {
  const A = ARTES[arte];
  return (
    <div className="ha-window">
      <div className="ha-window__bar"><i /><i /><i /><span>{nome}</span></div>
      <div className="ha-window__body"><A /></div>
      <span className="ha-chip"><img src="/favicon.svg" alt="" width="16" height="16" />Parte do Cidade Conectada</span>
    </div>
  );
}

/** Secretarias: lista de serviços em uso, um acendendo por vez, com a secretaria ao lado. */
const SERVICOS = [
  { s: "Cartão SUS", sec: "Saúde", i: "saude" },
  { s: "Iluminação pública", sec: "Infraestrutura", i: "infra" },
  { s: "Poda de árvores", sec: "Meio Ambiente", i: "ambiente" },
  { s: "Castração", sec: "Proteção Animal", i: "pata" },
  { s: "Certidão negativa", sec: "Finanças", i: "moeda" },
];
export function ServicosVivos() {
  const ativo = useCiclo(SERVICOS.length, 1400);
  return (
    <div className="ha-card ha-list">
      <div className="ha-card__head"><strong>Serviços em uso</strong><span>João Pessoa na Palma da Mão</span></div>
      <ul>
        {SERVICOS.map((x, i) => (
          <li key={x.s} className={i === ativo ? "is-on" : ""}>
            <span className="ha-list__ico"><Icone nome={x.i} size={16} /></span>
            <span className="ha-list__s">{x.s}</span>
            <em>{x.sec}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** História de João Pessoa: a média mensal de demandas crescendo de 2024 para 2025. */
export function CrescimentoJP() {
  const meses = [52, 55, 58, 60, 63, 66, 72, 78, 84, 88, 94, 100];
  return (
    <div className="ha-card ha-growth">
      <div className="ha-card__head"><strong>Demandas por mês</strong><span>média</span></div>
      <div className="ha-growth__nums">
        <div><small>2024</small><b>9.566</b></div>
        <span className="ha-growth__arrow"><Icone nome="seta" size={18} /></span>
        <div><small>2025</small><b>15.674</b></div>
        <em>+64%</em>
      </div>
      <div className="ha-growth__bars">
        {meses.map((h, i) => <i key={i} style={{ height: `${h}%`, "--d": `${i * 60}ms` }} />)}
      </div>
      <span className="ha-chip ha-chip--bottom"><Icone nome="pessoas" size={14} />+450 mil usuários em abril de 2026</span>
    </div>
  );
}

/** Como contratar: o caminho da contratação avançando etapa por etapa. */
const ETAPAS = ["Conversa", "Demonstração", "Proposta", "Documentação", "Contrato", "Implantação"];
export function CaminhoContrato() {
  const passo = useCiclo(ETAPAS.length + 1, 1100);
  return (
    <div className="ha-card ha-path">
      <div className="ha-card__head"><strong>Contratação</strong><span>Prefeitura Municipal</span></div>
      <ol>
        {ETAPAS.map((e, i) => (
          <li key={e} className={i < passo ? "is-done" : i === passo ? "is-now" : ""}>
            <span className="ha-path__dot" />
            <span>{e}</span>
            {i < passo && <em>Feito</em>}
          </li>
        ))}
      </ol>
    </div>
  );
}
