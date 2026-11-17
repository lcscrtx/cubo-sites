import Icone from "../../../ds/Icone.jsx";
import { useInView, useTicker } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Prova.css";
import "./Problema.css";

// Seção 2 · O problema (quadro "Legislativo Conectado · Home"), no molde da seção Prova do Cidade Conectada:
// painéis claros em grade, grade isométrica e uma mini tela inclinada em cada um.
// Três painéis mostram as dores do roteiro de apresentação; o quarto mostra a Câmara com o Legislativo Conectado.
// Tudo anima ao entrar na tela. Nomes e números das telas são exemplos de interface.

/* 1 · O trabalho nem sempre aparece: o cidadão pergunta à Câmara o que é da prefeitura */
const DUVIDAS = ["Quem conserta o buraco da minha rua?", "A Câmara pode trocar a lâmpada do poste?", "O que meu vereador fez este mês?"];
function Duvidas({ on }) {
  const i = useTicker(on, 2200) % DUVIDAS.length;
  return (
    <div className="pv-iso">
      <div className="pv-ui lp-duvida">
        <small>Pergunta do cidadão</small>
        <strong key={i}>{DUVIDAS[i]}</strong>
        <span className="lp-duvida__sem"><Icone nome="ajuda" size={13} />Sem resposta da Câmara</span>
      </div>
    </div>
  );
}

/* 2 · As demandas se perdem: pedidos chegando por canais soltos, sem protocolo */
const CANAIS = [["chat", "WhatsApp pessoal", "Iluminação na praça"], ["pessoas", "Na rua", "Calçada quebrada"], ["blog", "Rede social", "Coleta atrasada"]];
function Soltas({ on }) {
  const ativo = useTicker(on, 1600) % CANAIS.length;
  return (
    <div className="pv-iso">
      {CANAIS.map(([ic, canal, t], k) => (
        <div key={canal} className={`pv-ui pv-row lp-solta ${k === ativo ? "is-on" : ""}`} style={{ "--k": k }}>
          <span className="lp-solta__ico"><Icone nome={ic} size={13} /></span>
          <span><strong>{t}</strong><small>{canal}</small></span>
          <span className="pv-status lp-semprot">Sem protocolo</span>
        </div>
      ))}
    </div>
  );
}

/* 3 · Ninguém tem os dados: um painel vazio, com barras tracejadas */
function SemDados() {
  return (
    <div className="pv-iso">
      <div className="pv-ui lp-vazio">
        <span className="pv-progress__label">Demandas por bairro</span>
        <strong>Sem dados</strong>
        <div className="lp-vazio__barras">{[60, 85, 40, 70].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
      </div>
    </div>
  );
}

/* 4 · Com o Legislativo Conectado: as mesmas demandas com protocolo, bairro e resposta */
const ORGANIZADAS = [["Iluminação na praça", "Centro", "Respondida", "ok"], ["Calçada quebrada", "Bairro Novo", "Na sessão", "run"], ["Coleta atrasada", "Vila Nova", "Recebida", "new"]];
function Organizadas() {
  return (
    <div className="pv-iso">
      {ORGANIZADAS.map(([t, bairro, st, c], k) => (
        <div key={t} className="pv-ui pv-row" style={{ "--k": k }}>
          <span className="pv-row__icon" />
          <span><strong>{t}</strong><small className="lp-bairro">Protocolo 20{41 + k} · {bairro}</small></span>
          <span className={`pv-status pv-status--${c}`}>{st}</span>
        </div>
      ))}
    </div>
  );
}

const PAINEIS = [
  { titulo: "O trabalho nem sempre aparece", texto: "O cidadão ainda confunde o papel do vereador com o da prefeitura.", tom: "azul", Ui: Duvidas },
  { titulo: "As demandas se perdem", texto: "Chegam por vários canais, sem protocolo e sem resposta organizada.", tom: "verde", Ui: Soltas },
  { titulo: "Ninguém tem os dados", texto: "Faltam dados sobre bairros, temas e satisfação do cidadão.", tom: "amarelo", Ui: SemDados },
  { titulo: "Com o Legislativo Conectado", texto: "Cada demanda ganha protocolo, bairro e resposta, e a Câmara passa a enxergar a cidade.", tom: "celeste", Ui: Organizadas, solucao: true },
];

function Painel({ titulo, texto, tom, Ui, index, solucao }) {
  const [ref, on] = useInView({ threshold: 0.35 });
  return (
    <article ref={ref} className={`pv-panel pv-panel--${tom} ${solucao ? "lp-solucao" : ""} ${on ? "is-in" : ""}`} style={{ "--delay": `${(index % 2) * 120}ms` }}>
      <div className="pv-panel__copy">
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
      <div className="pv-panel__art" aria-hidden="true">
        <div className="pv-grid-lines" />
        <Ui on={on} />
      </div>
    </article>
  );
}

export default function Problema() {
  const [headRef, headOn] = useInView({ threshold: 0.4 });
  return (
    <section className="pv" id="problema">
      <div className="container">
        <header ref={headRef} className={`pv-head pv-reveal ${headOn ? "is-in" : ""}`}>
          <h2>A Câmara trabalha.<br />Mas o cidadão vê?</h2>
          <div className="pv-head__side">
            <p>Três dores que aparecem em quase toda Câmara, de qualquer tamanho, e o que muda quando a Casa ganha um canal digital próprio.</p>
          </div>
        </header>
        <div className="pv-grid">
          {PAINEIS.map((p, i) => <Painel key={p.tom} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
