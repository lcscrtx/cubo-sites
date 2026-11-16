import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import Grainient from "../../../ds/bg/Grainient.jsx";
import "./CtaFinal.css";

// CTA final: uma opção para cada momento da decisão. Reaproveitado nas páginas internas,
// que trocam título e texto (ex.: "Veja o SuperApp em ação…") e podem mostrar só o botão principal.
// Fundo: "Grainient" do React Bits, só com os azuis da marca. Monta quando a seção aparece.

const DEMO = "/cidade-conectada/demonstracao";
const MATERIAIS = "/cidade-conectada/materiais";

export default function CtaFinal({
  titulo = "Entre a prefeitura e o cidadão, a gente.",
  texto = "Veja em ação, leve para a sua equipe ou fale com um especialista.",
  rotuloBotao = "Agendar demonstração",
  hrefBotao = DEMO,
  completo = true, // false = só o botão principal
  acoes = null, // botões próprios (outros sites); substitui os padrões
  id = "materiais",
}) {
  const [ref, on] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`ct js-reveal ${on ? "is-in" : ""}`} id={id}>
      <div className="container">
        <div className="ct-panel reveal" id="demonstracao">
          <div className="ct-rays" aria-hidden="true">
            {on && (
              <Grainient
                colors={["#16205B", "#1F299C", "#0372FF", "#4F9BFF"]}
                angle={135}
                speed={prefersReducedMotion() ? 0 : 0.6}
                flow={0.9}
                softness={1}
                silk={0.5}
                grainAmount={0}
                contrast={1.05}
                stir={0.8}
              />
            )}
          </div>

          <h2>{titulo}</h2>
          {texto && <p className="ct-lead">{texto}</p>}

          <div className="ct-actions">
            {acoes ?? <a className="btn btn--light" href={hrefBotao}>{rotuloBotao}</a>}
            {!acoes && completo && (
              <>
                <a className="btn btn--outline-light" href={`${MATERIAIS}#video`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M6.5 5.4v5.2L10.6 8z" fill="currentColor" /></svg>
                  Assistir ao vídeo
                </a>
                <a className="btn btn--outline-light" href={`${MATERIAIS}#apresentacao`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8m0 0L4.8 7.3M8 10.5l3.2-3.2M3 13.5h10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Baixar apresentação
                </a>
              </>
            )}
          </div>

          {!acoes && completo && <p className="ct-note">A apresentação é o material para levar ao secretário ou ao prefeito.</p>}
        </div>
      </div>
    </section>
  );
}
