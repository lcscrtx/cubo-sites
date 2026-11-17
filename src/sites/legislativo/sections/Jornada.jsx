import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Jornada.css";

// Seção 5 · Jornada do cidadão (quadro "Legislativo Conectado · Home"), no mesmo molde da jornada do
// Cidade Conectada: um único protocolo atravessa as 5 etapas do wireframe e a linha do tempo do cartão
// cresce a cada passo. Avança sozinho a cada 3,5 s; clicar numa etapa leva direto a ela.
// O protocolo, a rua e o bairro do cartão são exemplos de interface.

const ETAPAS = [
  { titulo: "Envia", texto: "Mensagem no WhatsApp oficial da Câmara.", evento: "Cidadão relatou a praça sem iluminação", canal: "WhatsApp" },
  { titulo: "Recebe protocolo", texto: "A IA pede foto e localização.", evento: "Protocolo 2041 enviado ao cidadão", canal: "IA" },
  { titulo: "Vereador recebe", texto: "A demanda chega por bairro ou tema.", evento: "Encaminhada ao vereador do Centro", canal: "Painel do Vereador" },
  { titulo: "Câmara responde", texto: "A ação fica registrada.", evento: "Indicação 118/2026 enviada à prefeitura", canal: "Processo eletrônico" },
  { titulo: "Cidadão participa", texto: "Acompanha, avalia e assiste às sessões.", evento: "Cidadão avaliou a resposta", canal: "App" },
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
  const fim = passo === ETAPAS.length - 1;

  return (
    <section ref={ref} className={`jn ${on ? "is-in" : ""}`} id="como-funciona">
      <div className="container">
        <header className="jn-head">
          <h2>Do problema no bairro<br />à resposta da Câmara.</h2>
          <p>Cada demanda vira um protocolo que passa por todas as etapas, e todo mundo acompanha: o cidadão que pediu, o vereador que responde e a Câmara que registra.</p>
        </header>

        <div className="jn-stage" aria-hidden="true">
          <div className="jn-grid-lines" />
          <div className="jn-plane">
            <div className="jn-card">
              <header className="jn-card__head">
                <span className="jn-card__icon" />
                <div>
                  <strong>Protocolo 2041 · Iluminação da praça</strong>
                  <small>Praça da Matriz · Centro</small>
                </div>
                <span className={`jn-card__status ${fim ? "is-done" : ""}`}>{fim ? "Respondida" : "Em andamento"}</span>
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
      </div>
    </section>
  );
}
