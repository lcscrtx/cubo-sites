import { Link, NavLink, useParams } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { ARTES } from "../sections/ProdutoArt.jsx";
import { HeroCor, Secao, Pendencias, LinkSeta } from "./partes.jsx";
import { TelaProduto } from "./HeroArtes.jsx";
import { PRODUTOS, produtoPorSlug } from "../data/produtos.js";
import "../sections/Produtos.css";
import "./pages.css";
import "./internas.css";

// Página padrão de produto (quadros "Página de produto" e "Conteúdo dos 6 produtos"),
// na linguagem da Home: hero colorido com a tela do produto, abas entre produtos,
// antes e depois, o que faz, recursos, resultado, como começar, venda cruzada, perguntas e CTA.

const ETAPAS = [
  { t: "Diagnóstico", d: "Entendemos as prioridades da cidade." },
  { t: "Configuração", d: "O produto ganha a cara da prefeitura." },
  { t: "Capacitação", d: "A equipe aprende a usar." },
  { t: "Lançamento", d: "O serviço chega ao cidadão." },
];

function Arte({ nome }) {
  const A = ARTES[nome];
  return <div className="in-art" aria-hidden="true"><A /></div>;
}

export default function Produto() {
  const { slug } = useParams();
  const p = produtoPorSlug(slug);

  if (!p) {
    return (
      <Layout titulo="Produto não encontrado">
        <div className="container pg-section pg-empty pg-empty--page">
          <h1>Produto não encontrado</h1>
          <Link className="btn btn--primary" to={`${BASE}/produtos`}>Ver todos os produtos</Link>
        </div>
      </Layout>
    );
  }

  const cruzada = p.cruzada.map(produtoPorSlug);
  const blocosComArte = p.blocos.some((b) => b.arte);
  const pend = [
    p.validar,
    !blocosComArte && "Descrição de cada função do produto",
    p.provaPendente && `Resultado em cidade cliente: ${p.provaPendente}`,
    "Prazo de implantação deste produto",
    p.dores[0].texto ? null : "Principal problema que o produto resolve na operação",
  ].filter(Boolean);

  return (
    <Layout titulo={p.curto} headerOverlay>
      <HeroCor
        key={p.slug}
        crumbs={[{ label: "Início", to: BASE }, { label: "Produtos", to: `${BASE}/produtos` }, { label: p.curto }]}
        rotulo={p.promessa}
        titulo={p.nome}
        texto={p.resumoHero}
        acoes={<>
          <Link className="btn btn--primary" to={`${BASE}/demonstracao?produtos=${p.slug}`}>Ver demonstração</Link>
          <Link className="btn btn--ghost" to={`${BASE}/produtos#monte`}>Adicionar à minha solução</Link>
        </>}
        arte={<TelaProduto arte={p.arte} nome={p.curto} />}
      />

      {/* Abas entre os 6 produtos */}
      <nav className="in-tabs in-tabs--sticky" aria-label="Produtos">
        <div className="container in-tabs__row">
          {PRODUTOS.map((x) => (
            <NavLink key={x.slug} to={`${BASE}/produtos/${x.slug}`} className={({ isActive }) => (isActive ? "is-on" : "")}>
              <Icone nome={x.icone} size={16} />{x.curto}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Antes e depois */}
      <Secao key={`muda-${p.slug}`} titulo={<>O que muda<br />na prefeitura.</>} texto={p.promessa}>
        {p.dores.length > 1 ? (
          <div className="in-pains">
            {p.dores.map((d, i) => (
              <div key={d.titulo} className="in-pain in-pain--big">
                <span className="in-pain__n">{String(i + 1).padStart(2, "0")}</span>
                <strong>{d.titulo}</strong>
                <p>{d.texto}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="in-ba">
            <div className="in-ba__side in-ba__side--before">
              <span className="in-ba__tag">Hoje</span>
              <p>{p.dores[0].texto ?? "Principal problema que o produto resolve na operação."}</p>
            </div>
            <span className="in-ba__arrow" aria-hidden="true"><Icone nome="seta" size={22} /></span>
            <div className="in-ba__side in-ba__side--after">
              <span className="in-ba__tag">Com o {p.curto}</span>
              <p>{p.promessa}</p>
            </div>
          </div>
        )}
      </Secao>

      {/* O que faz */}
      <Secao key={`faz-${p.slug}`} titulo={<>O que o {p.curto} faz.</>} texto={blocosComArte ? "Três partes que trabalham juntas: para o cidadão, para o servidor e para quem decide." : "As funções principais do produto, no mesmo modelo de página dos outros cinco."}>
        {blocosComArte ? (
          <div className="in-feats">
            {p.blocos.map((b, i) => (
              <div key={b.titulo} className="in-feat">
                <div className="in-feat__copy">
                  <span className="in-blocks__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.titulo}</h3>
                  <p>{b.texto}</p>
                </div>
                <Arte nome={b.arte} />
              </div>
            ))}
          </div>
        ) : (
          <div className="in-does">
            <Arte nome={p.arte} />
            <ul className="in-does__list">
              {p.blocos.map((b, i) => (
                <li key={b.titulo} style={{ "--d": `${i * 80}ms` }}>
                  <span className="in-does__n">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{b.titulo}{b.condicional && <small> ({b.condicional})</small>}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {p.extra && <p className="in-extra"><Icone nome="libras" size={18} /> {p.extra}</p>}
      </Secao>

      {/* Recursos (só onde o wireframe lista) */}
      {p.recursos && (
        <Secao key={`rec-${p.slug}`} titulo={<>Recursos<br />incluídos.</>} texto="Tudo o que vem no SuperApp, com exemplos reais por secretaria." acao={<LinkSeta to={`${BASE}/secretarias`}>Ver todas as secretarias</LinkSeta>}>
          <ul className="in-res">
            {p.recursos.map((r) => <li key={r}><Icone nome="os" size={16} />{r}</li>)}
          </ul>
          <div className="in-uses">
            <span>Exemplos de uso:</span>
            {[["saude", "Saúde"], ["infraestrutura", "Infraestrutura"], ["meio-ambiente", "Meio Ambiente"]].map(([id, n]) => (
              <Link key={id} className="in-uses__chip" to={`${BASE}/secretarias#${id}`}>{n}</Link>
            ))}
          </div>
        </Secao>
      )}

      {/* Resultado */}
      <Secao key={`prova-${p.slug}`}>
        <div className="in-proof">
          <blockquote>
            <span className="in-proof__tag">João Pessoa na Palma da Mão</span>
            <p>“{p.prova?.citacao ?? "O aplicativo facilitou a vida de todos os cidadãos."}”</p>
            <cite>{p.prova?.autor ?? "Valdo Alves, secretário de Administração de João Pessoa (janeiro de 2026)"}</cite>
            <LinkSeta to={`${BASE}/clientes/joao-pessoa`}>Ler história completa</LinkSeta>
          </blockquote>
          <dl>
            <div><dd>+188 mil</dd><dt>demandas em 2025</dt></div>
            <div><dd>Quase 80%</dd><dt>de conclusão</dt></div>
          </dl>
        </div>
      </Secao>

      {/* Como começar */}
      <Secao key={`comeca-${p.slug}`} titulo={<>Como<br />começar.</>} texto="As mesmas quatro etapas em todos os produtos, com o prazo próprio de cada um.">
        <ol className="in-steps in-steps--rich">
          {ETAPAS.map((e, i) => (
            <li key={e.t} style={{ "--d": `${i * 90}ms` }}>
              <span>{i + 1}</span>
              <div><strong>{e.t}</strong><p>{e.d}</p></div>
            </li>
          ))}
        </ol>
      </Secao>

      {/* Venda cruzada */}
      <Secao key={`cruz-${p.slug}`} titulo={<>Funciona ainda<br />melhor com.</>} texto="Os produtos do Cidade Conectada conversam entre si." acao={<LinkSeta to={`${BASE}/produtos`}>Conheça a solução completa</LinkSeta>}>
        <div className="pd-grid">
          {cruzada.map((c) => {
            const A = ARTES[c.arte];
            return (
              <Link key={c.slug} to={`${BASE}/produtos/${c.slug}`} className="pd-card" data-in>
                <div className="pd-card__art"><A /></div>
                <div className="pd-card__body">
                  <h3>{c.curto}</h3>
                  <p>{c.promessa}</p>
                  <span className="pd-card__more">Conhecer <Icone nome="seta" size={14} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Secao>

      {/* Perguntas */}
      <Secao key={`faq-${p.slug}`} titulo={<>Perguntas<br />frequentes.</>} texto="Não achou a sua?" acao={<LinkSeta to={`${BASE}/demonstracao?produtos=${p.slug}`}>Falar com especialista</LinkSeta>}>
        <dl className="in-faq">
          <div><dt>Posso contratar este produto separadamente?</dt><dd>Sim. Ele pode ser contratado sozinho ou com os demais produtos.</dd></div>
          {p.slug === "superapp" && <div><dt>O aplicativo pode ter o nome da minha prefeitura?</dt><dd>Sim. Nome, cores e serviços são definidos de acordo com a sua cidade.</dd></div>}
        </dl>
        <Pendencias itens={pend} />
      </Secao>

      <CtaFinal texto={`Veja o ${p.curto} em ação com um especialista.`} hrefBotao={`${BASE}/demonstracao?produtos=${p.slug}`} completo={false} />
    </Layout>
  );
}
