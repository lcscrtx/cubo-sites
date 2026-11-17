import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Porte.css";
import "./Porte.css";

// Seção 7 · Porte da Casa: responde "serve para a minha Câmara?", no molde da seção de porte do
// Cidade Conectada. No lugar do mapa de quadras, um plenário visto de cima: as cadeiras acendem do
// centro para fora conforme o tamanho da Casa. Mesmo plenário nos três portes, para comparar.
// Números de cadeiras pela Constituição: art. 29, IV (vereadores) e art. 27 (deputados estaduais).

const FILEIRAS = [7, 9, 11, 13, 15]; // 55 cadeiras, o maior plenário municipal

// posição de cada cadeira em arco; rank: fileira de dentro primeiro, do centro para as pontas
const CADEIRAS = FILEIRAS.flatMap((qtd, f) => {
  const r = 0.4 + f * 0.15;
  return Array.from({ length: qtd }, (_, k) => {
    const a = Math.PI * (1 - k / (qtd - 1));
    return { x: 50 + 46 * r * Math.cos(a), y: 90 - 80 * r * Math.sin(a), f, centro: Math.abs(k - (qtd - 1) / 2) };
  });
});
const RANK = new Array(CADEIRAS.length);
CADEIRAS.map((c, i) => ({ ...c, i }))
  .sort((p, q) => p.f - q.f || p.centro - q.centro)
  .forEach((c, r) => (RANK[c.i] = r));

const PORTES = [
  { titulo: "Câmaras de cidades pequenas", texto: "A partir de 9 vereadores, nos municípios de até 15 mil habitantes.", n: 9, rotulo: "vereadores" },
  { titulo: "Câmaras de cidades médias", texto: "Como as Casas de 21 vereadores, em municípios de 160 a 300 mil habitantes.", n: 21, rotulo: "vereadores" },
  { titulo: "Capitais e Assembleias", texto: "Até 55 vereadores nas maiores capitais. Nas assembleias, o Painel do Vereador vira Painel do Deputado.", n: 55, rotulo: "cadeiras" },
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
  const n = PORTES[ativo].n;

  return (
    <section ref={ref} className={`pt ${on ? "is-in" : ""}`} id="porte">
      <div className="container">
        <div className="pt-body">
          <div className="pt-copy">
            <h2>Para Câmaras de<br />todos os portes.</h2>
            <p className="pt-lead">Comece pelo que a sua Casa precisa agora e amplie quando fizer sentido. O mesmo produto atende a Câmara pequena, a da capital e a Assembleia.</p>

            <ul className="pt-list">
              {PORTES.map((p, i) => (
                <li key={p.titulo}>
                  <button type="button" className={i === ativo ? "is-active" : ""} aria-pressed={i === ativo} onClick={() => escolher(i)}>
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
            <div className="lpo">
              {CADEIRAS.map((c, i) => (
                <span
                  key={i}
                  className={`lpo-cad ${RANK[i] < n ? "is-on" : ""}`}
                  style={{ left: `${c.x}%`, top: `${c.y}%`, "--d": `${RANK[i] * 12}ms` }}
                />
              ))}
              <div className="lpo-mesa">
                <b key={n}>{n}</b>
                <small>{PORTES[ativo].rotulo}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
