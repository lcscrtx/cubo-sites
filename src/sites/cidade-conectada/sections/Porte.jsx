import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "./Porte.css";

// Seção 6 · Porte do município: responde "serve para a minha cidade?".
// Mapa plano de quadradinhos visto de cima. A mancha cresce do centro para fora, em anéis:
// centro em azul forte, depois médio, depois claro. Mesma grade nos três portes, para comparar.
// As células não remontam ao trocar de porte: só mudam de cor, em ordem de distância do centro.

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
    texto: "Referência: João Pessoa, com oferta de serviços por todas as secretarias.",
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
            <h2>Para cidades de<br />todos os portes.</h2>
            <p className="pt-lead">Comece pelo que a sua prefeitura precisa agora e amplie quando fizer sentido. O mesmo produto atende a cidade pequena e a capital.</p>

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
            <div className="pt-map">
              {PORTES[ativo].celulas.map((nivel, k) => (
                <span key={k} className={`pt-cell pt-cell--${nivel}`} style={{ "--d": `${RANK[k] * 14}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
