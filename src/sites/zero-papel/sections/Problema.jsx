import Icone from "../../../ds/Icone.jsx";
import { useInView, useTicker } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Prova.css";
import "./Problema.css";

// Seção 2 · O problema do papel, no molde da seção Prova do Cidade Conectada (e do problema do Legislativo):
// painéis claros em grade, grade isométrica e uma mini tela inclinada em cada um.
// Três painéis mostram a rotina com papel; o quarto mostra a mesma rotina com o Cidade Zero Papel.
// Tudo anima ao entrar na tela. Números e setores das telas são exemplos de interface.

/* 1 · Ninguém sabe onde está o processo */
const PERGUNTAS = ["Onde está o processo do alvará?", "Já saiu da Procuradoria?", "Quem está com a pasta do contrato?"];
function Sumido({ on }) {
  const i = useTicker(on, 2200) % PERGUNTAS.length;
  return (
    <div className="pv-iso">
      <div className="pv-ui zpp-sumido">
        <small>Pergunta no corredor</small>
        <strong key={i}>{PERGUNTAS[i]}</strong>
        <span className="zpp-alerta"><Icone nome="ajuda" size={13} />Localização desconhecida</span>
      </div>
    </div>
  );
}

/* 2 · Tudo para esperando imprimir, assinar e levar */
const FILA = [["Ofício à Secretaria de Saúde", "Impresso"], ["Parecer da Procuradoria", "Na mesa do secretário"], ["Contrato de manutenção", "Levando ao protocolo"]];
function Fila({ on }) {
  const ativo = useTicker(on, 1600) % FILA.length;
  return (
    <div className="pv-iso">
      {FILA.map(([t, onde], k) => (
        <div key={t} className={`pv-ui pv-row zpp-fila ${k === ativo ? "is-on" : ""}`} style={{ "--k": k }}>
          <span className="zpp-fila__ico"><Icone nome="arquivo" size={13} /></span>
          <span><strong>{t}</strong><small>{onde}</small></span>
          <span className="pv-status zpp-espera">Aguardando</span>
        </div>
      ))}
    </div>
  );
}

/* 3 · O arquivo vira uma sala de caixas */
function Caixas() {
  return (
    <div className="pv-iso">
      <div className="pv-ui zpp-arquivo">
        <span className="pv-progress__label">Arquivo geral</span>
        <div className="zpp-estante">
          {["2019", "2020", "2021", "2022", "2023", "2024"].map((a) => <i key={a}><small>{a}</small></i>)}
        </div>
        <small className="zpp-arquivo__busca"><Icone nome="ajuda" size={12} />Busca manual, caixa por caixa</small>
      </div>
    </div>
  );
}

/* 4 · Com o Cidade Zero Papel: os mesmos documentos tramitando, com etapa e responsável */
const DIGITAIS = [["Ofício à Secretaria de Saúde", "Assinado", "ok"], ["Parecer da Procuradoria", "Em análise", "run"], ["Contrato de manutenção", "Protocolado", "new"]];
function Digitais() {
  return (
    <div className="pv-iso">
      {DIGITAIS.map(([t, st, c], k) => (
        <div key={t} className="pv-ui pv-row" style={{ "--k": k }}>
          <span className="pv-row__icon" />
          <span><strong>{t}</strong><small className="zpp-sub">Processo 40{21 + k}/2026</small></span>
          <span className={`pv-status pv-status--${c}`}>{st}</span>
        </div>
      ))}
    </div>
  );
}

const PAINEIS = [
  { titulo: "O processo some na gaveta", texto: "Ninguém sabe em que mesa ele está, nem há quanto tempo está parado.", tom: "azul", Ui: Sumido },
  { titulo: "Tudo espera o papel", texto: "Imprimir, assinar à mão e levar de um setor a outro atrasa cada resposta.", tom: "verde", Ui: Fila },
  { titulo: "O arquivo vira um depósito", texto: "Caixas ocupam salas e achar um documento antigo leva horas.", tom: "amarelo", Ui: Caixas },
  { titulo: "Com o Cidade Zero Papel", texto: "Cada documento tramita digital, com etapa, responsável e assinatura eletrônica.", tom: "celeste", Ui: Digitais, solucao: true },
];

function Painel({ titulo, texto, tom, Ui, index, solucao }) {
  const [ref, on] = useInView({ threshold: 0.35 });
  return (
    <article ref={ref} className={`pv-panel pv-panel--${tom} ${solucao ? "zpp-solucao" : ""} ${on ? "is-in" : ""}`} style={{ "--delay": `${(index % 2) * 120}ms` }}>
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
          <h2>A prefeitura ainda<br />roda no papel?</h2>
          <div className="pv-head__side">
            <p>Três cenas comuns na rotina de quem protocola, tramita e assina, e o que muda quando o processo nasce digital.</p>
          </div>
        </header>
        <div className="pv-grid">
          {PAINEIS.map((p, i) => <Painel key={p.tom} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
