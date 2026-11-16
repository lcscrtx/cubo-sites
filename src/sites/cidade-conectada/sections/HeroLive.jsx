import { useEffect, useState } from "react";
import Icone from "../../../ds/Icone.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import "./HeroLive.css";

// A cena do hero é o próprio slogan: "Entre a prefeitura e o cidadão, a gente."
// Cidadão à esquerda, Cidade Conectada ("a gente") no meio, prefeitura à direita.
// Um pedido sai do celular, passa pelo Cidade Conectada, chega à secretaria certa
// e volta como resposta. Repete com três casos que o próprio site já conta.

const CASOS = [
  { canal: "WhatsApp", pedido: "Tem um poste apagado na minha rua.", sec: "Infraestrutura", icone: "infra", protocolo: "18733", resposta: "Poste consertado. Obrigado por avisar!" },
  { canal: "App", pedido: "Quero pedir meu Cartão SUS.", sec: "Saúde", icone: "saude", protocolo: "18734", resposta: "Seu Cartão SUS está pronto no app." },
  { canal: "WhatsApp", pedido: "Tem uma árvore caindo na calçada.", sec: "Meio Ambiente", icone: "ambiente", protocolo: "18735", resposta: "Poda agendada para amanhã." },
];
const SECRETARIAS = [
  { nome: "Infraestrutura", icone: "infra" },
  { nome: "Saúde", icone: "saude" },
  { nome: "Meio Ambiente", icone: "ambiente" },
];

// fases de cada caso: 0 cidadão envia · 1 passa pelo Cidade Conectada · 2 secretaria recebe · 3 resposta volta
const FASES = 4;
const PASSO_MS = 1100;

export default function HeroLive() {
  const reduzido = prefersReducedMotion();
  const [t, setT] = useState(reduzido ? 3 : 0);

  useEffect(() => {
    if (reduzido) return;
    const id = setInterval(() => setT((x) => x + 1), PASSO_MS);
    return () => clearInterval(id);
  }, [reduzido]);

  const caso = CASOS[Math.floor(t / FASES) % CASOS.length];
  const fase = t % FASES;

  return (
    <div className="hl" aria-hidden="true">
      {/* Cidadão */}
      <div className="hl-node hl-node--cidadao">
        <div className="hl-phone">
          <div className="hl-phone__top">
            <span className={`hl-phone__canal hl-phone__canal--${caso.canal === "App" ? "app" : "wa"}`}>
              <Icone nome={caso.canal === "App" ? "app" : "chat"} size={14} />
            </span>
            <span>{caso.canal === "App" ? "App da Prefeitura" : "WhatsApp da Prefeitura"}</span>
          </div>
          <div className="hl-phone__chat" key={caso.protocolo}>
            <p className="hl-msg hl-msg--out">{caso.pedido}</p>
            {fase >= 1 && <p className="hl-msg hl-msg--in hl-msg--small">Recebido. Protocolo {caso.protocolo}.</p>}
            {fase === 3 && <p className="hl-msg hl-msg--in">{caso.resposta}</p>}
          </div>
        </div>
        <span className="hl-label">Cidadão</span>
      </div>

      {/* Trilho cidadão → Cidade Conectada */}
      <div className={`hl-wire ${fase === 0 ? "is-go" : ""} ${fase === 3 ? "is-back" : ""}`}><i /></div>

      {/* Cidade Conectada: "a gente" */}
      <div className="hl-node hl-node--hub">
        <div className={`hl-hub ${fase === 1 ? "is-on" : ""}`}>
          <img src="/favicon.svg" alt="" width="40" height="40" />
        </div>
        <span className="hl-label hl-label--hub">Cidade Conectada</span>
      </div>

      {/* Trilho Cidade Conectada → prefeitura */}
      <div className={`hl-wire ${fase === 1 ? "is-go" : ""} ${fase === 3 ? "is-back" : ""}`}><i /></div>

      {/* Prefeitura */}
      <div className="hl-node hl-node--prefeitura">
        <div className="hl-panel">
          <div className="hl-panel__top">
            <strong>Prefeitura</strong>
            <span>Pedidos de hoje</span>
          </div>
          <ul>
            {SECRETARIAS.map((s) => {
              const ativa = s.nome === caso.sec && fase >= 2;
              const status = ativa ? (fase === 3 ? "Concluído" : "Recebido") : null;
              return (
                <li key={s.nome} className={ativa ? "is-on" : ""}>
                  <span className="hl-panel__ico"><Icone nome={s.icone} size={16} /></span>
                  <span className="hl-panel__name">{s.nome}</span>
                  {status && <em className={fase === 3 ? "is-done" : ""}>{status}</em>}
                </li>
              );
            })}
          </ul>
        </div>
        <span className="hl-label">Prefeitura</span>
      </div>
    </div>
  );
}
