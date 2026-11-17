import { useState } from "react";
import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import { useInView, useTicker } from "../../../ds/motion.js";
import { PRODUTOS_CUBO, CC_HOME, ZP_HOME, LC_HOME, LogoCidadeConectada, LogoZeroPapel, LogoLegislativo } from "../../comum/marcas.jsx";
import { Pendencias } from "../../cidade-conectada/pages/partes.jsx";
import Prismas from "./Prismas.jsx";
import "./home.css";

// Seções da Home da Cubo, na linguagem do getsymmetry.com: painéis claros com grade isométrica
// e cartões de interface deitados sobre ela, acordeão ao lado de um painel ilustrado, faixa escura
// e CTA com os cilindros. Nomes e números dentro dos cartões são exemplos de interface.

/** Cabeçalho no padrão do site: título à esquerda, apoio à direita. */
function Cabeca({ titulo, texto, centro = false }) {
  return (
    <header className={`sec-head reveal ${centro ? "sy-head--centro" : ""}`}>
      <h2>{titulo}</h2>
      {texto && <div className="sec-head__side"><p>{texto}</p></div>}
    </header>
  );
}

/** Cartões de interface empilhados e deitados sobre a grade isométrica.
 *  Com `vivo`, cada item avança de status a cada passo até todos concluírem, e o ciclo recomeça. */
