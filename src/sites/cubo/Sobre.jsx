import { Link } from "react-router-dom";
import Layout from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { useInView } from "../../ds/motion.js";
import { Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { PRODUTOS_CUBO } from "../comum/marcas.jsx";
import Numeros from "./home/Numeros.jsx";
import Cta, { PECA_A, PECA_B } from "./home/Cta.jsx";
import "./home/HeroMind.css";
import "./sobre.css";
import "./cubo.css";

// Sobre a Cubo, na linha da página "About" do mindcloud.co e da Home:
// hero com o degradê, propósito ao lado do mapa, o que a Cubo resolve em quatro cartões,
// a história em marcos, os números e o CTA final. Só entra o que é real; o resto fica nas notas.

const MARCOS = [
  ["Setembro de 2023", "João Pessoa na Palma da Mão entra no ar", "O aplicativo de serviços da capital paraibana, feito com o Cidade Conectada."],
  ["2025", "Mais de 188 mil demandas em um ano", "Quase 80% concluídas, com mais de 600 serviços disponíveis."],
  ["Abril de 2026", "Mais de 450 mil usuários", "O app se consolida como um dos principais canais de atendimento da cidade."],
  [null, "Cidade Zero Papel e Legislativo Conectado", "O portfólio cresce para os processos internos e para o Legislativo."],
];

const LUGARES = [["João Pessoa", "PB", true], ["Campina Grande", "PB"], ["Cabedelo", "PB"], ["Feira de Santana", "BA"]];

/** Nordeste em quadradinhos: Paraíba e Bahia acesas, sede pulsando. Esquema, não mapa em escala. */
export function MapaNordeste() {
  // grade 9x8; 1 = estado do Nordeste, 2 = PB, 3 = BA
  const G = ["000111110", "001111111", "011111112", "011111122", "001133311", "001333310", "000333300", "000033000"];
  return (
    <svg viewBox="0 0 270 240" role="img" aria-label="Paraíba e Bahia destacadas no mapa do Nordeste">
      {G.flatMap((row, y) => row.split("").map((v, x) => v !== "0" && (
        <rect key={`${x}-${y}`} x={x * 30 + 2} y={y * 30 + 2} width="26" height="26" rx="6" fill={v === "1" ? "#e6e7ea" : "var(--cubo-azul)"} />
      )))}
      <circle cx={8 * 30 + 15} cy={2 * 30 + 15} r="7" fill="var(--white)" />
      <circle cx={8 * 30 + 15} cy={2 * 30 + 15} r="7" fill="none" stroke="var(--white)" strokeWidth="2" className="cb-pulse" />
    </svg>
  );
}

function Proposito() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`sb-split js-reveal ${on ? "is-in" : ""}`}>
      <div className="container sb-split__inner">
        <div className="reveal">
          <h2>Trazer o governo para a <span>era digital</span> e descomplicar a vida das pessoas.</h2>
          <p>A Cubo é uma GovTech de João Pessoa (PB). Desenvolve tecnologia própria para prefeituras, câmaras e assembleias, com uma missão simples: descomplicar problemas e facilitar processos.</p>
          <ul className="sb-lugares">
            {LUGARES.map(([c, uf, sede]) => <li key={c} className={sede ? "is-sede" : ""}>{c}<small>{sede ? `Sede · ${uf}` : uf}</small></li>)}
          </ul>
        </div>
        <div className="sb-split__art reveal" style={{ "--rd": "120ms" }}><MapaNordeste /></div>
      </div>
    </section>
  );
}

