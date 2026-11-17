import LayoutSite from "../comum/LayoutSite.jsx";
import Icone from "../../ds/Icone.jsx";
import { CONTATO } from "../../ds/contato.js";
import { HeroCentro, OutrosProdutos, Perguntas, PreviaBlog, Passos, Cartoes, useCiclo } from "../comum/Blocos.jsx";
import { CenaLegislativo, ProcessoVivo } from "../comum/Cenas.jsx";
import { LogoLegislativo, PorCubo, CC_HOME, ZP_HOME, LC_HOME } from "../comum/marcas.jsx";
import { Secao, Pendencias } from "../cidade-conectada/pages/partes.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import Hero from "./sections/Hero.jsx";
import Problema from "./sections/Problema.jsx";
import Publicos from "./sections/Publicos.jsx";
import Jornada from "./sections/Jornada.jsx";
import Ganhos from "./sections/Ganhos.jsx";
import Porte from "./sections/Porte.jsx";
import Implantacao from "./sections/Implantacao.jsx";
import Oferta from "./sections/Oferta.jsx";
import Seguranca from "./sections/Seguranca.jsx";
import { BlogLegislativo, FaqLegislativo } from "./sections/Final.jsx";
import "./legislativo.css";

// Home do Legislativo Conectado (quadro "Legislativo Conectado · Home" do wireframe).
// Mesma lógica do Cidade Conectada, com ênfase em câmaras e assembleias.

const DEMO = `mailto:${CONTATO.email}?subject=${encodeURIComponent("Demonstração do Legislativo Conectado")}`;

function Marca() {
  return (
    <a className="mk-brand" href={LC_HOME} aria-label="Legislativo Conectado, início">
      <LogoLegislativo altura={28} />
      <PorCubo />
    </a>
  );
}

