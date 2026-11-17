import { useInView, useTicker } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Produtos.css";
import "./Ganhos.css";

// Seção 6 · Ganhos para toda a Câmara (quadro "Legislativo Conectado · Home": "O que cada perfil ganha"
// e "Destaques"), no molde da seção de produtos do Cidade Conectada: seis cards, cada um com uma mini
// tela plana em cima. Nomes, números e bairros das telas são exemplos de interface.

/* Vereadores: demandas do mandato por bairro */
function Vereadores({ on }) {
  const ativo = useTicker(on, 1800) % 3;
  const linhas = [["Centro", 82], ["Bairro Novo", 61], ["Vila Nova", 44]];
  return (
    <div className="lg-ui lg-ver">
      <small>Demandas do mandato</small>
      {linhas.map(([b, v], k) => (
        <span key={b} className={k === ativo ? "is-on" : ""}>
          <em>{b}</em><i><b style={{ width: `${v}%` }} /></i>
        </span>
      ))}
    </div>
  );
}

/* Presidente e Mesa: indicadores da Casa */
function Mesa() {
  const barras = [40, 52, 48, 63, 58, 72, 80];
  return (
    <div className="lg-ui lg-mesa">
      <div className="lg-mesa__kpis">
        <span><small>Demandas no mês</small><b>1.284</b></span>
        <span><small>Respondidas</small><b>86%</b></span>
      </div>
      <div className="lg-mesa__chart">
        {barras.map((h, i) => <i key={i} style={{ height: `${h}%` }} className={i === barras.length - 1 ? "is-on" : ""} />)}
      </div>
    </div>
  );
}

/* Comunicação e TV: aviso de sessão ao vivo enviado a quem pediu */
function Comunicacao() {
  return (
    <div className="lg-com">
      <div className="lg-ui lg-com__aviso">
        <span className="lg-com__live"><i />Ao vivo</span>
        <strong>A sessão ordinária começou</strong>
        <small>Toque para assistir no app da Câmara</small>
      </div>
      <div className="lg-ui lg-com__aud"><small>Aviso enviado</small><b>3.412 pessoas</b></div>
    </div>
  );
}

/* Ouvidoria e servidores: triagem feita pela IA */
const TRIAGEM = [["Iluminação pública", "Prefeitura"], ["Projeto de lei", "Comissão"], ["Visita à Câmara", "Cerimonial"]];
function Ouvidoria({ on }) {
  const ativo = useTicker(on, 1600) % TRIAGEM.length;
  return (
    <div className="lg-ui lg-ouv">
      <header><span className="lg-ouv__ia">IA</span>Triagem automática</header>
      {TRIAGEM.map(([t, d], k) => (
        <span key={t} className={k === ativo ? "is-on" : ""}><strong>{t}</strong><em>{d}</em></span>
      ))}
    </div>
  );
}

/* Câmara Zero Papel: proposição tramitando */
const TRAMITE = ["Protocolo", "Comissão", "Plenário", "Sanção"];
function ZeroPapel({ on }) {
  const passo = useTicker(on, 1400) % (TRAMITE.length + 1);
  return (
    <div className="lg-ui lg-zp">
      <small>PL 32/2026 · tramitação</small>
      <ol>
        {TRAMITE.map((t, k) => <li key={t} className={k < passo ? "is-done" : ""}><i />{t}</li>)}
      </ol>
    </div>
  );
}

/* Pesquisas regionalizadas: bairros no mapa */
function Pesquisas({ on }) {
  const ativo = useTicker(on, 1500) % 6;
  return (
    <div className="lg-ui lg-pq">
      <small>Prioridade por bairro</small>
      <div className="lg-pq__mapa">
        {[0.9, 0.5, 0.7, 0.3, 0.6, 0.8].map((o, k) => (
          <i key={k} style={{ "--o": o }} className={k === ativo ? "is-on" : ""} />
        ))}
      </div>
    </div>
  );
}

const GANHOS = [
  { nome: "Vereadores", texto: "Demandas organizadas e base real para indicações e projetos.", Arte: Vereadores },
  { nome: "Presidente e Mesa", texto: "Câmara moderna e transparente, com dados para decidir.", Arte: Mesa },
  { nome: "Comunicação e TV", texto: "Canal direto com o cidadão e mais audiência nas sessões.", Arte: Comunicacao },
  { nome: "Ouvidoria e servidores", texto: "Triagem pela IA, protocolo em cada pedido e menos retrabalho.", Arte: Ouvidoria },
  { nome: "Câmara Zero Papel", texto: "Protocolo, proposições e documentos tramitam sem papel, com tudo rastreável.", Arte: ZeroPapel },
  { nome: "Pesquisas regionalizadas", texto: "Entenda os problemas de cada bairro antes de agir, com resultados no mapa.", Arte: Pesquisas },
];

export default function Ganhos() {
  const [ref, on] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} className={`pd ${on ? "is-in" : ""}`} id="ganhos">
      <div className="container">
        <header className="pd-head">
          <h2>Ganhos para<br />toda a Câmara.</h2>
          <div className="pd-head__side">
            <p>Do vereador à ouvidoria, cada perfil da Casa ganha uma ferramenta própria. Tudo no mesmo sistema.</p>
            <a className="pd-link" href="#contato">
              Agendar demonstração
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>
        <div className="pd-grid">
          {GANHOS.map(({ nome, texto, Arte }, i) => (
            <article key={nome} className="pd-card" style={{ "--d": `${i * 80}ms` }} data-in={on || undefined}>
              <div className="pd-card__art" aria-hidden="true"><Arte on={on} /></div>
              <div className="pd-card__body"><h3>{nome}</h3><p>{texto}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