const TIPOS = ["new", "run", "ok"];
function Pilha({ linhas, estados, titulo, vivo = false }) {
  const passo = useTicker(vivo, 1800) % 4;
  return (
    <div className="sy-iso">
      {titulo && <div className="sy-ui sy-ui__title"><strong>{titulo}</strong><span>hoje</span></div>}
      {linhas.map(([t, base], k) => {
        const e = Math.min(2, base + passo);
        return (
          <div key={t} className="sy-ui sy-row" style={{ "--k": k }}>
            <span className={`sy-row__ico ${e === 2 ? "is-ok" : ""}`}>{e === 2 && <Icone nome="check" size={13} />}</span>
            <strong>{t}</strong>
            <span key={e} className={`sy-st sy-st--${TIPOS[e]}`}>{estados[e]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ===== Por onde começar: acordeão dos produtos ao lado de um painel com a rotina de cada um ===== */

const ROTINA = {
  "cidade-conectada": {
    titulo: "Pedidos dos cidadãos",
    estados: ["Recebido", "Em execução", "Concluído"],
    linhas: [["Troca de lâmpada", 0], ["Cartão SUS", 1], ["Poda de árvore", 2]],
    itens: ["App e portal com os serviços da prefeitura", "Atendimento pelo WhatsApp e em Libras", "IA e ordens de serviço para as equipes"],
  },
  "zero-papel": {
    titulo: "Processos da prefeitura",
    estados: ["Protocolado", "Em tramitação", "Assinado"],
    linhas: [["Ofício 112", 0], ["Licença para obra", 1], ["Contrato 19", 2]],
    itens: ["Protocolo e tramitação eletrônicos", "Assinatura digital dos documentos", "Arquivo rastreável, sem papel"],
  },
  legislativo: {
    titulo: "Demandas da Câmara",
    estados: ["Nova", "Encaminhada", "Respondida"],
    linhas: [["Iluminação · Centro", 0], ["Calçada · Bairro Novo", 1], ["Praça · Jardim", 2]],
    itens: ["App, site e WhatsApp oficial da Câmara", "Painel do Vereador com demandas por bairro", "TV Câmara e atendimento em Libras"],
  },
};

export function PorOnde() {
  const [ref, on] = useInView({ threshold: 0.2 });
  const [aberto, setAberto] = useState(0);
  const p = PRODUTOS_CUBO[aberto];
  const r = ROTINA[p.id];
  return (
    <section ref={ref} id="comecar" className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <Cabeca titulo={<>Por onde sua instituição<br />quer começar?</>} texto="Cada produto da Cubo resolve uma frente da gestão pública. Escolha a sua e siga para o site do produto." />
      <div className="sy-acc reveal" style={{ "--rd": "120ms" }}>
        <ul className="sy-acc__list">
          {PRODUTOS_CUBO.map((x, i) => {
            const open = i === aberto;
            return (
              <li key={x.id} className={open ? "is-open" : ""}>
                <button type="button" aria-expanded={open} onClick={() => setAberto(i)}>
                  <span>{x.objetivo}</span>
                  <Icone nome={open ? "menos" : "mais"} size={16} />
                </button>
                {open && (
                  <div className="sy-acc__body">
                    <p>{x.objetivoTexto}</p>
                    <ul>{ROTINA[x.id].itens.map((t) => <li key={t}>{t}</li>)}</ul>
                    <a className="sec-link" href={x.href}>Conhecer o {x.nome} <Icone nome="seta" size={14} /></a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="sy-panel sy-panel--gelo sy-acc__art" aria-hidden="true">
          <div className="sy-grid" />
          <div key={p.id} className="sy-acc__scene"><Pilha titulo={r.titulo} linhas={r.linhas} estados={r.estados} vivo={on} /></div>
          <span className="sy-acc__tag"><p.Logo altura={22} /></span>
        </div>
      </div>
    </section>
  );
}

/* ===== Clientes: o caso de João Pessoa no centro e as outras cidades em volta, todos em pé ===== */

// lado e altura de cada cidade em volta do cartão central (em px a partir do centro do painel)
const CIDADES = [
  { c: "Campina Grande", uf: "PB", x: -360, y: -96 },
  { c: "Cabedelo", uf: "PB", x: 330, y: -118 },
  { c: "Feira de Santana", uf: "BA", x: 300, y: 104 },
];

export function Cidades() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} id="clientes" className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <Cabeca titulo={<>Presente na gestão<br />de cidades como:</>} texto="Prefeituras que já usam tecnologia da Cubo para atender o cidadão." />
      <div className="sy-panel sy-cid reveal" style={{ "--rd": "120ms" }}>
        <div className="sy-grid" aria-hidden="true" />
        <Link className="sy-cid__main" to={`${CC_HOME}/clientes/joao-pessoa`}>
          <header>
            <span className="sy-cid__ico"><Icone nome="predio" size={18} /></span>
            <span><strong>João Pessoa</strong><small>PB · João Pessoa na Palma da Mão</small></span>
          </header>
          <dl>
            <div><dd>+188 mil</dd><dt>demandas em 2025</dt></div>
            <div><dd>quase 80%</dd><dt>concluídas</dt></div>
          </dl>
          <span className="sy-cid__go">Ver história <Icone nome="seta" size={14} /></span>
        </Link>
        <ul className="sy-cid__others">
          {CIDADES.map((x, i) => (
            <li key={x.c} style={{ "--x": `${x.x}px`, "--y": `${x.y}px`, "--d": `${i * -1.4}s` }}>
              <span className="sy-cid__ico"><Icone nome="predio" size={16} /></span>
              <span><strong>{x.c}</strong><small>{x.uf}</small></span>
            </li>
          ))}
        </ul>
      </div>
      <Pendencias itens={["Brasões das prefeituras clientes, com autorização de uso"]} />
    </section>
  );
}

/* ===== Produtos: um painel por produto, cada um com um pedaço da interface deitado na grade ===== */

const MODULOS = ["SuperApp de Serviços", "Interoperabilidade", "Atendimento WhatsApp", "TeleAtendimento com Libras", "IA para Atendimento", "Conecta OS"];
const ETAPAS_ZP = ["Protocolo", "Tramitação", "Assinatura", "Publicidade", "Arquivo"];
const BAIRROS = [["Centro", 82], ["Bairro Novo", 64], ["Vila Nova", 48], ["Jardim", 30]];

export function Produtos() {
  const [ref, on] = useInView({ threshold: 0.12 });
  // um movimento por painel, ligado ao produto: um módulo acende por vez, o processo avança, um bairro se destaca
  const mod = useTicker(on, 1500) % MODULOS.length;
  const etapa = useTicker(on, 1300) % (ETAPAS_ZP.length + 1);
  const bairro = useTicker(on, 1700) % BAIRROS.length;
  return (
    <section ref={ref} id="produtos" className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <Cabeca titulo={<>Nossos produtos.</>} texto="Três produtos, cada um com o seu site, a sua equipe e o mesmo jeito Cubo de trabalhar." />
      <div className="sy-prods">
        <a className="sy-panel sy-panel--gelo sy-prod sy-prod--wide reveal" href={CC_HOME}>
          <div className="sy-prod__copy">
            <LogoCidadeConectada altura={34} />
            <h3>A solução completa para colocar a prefeitura na palma da mão.</h3>
            <p>Seis produtos que funcionam juntos ou separados, do pedido do cidadão à execução.</p>
            <span className="sec-link">Conhecer o Cidade Conectada <Icone nome="seta" size={14} /></span>
          </div>
          <div className="sy-prod__art" aria-hidden="true">
            <div className="sy-grid" />
            <div className="sy-iso sy-iso--wide">
              <div className="sy-ui sy-mods">
                {MODULOS.map((m, k) => <span key={m} className={k === mod ? "is-on" : ""}>{m}</span>)}
              </div>
            </div>
          </div>
        </a>
        <a className="sy-panel sy-panel--azul sy-prod reveal" style={{ "--rd": "100ms" }} href={ZP_HOME}>
          <div className="sy-prod__copy">
            <LogoZeroPapel />
            <h3>Processos eletrônicos, do protocolo ao arquivo.</h3>
            <span className="sec-link">Conhecer o Cidade Zero Papel <Icone nome="seta" size={14} /></span>
          </div>
          <div className="sy-prod__art" aria-hidden="true">
            <div className="sy-grid" />
            <div className="sy-iso">
              <div className="sy-ui sy-steps">
                <strong>Processo 2026/00418</strong>
                {ETAPAS_ZP.map((e, k) => <span key={e} className={k < etapa ? "is-done" : k === etapa ? "is-now" : ""}><i>{k < etapa && <Icone nome="check" size={9} />}</i>{e}</span>)}
              </div>
            </div>
          </div>
        </a>
        <a className="sy-panel sy-panel--peri sy-prod reveal" style={{ "--rd": "200ms" }} href={LC_HOME}>
          <div className="sy-prod__copy">
            <LogoLegislativo altura={26} />
            <h3>A porta de entrada digital de câmaras e assembleias.</h3>
            <span className="sec-link">Conhecer o Legislativo Conectado <Icone nome="seta" size={14} /></span>
          </div>
          <div className="sy-prod__art" aria-hidden="true">
            <div className="sy-grid" />
            <div className="sy-iso">
              <div className="sy-ui sy-bars">
                <strong>Demandas por bairro</strong>
                {BAIRROS.map(([b, v], k) => <span key={b} className={k === bairro ? "is-on" : ""}><em>{b}</em><i><b style={{ width: `${v}%`, "--d": `${k * 120}ms` }} /></i></span>)}
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ===== Faixa escura: por que a Cubo e os números, com o símbolo da Cubo no alto ===== */

const MOTIVOS = [
  { t: "Foco em gestão pública", d: "Experiência e especialização na rotina de prefeituras, secretarias e câmaras." },
  { t: "Tecnologia própria", d: "Equipe, desenvolvimento e evolução dos produtos feitos dentro da Cubo." },
  { t: "Acompanhamento próximo", d: "Implantação, treinamento e suporte com a mesma equipe do começo ao fim." },
];
const NUMEROS = [
  ["+450 mil", "usuários do app de serviços de João Pessoa (abril de 2026)"],
  ["+188 mil", "demandas atendidas pelo app em 2025"],
  ["+600", "serviços da prefeitura no celular do cidadão"],
  ["3", "produtos para prefeituras, câmaras e assembleias"],
];

export function Escura() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <div className="sy-dark">
        <div className="sy-dark__mark" aria-hidden="true">
          <i /><i /><i />
          <img src="/brand/cubo-logo.svg" alt="" />
        </div>
        <h2 className="reveal">Por que as cidades escolhem a Cubo.</h2>
        <p className="sy-dark__lead reveal">O que muda quando a tecnologia é feita para a gestão pública.</p>
        <ul className="sy-dark__why">
          {MOTIVOS.map((m, i) => (
            <li key={m.t} className="reveal" style={{ "--rd": `${120 + i * 100}ms` }}><strong>{m.t}</strong><span>{m.d}</span></li>
          ))}
        </ul>
        <dl className="sy-dark__nums">
          {NUMEROS.map(([v, r]) => <div key={v}><dd>{v}</dd><dt>{r}</dt></div>)}
        </dl>
        <p className="sy-dark__fonte">Números do aplicativo de serviços de João Pessoa, feito com o Cidade Conectada. Fonte: Prefeitura de João Pessoa (01/01/2026 e 04/04/2026).</p>
      </div>
      <Pendencias itens={["Anos de mercado", "Número de profissionais", "Total de cidades atendidas", "Total de usuários nas plataformas da Cubo"]} />
    </section>
  );
}

/* ===== Depoimento: a fala do cliente num painel claro ===== */

export function Depoimento() {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <section ref={ref} className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <figure className="sy-panel sy-quote reveal">
        <blockquote>
          <p>“O aplicativo facilitou a vida de todos os cidadãos. Vinte e quatro horas por dia, qualquer pessoa tem acesso aos serviços da Prefeitura.”</p>
        </blockquote>
        <figcaption>
          <span className="sy-quote__av" aria-hidden="true">VA</span>
          <span><strong>Valdo Alves</strong><small>Secretário de Administração de João Pessoa · janeiro de 2026</small></span>
          <Link className="btn btn--ghost" to="/blog">Ver histórias</Link>
        </figcaption>
      </figure>
      <Pendencias itens={["Vídeo: como a tecnologia muda a vida na cidade", "Prêmios, parcerias, certificações e associações, se houver"]} />
    </section>
  );
}

/* ===== CTA final: título no centro e os cilindros embaixo ===== */

export function CtaCubo({ acoes }) {
  return (
    <section className="sy-cta" id="contato">
      <div className="container sy-cta__copy">
        <h2>Vamos transformar a gestão da sua cidade?</h2>
        <p>Fale com a nossa equipe e descubra por onde começar.</p>
        <div className="sy-cta__actions">{acoes}</div>
      </div>
      <div className="sy-cta__cyls">
        <Prismas />
      </div>
    </section>
  );
}
