import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Jornada.css";

// Seção 4 · Jornada do processo, no mesmo molde da jornada do Cidade Conectada: um único processo
// atravessa as 5 etapas da home anterior do Zero Papel e a linha do tempo do cartão cresce a cada passo.
// Avança sozinho a cada 3,5 s; clicar numa etapa leva direto a ela.
// O número do processo, o pedido e os setores do cartão são exemplos de interface.

const ETAPAS = [
  { titulo: "Protocolo", texto: "O processo nasce digital.", evento: "Pedido de alvará protocolado pelo portal", canal: "Protocolo" },
  { titulo: "Tramitação", texto: "Etapas e responsáveis definidos.", evento: "Encaminhado à fiscalização de obras", canal: "Secretaria de Obras" },
  { titulo: "Assinatura", texto: "Documentos assinados eletronicamente.", evento: "Parecer assinado pelo secretário", canal: "Assinatura eletrônica" },
  { titulo: "Publicidade", texto: "Acompanhamento e transparência.", evento: "Decisão publicada e cidadão avisado", canal: "Portal" },
  { titulo: "Arquivo", texto: "Tudo guardado e rastreável.", evento: "Processo arquivado com todo o histórico", canal: "Arquivo digital" },
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
    <section ref={ref} className={`jn ${on ? "is-in" : ""}`} id="jornada">
      <div className="container">
        <header className="jn-head">
          <h2>Um processo 100% digital<br />de ponta a ponta.</h2>
          <p>Do pedido que chega ao documento arquivado, sem imprimir nada no caminho. Em cada etapa fica registrado quem fez e quando.</p>
        </header>

        <div className="jn-stage" aria-hidden="true">
          <div className="jn-grid-lines" />
          <div className="jn-plane">
            <div className="jn-card">
              <header className="jn-card__head">
                <span className="jn-card__icon" />
                <div>
                  <strong>Processo 4021/2026 · Alvará</strong>
                  <small>Secretaria de Obras</small>
                </div>
                <span className={`jn-card__status ${fim ? "is-done" : ""}`}>{fim ? "Arquivado" : "Em andamento"}</span>
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
