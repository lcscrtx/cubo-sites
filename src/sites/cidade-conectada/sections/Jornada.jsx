import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "./Jornada.css";

// Seção 5 · Como funciona: a jornada de um pedido, ponta a ponta.
// Um único protocolo atravessa as 5 etapas; a linha do tempo do card cresce a cada passo.
// Avança sozinho a cada 3,5 s; clicar numa etapa leva direto a ela.

const ETAPAS = [
  { titulo: "Cidadão pede", texto: "Pelo canal mais fácil, com foto ou vídeo.", evento: "Maria enviou foto e localização", canal: "WhatsApp" },
  { titulo: "Recebe protocolo", texto: "A solicitação fica registrada.", evento: "Protocolo 18733 enviado à cidadã", canal: "IA" },
  { titulo: "Secretaria recebe", texto: "O pedido chega ao órgão responsável.", evento: "Encaminhado à Infraestrutura", canal: "Interoperabilidade" },
  { titulo: "Equipe executa", texto: "A demanda segue até a conclusão.", evento: "OS aberta para a equipe da região", canal: "Conecta OS" },
  { titulo: "Todos acompanham", texto: "Cidadão recebe mensagens; gestão vê os dados.", evento: "Concluído e cidadã avisada", canal: "App" },
];

const DURACAO = 3500;

export default function Jornada() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const [passo, setPasso] = useState(0);
  const [ciclo, setCiclo] = useState(0); // reinicia a barra de tempo ao clicar

  useEffect(() => {
    if (!on || prefersReducedMotion()) return;
    const id = setTimeout(() => setPasso((p) => (p + 1) % ETAPAS.length), DURACAO);
    return () => clearTimeout(id);
  }, [on, passo, ciclo]);

  const ir = (i) => {
    setPasso(i);
    setCiclo((c) => c + 1);
  };

  return (
    <section ref={ref} className={`jn ${on ? "is-in" : ""}`} id="como-funciona">
      <div className="container">
        <header className="jn-head">
          <h2>Do pedido do cidadão<br />à resposta da prefeitura.</h2>
          <p>Cada solicitação vira um protocolo que passa por todas as etapas, e todo mundo acompanha em tempo real: quem pediu, quem executa e quem decide.</p>
        </header>

        <div className="jn-stage" aria-hidden="true">
          <div className="jn-grid-lines" />
          <div className="jn-plane">
            <div className="jn-card">
              <header className="jn-card__head">
                <span className="jn-card__icon" />
                <div>
                  <strong>Protocolo 18733 · Iluminação pública</strong>
                  <small>Rua das Trincheiras, 412 · Bairro dos Estados</small>
                </div>
                <span className={`jn-card__status ${passo === ETAPAS.length - 1 ? "is-done" : ""}`}>
                  {passo === ETAPAS.length - 1 ? "Concluído" : "Em andamento"}
                </span>
              </header>
              <ol className="jn-card__timeline">
                {ETAPAS.map((e, i) => (
                  <li key={e.titulo} className={i < passo ? "is-past" : i === passo ? "is-now" : "is-next"}>
                    <i />
                    <span>{e.evento}</span>
                    <em>{e.canal}</em>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <ol className="jn-steps">
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className={i === passo ? "is-now" : i < passo ? "is-past" : ""}>
              <button type="button" onClick={() => ir(i)} aria-current={i === passo ? "step" : undefined}>
                <span className="jn-steps__bar">
                  {i === passo && on && <span key={`${passo}-${ciclo}`} className="jn-steps__fill" style={{ animationDuration: `${DURACAO}ms` }} />}
                </span>
                <span className="jn-steps__num">{String(i + 1).padStart(2, "0")}</span>
                <strong>{e.titulo}</strong>
                <span className="jn-steps__txt">{e.texto}</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="jn-nota"><span className="ph">Validar como IA, WhatsApp e Conecta OS entram nesta jornada</span></p>
      </div>
    </section>
  );
}
