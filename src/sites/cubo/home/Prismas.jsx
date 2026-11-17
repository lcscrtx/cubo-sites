// Prismas de base quadrada atrás do hero e do CTA final: cubos esticados, como o símbolo da Cubo.
// Cinza claro em três tons (tampo, face esquerda, face direita) e poucos detalhes em azul:
// um tampo azul, um tampo azul-claro, uma faixa azul e um cubinho laranja pousado em cima (o único laranja).
// Desenho isométrico em SVG, que sobe do chão ao aparecer.

// cinzas fixos; os azuis e o laranja vêm das variáveis da paleta da Cubo (cubo.css)
const COR = { tampo: "#f4f5f8", esq: "#e5e7ec", dir: "#d5d8df", azul: "var(--cubo-azul)", azulClaro: "var(--blue-100)", azulEsq: "var(--blue-600)", laranja: "var(--cubo-laranja)" };
const BASE = 600; // abaixo da borda de baixo: os prismas saem do chão cortados
const ISO = 0.577; // altura do losango do tampo em relação à largura (30°)

// [centro x, largura, altura, detalhe]. Os detalhes azuis ficam nas pontas, fora de trás do cartão do hero.
const PADRAO = [
  [70, 150, 300, "faixa"],
  [215, 128, 410, "tampo"],
  [352, 140, 250],
  [488, 146, 345],
  [600, 120, 210],
  [712, 140, 300],
  [848, 130, 430],
  [985, 140, 275, "tampoClaro"],
  [1128, 150, 365, "cubinho"],
];

function Prisma({ cx, w, h, detalhe, d }) {
  const hw = w / 2;
  const dh = w * ISO;
  const ty = 520 - h; // linha do meio do tampo
  const topo = `${cx - hw},${ty} ${cx},${ty - dh / 2} ${cx + hw},${ty} ${cx},${ty + dh / 2}`;
  const esq = `${cx - hw},${ty} ${cx},${ty + dh / 2} ${cx},${BASE} ${cx - hw},${BASE}`;
  const dir = `${cx},${ty + dh / 2} ${cx + hw},${ty} ${cx + hw},${BASE} ${cx},${BASE}`;
  const corTopo = detalhe === "tampo" ? COR.azul : detalhe === "tampoClaro" ? COR.azulClaro : COR.tampo;

  // faixa azul: uma tira fina nas duas faces, um pouco abaixo do tampo
  const f = 34;
  const faixa = detalhe === "faixa" && (
    <>
      <polygon points={`${cx - hw},${ty + f} ${cx},${ty + dh / 2 + f} ${cx},${ty + dh / 2 + f + 7} ${cx - hw},${ty + f + 7}`} style={{ fill: COR.azul }} />
      <polygon points={`${cx},${ty + dh / 2 + f} ${cx + hw},${ty + f} ${cx + hw},${ty + f + 7} ${cx},${ty + dh / 2 + f + 7}`} style={{ fill: COR.azulEsq }} />
    </>
  );

  // cubinho laranja pousado no centro do tampo
  const c = w * 0.32, ch = c * ISO, cb = ty; // base do cubinho no meio do tampo
  const cubinho = detalhe === "cubinho" && (
    <g className="prisma__cubinho">
      <polygon points={`${cx - c / 2},${cb - c} ${cx},${cb - c - ch / 2} ${cx + c / 2},${cb - c} ${cx},${cb - c + ch / 2}`} style={{ fill: "#fdb08f" }} />
      <polygon points={`${cx - c / 2},${cb - c} ${cx},${cb - c + ch / 2} ${cx},${cb + ch / 2} ${cx - c / 2},${cb}`} style={{ fill: COR.laranja }} />
      <polygon points={`${cx},${cb - c + ch / 2} ${cx + c / 2},${cb - c} ${cx + c / 2},${cb} ${cx},${cb + ch / 2}`} style={{ fill: "#d9480f" }} />
    </g>
  );

  return (
    <g className="prisma" style={{ "--d": `${d}ms` }}>
      <polygon points={esq} style={{ fill: COR.esq }} />
      <polygon points={dir} style={{ fill: COR.dir }} />
      <polygon points={topo} style={{ fill: corTopo }} />
      <polyline points={`${cx - hw},${ty} ${cx},${ty + dh / 2} ${cx + hw},${ty}`} className="prisma__aresta" />
      {faixa}
      {cubinho}
    </g>
  );
}

export default function Prismas({ itens = PADRAO, className = "" }) {
  return (
    <svg className={`prismas ${className}`} viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {itens.map(([cx, w, h, detalhe], i) => (
        <Prisma key={i} cx={cx} w={w} h={h} detalhe={detalhe} d={(i % 4) * 90 + Math.floor(i / 4) * 40} />
      ))}
    </svg>
  );
}
