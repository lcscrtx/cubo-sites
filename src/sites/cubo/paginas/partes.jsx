import { useInView } from "../../../ds/motion.js";
import { PECA_A, PECA_B } from "../home/Cta.jsx";
import "../sobre.css";
import "./paginas.css";

// Peças comuns às páginas internas da Cubo (Soluções, Carreiras, Contato), no molde do topo do Sobre:
// fundo claro, título à esquerda, apoio e botões à direita e, opcionalmente, o painel escuro com o símbolo.

const pontos = (p) => p.map((q) => q.join(",")).join(" ");

/** Símbolo da Cubo em traço fino, com as linhas de construção (o mesmo do painel do Sobre). */
export function MarcaTraco({ className = "st__marca" }) {
  return (
    <svg className={className} viewBox="120 330 150 125" aria-hidden="true">
      <g className="ct__grade">
        {[155.1, 171.3, 215.2, 231.5].map((x) => <line key={`v${x}`} x1={x} y1="300" x2={x} y2="480" />)}
        {[355.8, 372.0, 416.0, 432.0].map((y) => <line key={`h${y}`} x1="100" y1={y} x2="300" y2={y} />)}
      </g>
      <polygon className="ct__peca" points={pontos(PECA_A)} pathLength="1" />
      <polygon className="ct__peca ct__peca--b" points={pontos(PECA_B)} pathLength="1" />
    </svg>
  );
}

/** Topo das páginas internas. fatos: lista [valor, rótulo] para o painel escuro; sem fatos, não há painel. */
export function Topo({ selo, titulo, texto, acoes, fatos }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`st js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <div className="st__head reveal">
          <div>
            <span className="sb-selo">{selo}</span>
            <h1>{titulo}</h1>
          </div>
          <div className="st__side">
            <p>{texto}</p>
            {acoes && <div className="pg-acoes">{acoes}</div>}
          </div>
        </div>

        {fatos && (
          <div className="st__panel reveal" style={{ "--rd": "120ms" }}>
            <MarcaTraco />
            <dl className="st__fatos">
              {fatos.map(([v, r]) => <div key={r}><dd>{v}</dd><dt>{r}</dt></div>)}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

/** Cabeçalho de seção: selo, título e, ao lado, um texto de apoio. */
export function Cabeca({ selo, titulo, texto }) {
  return (
    <header className="pg-cabeca reveal">
      <div>
        <span className="sb-selo">{selo}</span>
        <h2>{titulo}</h2>
      </div>
      {texto && <p>{texto}</p>}
    </header>
  );
}
