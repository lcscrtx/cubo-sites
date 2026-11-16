import { Link } from "react-router-dom";
import Layout, { FALE, PARCEIRO, VAGAS } from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { useInView } from "../../ds/motion.js";
import { CONTATO } from "../../ds/contato.js";
import { HeroCentro, PreviaBlog, Cartoes } from "../comum/Blocos.jsx";
import { CenaCubo, ProcessoVivo, PainelVereador } from "../comum/Cenas.jsx";
import { PRODUTOS_CUBO, LogoCidadeConectada, LogoZeroPapel, LogoLegislativo, CC_HOME, ZP_HOME, LC_HOME } from "../comum/marcas.jsx";
import { Secao, Pendencias, LinkSeta } from "../cidade-conectada/pages/partes.jsx";
import { ARTES } from "../cidade-conectada/sections/ProdutoArt.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import { POSTS } from "../cidade-conectada/data/posts.js";
import "./cubo.css";

// Home da Cubo Tecnologia (quadro "Cubo Tecnologia · Home" do wireframe).
// A Cubo dá solidez e direciona cada visita para o produto certo.

const CIDADES = [
  { c: "João Pessoa", uf: "PB" },
  { c: "Campina Grande", uf: "PB" },
  { c: "Cabedelo", uf: "PB" },
  { c: "Feira de Santana", uf: "BA" },
];

const NUMEROS = [
  { v: "+450 mil", r: "usuários do app de serviços de João Pessoa (abril de 2026)" },
  { v: "+188 mil", r: "demandas atendidas pelo app em 2025" },
  { v: "+600", r: "serviços da prefeitura no celular do cidadão" },
  { v: "3", r: "produtos para prefeituras, câmaras e assembleias" },
];

const MOTIVOS = [
  { icone: "predio", t: "Foco em gestão pública", d: "Experiência e especialização na rotina de prefeituras, secretarias e câmaras." },
  { icone: "grade", t: "Tecnologia própria", d: "Equipe, desenvolvimento e evolução dos produtos feitos dentro da Cubo." },
  { icone: "pessoas", t: "Acompanhamento próximo", d: "Implantação, treinamento e suporte com a mesma equipe do começo ao fim." },
];