function Resolve() {
  const [ref, on] = useInView({ threshold: 0.2 });
  const itens = [
    ...PRODUTOS_CUBO.map((p) => ({ t: p.objetivo, d: p.objetivoTexto, nome: p.nome, href: p.href })),
    { t: "Acompanhar de perto", d: "Implantação, treinamento e suporte com a mesma equipe, do contrato ao uso diário." },
  ];
  return (
    <section ref={ref} className={`sb-resolve js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <h2 className="sb-resolve__title reveal">O que a <span>Cubo</span> resolve.</h2>
        <div className="sb-resolve__grid">
          {itens.map((x, i) => {
            const Tag = x.href ? "a" : "article";
            return (
              <Tag key={x.t} className="sb-card reveal" href={x.href} style={{ "--rd": `${80 + i * 70}ms` }}>
                <strong>{x.t}</strong>
                <p>{x.d}</p>
                {x.nome && <span className="sb-card__go">{x.nome} <Icone nome="seta" size={14} /></span>}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Nossa história: linha do tempo na horizontal. A linha se preenche da esquerda para a direita
   quando a seção aparece, e cada marco acende quando a linha chega nele. O último ainda não tem data. */
function Historia() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} id="historia" className={`sh js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <div className="sh__head reveal">
          <span className="sb-selo">Nossa história</span>
          <h2>Marcos de quem coloca<br />a prefeitura na palma da mão.</h2>
        </div>
        <ol className="sh__linha">
          {MARCOS.map(([ano, t, d], i) => (
            <li key={t} className={ano ? "" : "is-futuro"} style={{ "--i": i }}>
              <span className="sh__ponto" aria-hidden="true" />
              <span className="sh__ano">{ano ?? "Em breve"}</span>
              <strong>{t}</strong>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <Pendencias itens={["Ano e história da fundação da Cubo", "Anos de lançamento de cada produto"]} />
      </div>
    </section>
  );
}

/* Topo do Sobre: fundo claro e texto escuro. Título à esquerda, apoio à direita e, embaixo,
   um painel escuro com o símbolo da Cubo em traço fino e quatro fatos sobre a empresa. */
const FATOS = [
  ["João Pessoa", "sede da Cubo, na Paraíba"],
  ["3 produtos", "para prefeituras, câmaras e assembleias"],
  ["PB e BA", "estados com cidades atendidas"],
  ["Própria", "tecnologia, do código ao suporte"],
];

function Topo() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`st js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <div className="st__head reveal">
          <div>
            <span className="sb-selo">Sobre a Cubo</span>
            <h1>Transformamos desafios em <span>inovação</span> para as cidades.</h1>
          </div>
          <div className="st__side">
            <p>Somos uma GovTech de João Pessoa. Unimos tecnologia e eficiência para descomplicar a gestão pública e melhorar a vida dos cidadãos.</p>
            <Link className="st__btn" to="/#produtos">Conhecer os produtos</Link>
          </div>
        </div>

        <div className="st__panel reveal" style={{ "--rd": "120ms" }}>
          <svg className="st__marca" viewBox="120 330 150 125" aria-hidden="true">
            <g className="ct__grade">
              {[155.1, 171.3, 215.2, 231.5].map((x) => <line key={`v${x}`} x1={x} y1="300" x2={x} y2="480" />)}
              {[355.8, 372.0, 416.0, 432.0].map((y) => <line key={`h${y}`} x1="100" y1={y} x2="300" y2={y} />)}
            </g>
            <polygon className="ct__peca" points={PECA_A.map((q) => q.join(",")).join(" ")} pathLength="1" />
            <polygon className="ct__peca ct__peca--b" points={PECA_B.map((q) => q.join(",")).join(" ")} pathLength="1" />
          </svg>
          <dl className="st__fatos">
            {FATOS.map(([v, r]) => <div key={v}><dd>{v}</dd><dt>{r}</dt></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* Onde a Cubo está: as cidades em linhas, com a sede marcada, ao lado do mapa do Nordeste em quadradinhos */
function Presenca() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`sp js-reveal ${on ? "is-in" : ""}`}>
      <div className="container sp__inner">
        <div className="reveal">
          <span className="sb-selo">Onde a Cubo está</span>
          <h2>Sede em João Pessoa.<br />Cidades na Paraíba e na Bahia.</h2>
          <ul className="sp__lista">
            {LUGARES.map(([c, uf, sede]) => (
              <li key={c}>
                <span className="sp__ico"><Icone nome={sede ? "mapa" : "predio"} size={16} /></span>
                <strong>{c}</strong>
                <small>{uf}</small>
                {sede && <em>Sede</em>}
              </li>
            ))}
          </ul>
        </div>
        <div className="sp__mapa reveal" style={{ "--rd": "120ms" }}><MapaNordeste /></div>
      </div>
      <div className="container">
        <Pendencias itens={["Lista completa de cidades e estados atendidos", "Parceiros regionais, se houver"]} />
      </div>
    </section>
  );
}

// Refeito seção por seção, com aprovação a cada passo: topo, história, o que nos move, presença e o CTA final da Home.
// As seções da versão anterior (Proposito, Resolve) continuam neste arquivo para reaproveitar o conteúdo.
export default function Sobre() {
  return (
    <Layout titulo="Sobre">
      <Topo />
      <Historia />
      <Move />
      <Presenca />
      <Cta semSobre />
    </Layout>
  );
}

/* O que nos move: propósito e missão como duas frases grandes, lado a lado, separadas por uma linha.
   Visão e valores ainda não foram definidos pela Cubo: ficam na nota, sem texto inventado. */
function Move() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const itens = [
    ["Propósito", "Trazer o governo para a era digital e descomplicar a vida das pessoas."],
    ["Missão", "Descomplicar problemas e facilitar processos."],
  ];
  return (
    <section ref={ref} className={`sm js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <span className="sb-selo reveal">O que nos move</span>
        <div className="sm__grid">
          {itens.map(([k, t], i) => (
            <article key={k} className="reveal" style={{ "--rd": `${100 + i * 120}ms` }}>
              <span className="sm__k">{k}</span>
              <p>{t}</p>
            </article>
          ))}
        </div>
        <Pendencias itens={["Visão", "Valores da Cubo"]} />
      </div>
    </section>
  );
}
