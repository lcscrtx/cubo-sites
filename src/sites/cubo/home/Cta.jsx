import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import { useInView } from "../../../ds/motion.js";
import { CONTATO } from "../../../ds/contato.js";
import { FALE } from "../Layout.jsx";
import "./Cta.css";

// CTA final na linha do mindcloud.co ("Ready to connect everything? Let's talk."): painel azul da Cubo,
// título em dois tons e, à direita, o símbolo da Cubo em traço fino com as linhas de construção,
// como o desenho do logo no painel do mindcloud. O traço se desenha quando o painel aparece.

// as duas peças do símbolo da Cubo (coordenadas do logo, legado/src/components/IconeGrade.jsx)
export const PECA_A = [[208.3, 355.8], [208.2, 372.0], [171.3, 372.0], [171.3, 408.9], [155.1, 408.9], [155.1, 391.5], [190.9, 355.8]];
export const PECA_B = [[178.2, 416.0], [215.2, 415.8], [215.2, 379.0], [231.5, 379.0], [231.5, 395.8], [195.4, 432.0], [178.2, 432.0]];
const pontos = (p) => p.map((q) => q.join(",")).join(" ");
const VERTICAIS = [155.1, 171.3, 215.2, 231.5];
const HORIZONTAIS = [355.8, 372.0, 416.0, 432.0];

/** semSobre: esconde o botão "Sobre a Cubo" quando o CTA está na própria página Sobre */
export default function Cta({ semSobre = false }) {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <section ref={ref} className={`ct js-reveal ${on ? "is-in" : ""}`} id="contato">
      <div className="container">
        <div className="ct__panel">
          <div className="ct__copy">
            <h2>Vamos transformar a gestão da sua cidade?<br /><span>Vamos conversar.</span></h2>
            <div className="ct__actions">
              <a className="ct__btn ct__btn--claro" href={FALE}>Falar com a equipe</a>
              <a className="ct__btn" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={15} />WhatsApp</a>
              {!semSobre && <Link className="ct__btn" to="/sobre">Sobre a Cubo</Link>}
            </div>
          </div>

          <svg className="ct__art" viewBox="120 330 150 125" aria-hidden="true">
            <g className="ct__grade">
              {VERTICAIS.map((x) => <line key={`v${x}`} x1={x} y1="300" x2={x} y2="480" />)}
              {HORIZONTAIS.map((y) => <line key={`h${y}`} x1="100" y1={y} x2="300" y2={y} />)}
            </g>
            <polygon className="ct__peca" points={pontos(PECA_A)} pathLength="1" />
            <polygon className="ct__peca ct__peca--b" points={pontos(PECA_B)} pathLength="1" />
            {[...PECA_A, ...PECA_B].map(([x, y]) => <circle key={`${x},${y}`} cx={x} cy={y} r="1.1" className="ct__ponto" />)}
          </svg>
        </div>
      </div>
    </section>
  );
}
