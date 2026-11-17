import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Porte.css";
import "./Porte.css";

// Seção 6 · Porte do município no Zero Papel, no molde da seção de porte do Cidade Conectada.
// No lugar do mapa de quadras, uma mesa de documentos vista de cima: as folhas de papel (bege)
// viram processos digitais (azul) do centro para fora, conforme o tamanho da prefeitura.
// Faixas de habitantes e exemplos de cliente dependem da Cubo e ficam com o marcador amarelo.

const COLS = 12;
const ROWS = 8;

// células ordenadas da mais central para a mais distante (empate resolvido pela posição)
const ORDEM = Array.from({ length: COLS * ROWS }, (_, k) => {
  const i = k % COLS, j = Math.floor(k / COLS);
  const dx = i - (COLS - 1) / 2, dy = j - (ROWS - 1) / 2;
  return { k, d: Math.hypot(dx * 0.92, dy) };
}).sort((x, y) => x.d - y.d || x.k - y.k);

const RANK = new Array(COLS * ROWS);
ORDEM.forEach((c, r) => (RANK[c.k] = r));

/** nível de cada célula para uma cidade com n quadras: 3 centro, 2 médio, 1 borda, 0 vazio */
function cidade(n) {
  return RANK.map((r) => (r >= n ? 0 : r < n * 0.18 ? 3 : r < n * 0.5 ? 2 : 1));
}

const PORTES = [
  {
    titulo: <>Até <span className="ph">[X]</span> mil habitantes</>,
    rotulo: "Cidade pequena",
    texto: <span className="ph">Exemplo de início e cidade cliente</span>,
    celulas: cidade(12),
  },
  {
    titulo: <>De <span className="ph">[X]</span> a <span className="ph">[Y]</span> mil habitantes</>,
    rotulo: "Cidade média",
    texto: <span className="ph">Exemplo de início e cidade cliente</span>,
    celulas: cidade(34),
  },
  {
    titulo: <>Acima de <span className="ph">[Y]</span> mil habitantes</>,
    rotulo: "Cidade grande",
    texto: <span className="ph">Exemplo de início e cidade cliente</span>,
    celulas: cidade(72),
  },
];


export default function Porte() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const [ativo, setAtivo] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!on || manual || prefersReducedMotion()) return;
    const id = setInterval(() => setAtivo((a) => (a + 1) % PORTES.length), 4000);
    return () => clearInterval(id);
  }, [on, manual]);

  const escolher = (i) => {
    setManual(true);
    setAtivo(i);
  };

  return (
    <section ref={ref} className={`pt ${on ? "is-in" : ""}`} id="porte">
      <div className="container">
        <div className="pt-body">
          <div className="pt-copy">
            <h2>Do primeiro setor<br />à prefeitura inteira.</h2>
            <p className="pt-lead">Cidade pequena ou capital, o processo eletrônico é o mesmo. O que muda é quanto papel sai de circulação.</p>

            <ul className="pt-list">
              {PORTES.map((p, i) => (
                <li key={p.rotulo}>
                  <button type="button" className={i === ativo ? "is-active" : ""} aria-pressed={i === ativo} onClick={() => escolher(i)}>
                    <span className="pt-list__dot" aria-hidden="true" />
                    <span className="pt-list__text">
                      <strong>{p.titulo}</strong>
                      <span>{p.texto}</span>
                    </span>
                    {i === ativo && !manual && on && <span key={ativo} className="pt-list__timer" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-art" aria-hidden="true">
            <div className="pt-map zpo-map">
              {PORTES[ativo].celulas.map((nivel, k) => (
                <span key={k} className={`pt-cell zpo-folha pt-cell--${nivel}`} style={{ "--d": `${RANK[k] * 14}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