function PorOnde() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} id="comecar" className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <header className="sec-head reveal">
        <h2>Por onde sua instituição<br />quer começar?</h2>
        <div className="sec-head__side"><p>Cada produto da Cubo resolve uma frente da gestão pública. Escolha a sua e siga para o site do produto.</p></div>
      </header>
      <ul className="cb-doors">
        {PRODUTOS_CUBO.map((p, i) => (
          <li key={p.id} className="reveal" style={{ "--rd": `${80 + i * 90}ms` }}>
            <a href={p.href}>
              <span className="cb-doors__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cb-doors__goal">
                <strong>{p.objetivo}</strong>
                <small>{p.objetivoTexto}</small>
              </span>
              <span className="cb-doors__prod"><Icone nome={p.icone} size={18} />{p.nome}</span>
              <span className="cb-doors__go"><Icone nome="seta" size={18} /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Clientes() {
  return (
    <Secao id="clientes" titulo={<>Presente na gestão<br />de cidades como:</>} texto="Prefeituras que já usam tecnologia da Cubo para atender o cidadão.">
      <ul className="cb-cities">
        {CIDADES.map((x) => (
          <li key={x.c}><span className="cb-cities__ico"><Icone nome="predio" size={20} /></span><strong>{x.c}</strong><small>{x.uf}</small></li>
        ))}
      </ul>
      <Link className="cb-proof" to={`${CC_HOME}/clientes/joao-pessoa`}>
        <span className="cb-proof__tag">João Pessoa na Palma da Mão</span>
        <p>Mais de <b>188 mil demandas</b> em 2025 e <b>quase 80%</b> concluídas.</p>
        <span className="sec-link">Ver história <Icone nome="seta" size={14} /></span>
      </Link>
      <Pendencias itens={["Brasões das prefeituras clientes, com autorização de uso"]} />
    </Secao>
  );
}

function Produtos() {
  const cc = PRODUTOS_CUBO[0];
  return (
    <Secao id="produtos" titulo={<>Nossos<br />produtos.</>} texto="Três produtos, cada um com o seu site, a sua equipe e o mesmo jeito Cubo de trabalhar.">
      <a className="cb-prod cb-prod--main" href={CC_HOME}>
        <div className="cb-prod__copy">
          <LogoCidadeConectada altura={40} />
          <h3>{cc.frase}</h3>
          <ul>
            {[
              ["app", "SuperApp de Serviços"],
              ["interop", "Interoperabilidade"],
              ["chat", "Atendimento WhatsApp"],
              ["libras", "TeleAtendimento com Libras"],
              ["ia", "IA para Atendimento ao Cidadão"],
              ["os", "Conecta OS"],
            ].map(([i, n]) => <li key={n}><Icone nome={i} size={16} />{n}</li>)}
          </ul>
          <span className="sec-link">Conhecer o Cidade Conectada <Icone nome="seta" size={14} /></span>
        </div>
        <div className="cb-prod__art cb-prod__art--grid" aria-hidden="true">
          {["SuperApp", "WhatsApp", "ConectaOS", "IA"].map((k) => { const A = ARTES[k]; return <div key={k}><A /></div>; })}
        </div>
      </a>
      <div className="cb-prod__pair">
        <a className="cb-prod" href={ZP_HOME}>
          <div className="cb-prod__art" aria-hidden="true"><div className="cb-prod__win"><ProcessoVivo compacto /></div></div>
          <div className="cb-prod__copy">
            <LogoZeroPapel />
            <h3>Processos eletrônicos, do protocolo ao arquivo.</h3>
            <p>Sistema de processo e protocolo eletrônico para uma gestão sem papel.</p>
            <span className="sec-link">Conhecer o Cidade Zero Papel <Icone nome="seta" size={14} /></span>
          </div>
        </a>
        <a className="cb-prod" href={LC_HOME}>
          <div className="cb-prod__art" aria-hidden="true"><div className="cb-prod__win"><PainelVereador compacto /></div></div>
          <div className="cb-prod__copy">
            <LogoLegislativo />
            <h3>A porta de entrada digital de câmaras e assembleias.</h3>
            <p>A relação entre o Legislativo e o cidadão em um só lugar.</p>
            <span className="sec-link">Conhecer o Legislativo Conectado <Icone nome="seta" size={14} /></span>
          </div>
        </a>
      </div>
    </Secao>
  );
}

export default function CuboHome() {
  const posts = POSTS.filter((p) => !p.pendente).slice(0, 3);
  return (
    <Layout headerOverlay>
      <HeroCentro
        rotulo="Cubo Tecnologia"
        titulo="Entre a prefeitura e o cidadão, a gente."
        texto="Desenvolvemos soluções digitais que descomplicam a gestão e melhoram a vida dos cidadãos, unindo tecnologia e eficiência para construir cidades mais inteligentes e humanas."
        acoes={<>
          <a className="btn btn--light" href="#produtos">Conhecer produtos</a>
          <Link className="btn btn--outline-light" to="/sobre">Sobre a Cubo</Link>
        </>}
        cena={<CenaCubo />}
      />

      <PorOnde />
      <Clientes />
      <Produtos />

      <Secao titulo={<>Tecnologia com impacto<br />real na gestão pública.</>} texto="Números do aplicativo de serviços de João Pessoa, feito com o Cidade Conectada.">
        <dl className="cx-nums">
          {NUMEROS.map((n) => <div key={n.v}><dd>{n.v}</dd><dt>{n.r}</dt></div>)}
        </dl>
        <p className="cx-fonte">Fonte: Prefeitura de João Pessoa (01/01/2026 e 04/04/2026).</p>
        <Pendencias itens={["Anos de mercado", "Número de profissionais", "Total de cidades atendidas", "Total de usuários nas plataformas da Cubo"]} />
      </Secao>

      <Secao titulo={<>Por que as cidades<br />escolhem a Cubo.</>} texto="O que muda quando a tecnologia é feita para a gestão pública.">
        <Cartoes itens={MOTIVOS} />
      </Secao>

      <Secao>
        <div className="cx-faixa">
          <blockquote className="cx-quote">
            <p>“O aplicativo facilitou a vida de todos os cidadãos. Vinte e quatro horas por dia, qualquer pessoa tem acesso aos serviços da Prefeitura.”</p>
            <cite>Valdo Alves, secretário de Administração de João Pessoa (janeiro de 2026)</cite>
          </blockquote>
          <div>
            <h2>Histórias de quem vive essa transformação.</h2>
            <p>Gestores, servidores e cidadãos contam o que mudou na cidade.</p>
            <Link className="btn btn--primary" to="/blog">Ver histórias</Link>
          </div>
        </div>
        <Pendencias itens={["Vídeo: como a tecnologia muda a vida na cidade", "Prêmios, parcerias, certificações e associações, se houver"]} />
      </Secao>

      <PreviaBlog titulo={<>Exemplos, histórias<br />e guias.</>} texto="Últimos conteúdos do blog único da Cubo, de todos os produtos." posts={posts} />

      <Secao id="carreiras">
        <div className="cx-faixa cb-careers">
          <div>
            <h2>Construa o futuro das cidades com a gente.</h2>
            <p>Conheça a cultura da Cubo e as vagas abertas.</p>
            {VAGAS && <a className="btn btn--primary" href={VAGAS} target="_blank" rel="noreferrer">Ver vagas no LinkedIn</a>}
          </div>
          <div className="cb-careers__card">
            <span className="cx-card__ico"><Icone nome="mapa" size={22} /></span>
            <strong>Sede em João Pessoa (PB)</strong>
            <address>{CONTATO.endereco.slice(0, 1).join("")}<br />{CONTATO.endereco[3]}</address>
          </div>
        </div>
        <Pendencias itens={["Foto real da equipe", "Página de carreiras com cultura e vagas"]} />
      </Secao>

      <CtaFinal
        id="contato"
        titulo="Vamos transformar a gestão da sua cidade?"
        texto="Fale com a nossa equipe e descubra por onde começar."
        acoes={<>
          <a className="btn btn--light" href={FALE}>Falar com nossa equipe</a>
          <a className="btn btn--outline-light" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={16} /> WhatsApp</a>
          <a className="btn btn--outline-light" href={PARCEIRO}>Seja um parceiro</a>
        </>}
      />
    </Layout>
  );
}