const nav = [
  {
    label: "Produtos",
    href: "#solucao",
    itens: [
      { label: "Para o cidadão", icone: "app", texto: "App, portal, WhatsApp, TV Câmara e Libras", href: "#cidadao" },
      { label: "Para o vereador", icone: "painel", texto: "Painel com demandas por bairro e tema", href: "#vereador" },
      { label: "Para a Câmara", icone: "camara", texto: "Comissões, comunicação e gestão", href: "#camara" },
    ],
  },
  {
    label: "Para quem",
    href: "#ganhos",
    itens: [
      { label: "Câmaras Municipais", icone: "predio", texto: "Vereadores, Mesa, comunicação e ouvidoria", href: "#ganhos" },
      { label: "Assembleias Legislativas", icone: "camara", texto: "Com o Painel do Deputado", href: "#porte" },
    ],
  },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

const topBar = {
  label: "Conheça também:",
  products: [
    { label: "Cidade Conectada", href: CC_HOME },
    { label: "Cidade Zero Papel", href: ZP_HOME },
  ],
  links: [
    { label: "Cubo Tecnologia", href: "/" },
    { label: "Acesso do cliente", href: "/acesso" },
  ],
};

const colunas = [
  { title: "Produto", links: [{ label: "Para o cidadão", href: "#cidadao" }, { label: "Para o vereador", href: "#vereador" }, { label: "Para a Câmara", href: "#camara" }] },
  { title: "Conteúdo", links: [{ label: "Blog", href: "/blog" }, { label: "Dúvidas comuns", href: "#faq" }] },
  { title: "Outros produtos Cubo", links: [{ label: "Cidade Conectada", href: CC_HOME }, { label: "Cidade Zero Papel", href: ZP_HOME }] },
];

const DORES = [
  { t: "O trabalho nem sempre aparece", d: "O cidadão ainda confunde o papel do vereador com o da prefeitura." },
  { t: "As demandas se perdem", d: "Chegam por vários canais, sem protocolo e sem resposta organizada." },
  { t: "Ninguém tem os dados", d: "Faltam dados sobre bairros, temas e satisfação do cidadão." },
];

const PUBLICOS = [
  { id: "cidadao", icone: "pessoas", t: "Para o cidadão", lista: ["App com assistente de IA", "Portal no site da Câmara", "WhatsApp oficial com IA", "TV Câmara ao vivo", "Atendimento em Libras"] },
  { id: "vereador", icone: "painel", t: "Para o vereador", lista: ["Painel do Vereador", "Demandas por bairro e tema", "Histórico de respostas", "Pesquisas na sua região", "Assembleia: Painel do Deputado"] },
  { id: "camara", icone: "camara", t: "Para a Câmara", lista: ["Área das Comissões", "Comunicação ativa", "Painel de gestão", "Processo eletrônico (zero papel)", "Pesquisas regionalizadas"] },
];

const PASSOS = [
  { t: "Envia", d: "Mensagem no WhatsApp oficial." },
  { t: "Recebe protocolo", d: "A IA pede foto e localização." },
  { t: "Vereador recebe", d: "A demanda chega por bairro ou tema." },
  { t: "Câmara responde", d: "A ação fica registrada." },
  { t: "Cidadão participa", d: "Acompanha, avalia e assiste às sessões." },
];

const GANHOS = [
  { icone: "pessoas", t: "Vereadores", d: "Demandas organizadas e base real para indicações e projetos." },
  { icone: "camara", t: "Presidente e Mesa", d: "Câmara moderna e transparente, com dados para decidir." },
  { icone: "tv", t: "Comunicação e TV", d: "Canal direto e mais audiência nas sessões." },
  { icone: "chat", t: "Ouvidoria e servidores", d: "Triagem pela IA, protocolo e menos retrabalho." },
];

const DIFERENCIAIS = [
  { icone: "ia", t: "IA que mostra a fonte", d: "Cada resposta indica o documento oficial; quando não sabe, encaminha para uma pessoa." },
  { icone: "libras", t: "Acessibilidade de verdade", d: "Atendimento em Libras por avatar e videochamada com tradução." },
  { icone: "troca", t: "Um histórico só", d: "App, site e WhatsApp alimentam o mesmo protocolo e o mesmo painel." },
];

const LEIS = [
  { t: "Lei de Acesso à Informação", n: "Lei 12.527/2011" },
  { t: "Direitos do usuário de serviço público", n: "Lei 13.460/2017" },
  { t: "Lei Brasileira de Inclusão", n: "Lei 13.146/2015" },
  { t: "Lei Geral de Proteção de Dados", n: "Lei 13.709/2018" },
];

const FAQ = [
  { p: "Já temos site e TV Câmara. O que muda?", r: "O serviço entra no site atual e o player usa a transmissão existente. Não substitui, conecta." },
  { p: "Os vereadores já atendem pelo WhatsApp pessoal. Por que mudar?", r: "Eles podem continuar. O canal oficial acrescenta registro e protocolo." },
  { p: "E se a IA responder errado?", r: "Ela responde com base em fonte oficial e, quando não tem certeza, passa para uma pessoa." },
  { p: "Serve para uma Câmara pequena?", r: "Sim. A IA faz a triagem e o servidor cuida do que precisa de atenção humana." },
  { p: "Como funciona no período eleitoral?", r: "O canal é institucional, e os envios seguem as regras do período e ficam registrados." },
  { p: "Como a LGPD é atendida?", r: "O cidadão autoriza o contato, pode sair quando quiser, e cada envio fica registrado." },
];

/** Pesquisa regionalizada: bairros em quadradinhos, a cor mostra a intensidade do tema. */
function MapaPesquisa() {
  const tema = useCiclo(3, 2200);
  const TEMAS = ["Iluminação", "Saúde", "Mobilidade"];
  // intensidade 0–3 por célula, uma grade por tema
  const G = [
    "0123321001233210012332100012210000111100",
    "3210012332100123012332103210012300222200",
    "1122332211223322000033331111222233330000",
  ];
  return (
    <div className="lc-map">
      <div className="lc-map__tabs">{TEMAS.map((t, i) => <span key={t} className={i === tema ? "is-on" : ""}>{t}</span>)}</div>
      <div className="lc-map__grid">{G[tema].split("").map((v, k) => <i key={k} data-v={v} />)}</div>
      <div className="lc-map__leg"><span>Menos pedidos</span><i /><i /><i /><i /><span>Mais pedidos</span></div>
    </div>
  );
}

export default function LegislativoHome() {
  return (
    <LayoutSite
      site="legislativo"
      nome="Legislativo Conectado"
      brand={<Marca />}
      nav={nav}
      topBar={topBar}
      cta={{ label: "Agendar demonstração", href: "#contato" }}
      resumo="Entre a Câmara e o cidadão, a gente."
      colunas={colunas}
      headerOverlay
    >
      <Hero demo={DEMO} />
      <Problema />
      <Publicos />
      <Jornada />
      <Ganhos />
      <Porte />
      <Implantacao />
      <Oferta />
      <Seguranca />
      <BlogLegislativo />
      <FaqLegislativo demo={DEMO} />
      <OutrosProdutos exceto="legislativo" titulo={<>Conheça outros<br />produtos Cubo.</>} texto="Para a prefeitura da sua cidade." />
      <CtaFinal
        id="contato"
        titulo="A Câmara já trabalha para a cidade."
        texto="O Legislativo Conectado faz a cidade ver isso."
        acoes={<>
          <a className="btn btn--light" href={DEMO}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={16} /> WhatsApp</a>
        </>}
      />
    </LayoutSite>
  );
}

// Refeito seção por seção no molde da Home do Cidade Conectada, com aprovação a cada passo:
// hero, o problema, os três públicos e a jornada. As seções da versão anterior ficam aqui para reaproveitar o conteúdo.
export function SecoesAnteriores() {
  return (
    <>
      <HeroCentro
        rotulo="Entre a Câmara e o cidadão, a gente."
        titulo="A porta de entrada digital da sua Câmara."
        texto="Um só lugar onde o cidadão entende o que a Câmara faz, participa e recebe resposta, no aplicativo, no site ou no WhatsApp."
        acoes={<>
          <a className="btn btn--light" href={DEMO}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href="#solucao">Conhecer os produtos</a>
        </>}
        cena={<CenaLegislativo />}
      />

      <Secao titulo={<>A Câmara trabalha.<br />Mas o cidadão vê?</>} texto="Três dores que aparecem em quase toda Câmara, de qualquer tamanho.">
        <Cartoes itens={DORES} numerar />
      </Secao>

      <Secao id="solucao" titulo={<>Um produto,<br />três públicos.</>} texto="A mesma lógica do Cidade Conectada, pensada para câmaras municipais e assembleias legislativas.">
        <div className="lc-pub">
          {PUBLICOS.map((p) => (
            <article key={p.id} id={p.id} className="cx-card">
              <span className="cx-card__ico"><Icone nome={p.icone} size={22} /></span>
              <h3>{p.t}</h3>
              <ul>{p.lista.map((x) => <li key={x}><Icone nome="check" size={14} />{x}</li>)}</ul>
            </article>
          ))}
        </div>
      </Secao>

      <Passos titulo={<>Do problema no bairro<br />à resposta da Câmara.</>} texto="O caminho de uma demanda, do WhatsApp do cidadão até a sessão." passos={PASSOS} />

      <Secao id="ganhos" titulo={<>Ganhos para<br />toda a Câmara.</>} texto="Cada perfil da Câmara ganha uma coisa diferente com o mesmo produto.">
        <Cartoes itens={GANHOS} colunas={4} />
      </Secao>

      <Secao titulo={<>Destaques.</>} texto="Dois recursos que mudam a rotina da Casa.">
        <div className="lc-dest">
          <article className="lc-dest__item">
            <div className="lc-dest__art"><div className="lc-dest__win"><ProcessoVivo camara /></div></div>
            <div className="lc-dest__copy">
              <h3>Câmara Zero Papel</h3>
              <p>Protocolo, proposições e documentos tramitam sem papel, com tudo rastreável.</p>
            </div>
          </article>
          <article className="lc-dest__item">
            <div className="lc-dest__art"><div className="lc-dest__win"><MapaPesquisa /></div></div>
            <div className="lc-dest__copy">
              <h3>Pesquisas regionalizadas</h3>
              <p>Entenda os problemas de cada bairro antes de agir, com resultados no mapa.</p>
            </div>
          </article>
        </div>
      </Secao>

      <Secao id="diferenciais" titulo={<>Tecnologia que aproxima<br />e dá segurança.</>} texto="O que separa o Legislativo Conectado de um canal de mensagens comum.">
        <Cartoes itens={DIFERENCIAIS} />
      </Secao>

      <Secao titulo={<>A Câmara cumprindo<br />o que a lei já pede.</>} texto="O Legislativo Conectado ajuda a Casa a atender quatro leis federais no dia a dia.">
        <ul className="cx-leis">
          {LEIS.map((l) => (
            <li key={l.n}><span><Icone nome="balanca" size={20} /></span><div>{l.t}<small>{l.n}</small></div></li>
          ))}
        </ul>
        <Pendencias itens={["Número de câmaras atendidas", "Número de demandas registradas", "Brasões de câmaras clientes, se autorizados (ou chamada para câmaras-piloto)"]} />
      </Secao>

      <Perguntas
        titulo={<>Dúvidas<br />comuns.</>}
        texto="Respostas do dia a dia de quem apresenta o Legislativo Conectado às câmaras."
        botao={{ label: "Falar com especialista", href: DEMO }}
        itens={FAQ}
        rodape={<Pendencias itens={["Resposta sobre o período eleitoral, revisada pelo jurídico"]} />}
      />

      <PreviaBlog
        titulo={<>Conteúdos para<br />a sua gestão.</>}
        texto="Prévia do blog da Cubo, filtrada pelo Legislativo Conectado."
        vazio={{ titulo: "Primeiros conteúdos do Legislativo em produção", texto: "Enquanto isso, veja exemplos reais de atendimento digital no blog da Cubo." }}
      />

      <OutrosProdutos exceto="legislativo" titulo={<>Conheça outros<br />produtos Cubo.</>} texto="Para a prefeitura da sua cidade." />

      <CtaFinal
        id="contato"
        titulo="A Câmara já trabalha para a cidade."
        texto="O Legislativo Conectado faz a cidade ver isso."
        acoes={<>
          <a className="btn btn--light" href={DEMO}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={16} /> WhatsApp</a>
        </>}
      />
    </>
  );
}
