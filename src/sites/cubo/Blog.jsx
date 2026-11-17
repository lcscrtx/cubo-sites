import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout, { FALE } from "./Layout.jsx";
import { PageHero, Capa, PostCard, metaDoPost, Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { ArtigoConteudo } from "../cidade-conectada/pages/BlogArtigo.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import { POSTS, postPorSlug, relacionados } from "../cidade-conectada/data/posts.js";
import Cta from "./home/Cta.jsx";
import { CC_HOME } from "../comum/marcas.jsx";
import Icone from "../../ds/Icone.jsx";
import CapaPost from "./blog/CapaPost.jsx";
import "../cidade-conectada/pages/pages.css";
import "./cubo.css";

// Blog único da Cubo (quadros "Blog · Lista" e "Blog · Modelo de artigo").
// Reúne os posts de todos os produtos; os sites de produto mostram a prévia filtrada.
// Sem barra de filtros, como no blog do Cidade Conectada: com poucos posts ela só atrapalha.

const HOME_DO_PRODUTO = { "Cidade Conectada": CC_HOME };

/* Topo do blog, na linha da página Resources do mindcloud.co: o post em destaque com a capa ao lado */
function TopoBlog({ post }) {
  return (
    <section className="bt">
      <div className="container bt__inner">
        <div>
          <span className="bt__meta">Blog da Cubo<i />{post.tipo}<i />{post.produto}</span>
          <h1>{post.titulo}</h1>
          <p>{post.resumo}</p>
          <Link className="bt__btn" to={`/blog/${post.slug}`}>Ler a história <Icone nome="seta" size={14} /></Link>
        </div>
        <Link className="bt__capa" to={`/blog/${post.slug}`} aria-label={post.titulo}><CapaPost post={post} grande /></Link>
      </div>
    </section>
  );
}

/* Lista de posts, como no Resources do mindcloud.co: abas por tipo, os dois mais recentes em cartões
   grandes com capa e o restante em linhas simples. Post ainda sem texto aparece com "Em produção". */
const ABAS_BLOG = [
  ["Todos", null],
  ["Histórias de sucesso", "História de sucesso"],
  ["Exemplos de uso", "Exemplo de uso"],
  ["Guias", "Guia"],
];

function ListaPosts({ posts }) {
  const [aba, setAba] = useState(0);
  const tipo = ABAS_BLOG[aba][1];
  const filtrados = tipo ? posts.filter((p) => p.tipo === tipo) : posts;
  const grandes = filtrados.filter((p) => !p.pendente).slice(0, 2);
  const linhas = filtrados.filter((p) => !grandes.includes(p));

  return (
    <section className="bl2">
      <div className="container">
        <div className="bl2__abas" role="tablist" aria-label="Tipos de post">
          {ABAS_BLOG.map(([rotulo], i) => (
            <button key={rotulo} type="button" role="tab" aria-selected={i === aba} className={i === aba ? "is-on" : ""} onClick={() => setAba(i)}>{rotulo}</button>
          ))}
        </div>

        {grandes.length > 0 && (
          <div className="bl2__grandes">
            {grandes.map((p) => (
              <Link key={p.slug} className="bl2__card" to={`/blog/${p.slug}`}>
                <CapaPost post={p} />
                <span className="bt__meta">{p.produto}<i />{p.secretaria}</span>
                <h2>{p.titulo}</h2>
                <p>{p.resumo}</p>
              </Link>
            ))}
          </div>
        )}

        {linhas.length > 0 && (
          <ul className="bl2__linhas">
            {linhas.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <span className="bl2__onde">{p.cidade ?? p.produto}</span>
                  <strong>{p.titulo}</strong>
                  <span className="bl2__tipo">{p.pendente ? <em>Em produção</em> : p.tipo}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {filtrados.length === 0 && <p className="bl2__vazio">Ainda não há posts deste tipo.</p>}
        <Pendencias itens={["Primeiros posts do Cidade Zero Papel e do Legislativo Conectado", "Datas de publicação dos posts"]} />
      </div>
    </section>
  );
}

// Refeito seção por seção, com aprovação a cada passo: topo com o post em destaque e a lista de posts.
// A versão anterior continua em BlogCuboAntigo, para reaproveitar.
export function BlogCubo() {
  const destaque = POSTS.find((p) => p.destaque);
  return (
    <Layout titulo="Blog">
      <TopoBlog post={destaque} />
      <ListaPosts posts={POSTS.filter((p) => !p.destaque)} />
    </Layout>
  );
}

export function BlogCuboAntigo() {
  const destaque = POSTS.find((p) => p.destaque);
  const lista = POSTS.filter((p) => !p.destaque);

  return (
    <Layout titulo="Blog">
      <PageHero
        rotulo="Blog da Cubo"
        titulo="Exemplos reais, histórias e guias para digitalizar a gestão pública."
        texto="Encontre o que outras cidades e secretarias já estão fazendo, em todos os produtos da Cubo."
      />

      <section className="container pg-section">
        {destaque && (
          <Link className="pg-feature" to={`/blog/${destaque.slug}`}>
            <Capa icone={destaque.icone} grande />
            <div className="pg-feature__body">
              <span className="pg-post__meta">{metaDoPost(destaque)} · {destaque.produto}</span>
              <h2>{destaque.titulo}</h2>
              <p>{destaque.resumo}</p>
              <span className="btn btn--primary">Ler história</span>
            </div>
          </Link>
        )}

        <h2 className="pg-h2">Mais recentes</h2>
        <div className="pg-grid">
          {lista.map((p) => <PostCard key={p.slug} post={p} base="" />)}
        </div>
        <Pendencias itens={["Primeiros posts do Cidade Zero Papel e do Legislativo Conectado"]} />
      </section>

      <section className="container pg-section">
        <div className="pg-news">
          <div>
            <h2>Receba novos exemplos e guias</h2>
            <p>Conteúdo sobre gestão pública digital no seu e-mail.</p>
          </div>
          <form className="pg-news__form" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="news-email">Seu e-mail</label>
            <input id="news-email" type="email" required placeholder="seu@email.gov.br" />
            <button type="submit" className="btn btn--primary">Assinar newsletter</button>
          </form>
          <p className="pg-news__note"><span className="ph">Integração da newsletter a definir</span></p>
        </div>
      </section>
    </Layout>
  );
}

export function ArtigoCubo() {
  const { slug } = useParams();
  const post = postPorSlug(slug);

  if (!post) {
    return (
      <Layout titulo="Post não encontrado">
        <div className="container pg-section pg-empty pg-empty--page">
          <h1>Post não encontrado</h1>
          <p>Ele pode ter mudado de endereço.</p>
          <Link className="btn btn--primary" to="/blog">Ver o blog</Link>
        </div>
      </Layout>
    );
  }

  // Refeito seção por seção, com aprovação a cada passo: topo, corpo, relacionados e o CTA final da Home.
  const home = HOME_DO_PRODUTO[post.produto];
  return (
    <Layout titulo={post.titulo}>
      <TopoArtigo post={post} />
      <CorpoArtigo post={post} home={home} />
      <Relacionados post={post} />
      <Cta />
    </Layout>
  );
}

/* Corpo do artigo numa coluna estreita, como no mindcloud.co: números em quadros, seções com
   subtítulo médio, passos numerados, citação, fontes e uma chamada para o produto no fim */
function CorpoArtigo({ post, home }) {
  const a = post.artigo;
  return (
    <article className="ca">
      <div className="ca__col">
        {a ? (
          <>
            <dl className="ca__nums">
              {a.numeros.map((n) => <div key={n.rotulo}><dd>{n.valor}</dd><dt>{n.rotulo}</dt></div>)}
            </dl>
            {a.secoes.map((s) => (
              <section key={s.titulo}>
                <h2>{s.titulo}</h2>
                {s.passos && <ol className="ca__passos">{s.passos.map((t) => <li key={t}>{t}</li>)}</ol>}
                {s.texto && <p>{s.texto}</p>}
              </section>
            ))}
            {a.citacao && (
              <figure className="ca__citacao">
                <blockquote><p>“{a.citacao.texto}”</p></blockquote>
                <figcaption>{a.citacao.autor}</figcaption>
              </figure>
            )}
            <section className="ca__fontes">
              <h2>Fontes</h2>
              <ul>{a.fontes.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          </>
        ) : (
          <p className="ca__producao">O texto completo deste post está em produção pela equipe da Cubo.</p>
        )}

        <aside className="ca__proximo">
          <p>Quer algo parecido na sua cidade?</p>
          <div>
            {home && <Link className="ca__link" to={`${home}/secretarias`}>Ver exemplos de {post.secretaria} <Icone nome="seta" size={14} /></Link>}
            <a className="ca__link" href={home ? `${home}/demonstracao` : FALE}>{home ? "Agendar demonstração" : "Falar com a equipe"} <Icone nome="seta" size={14} /></a>
          </div>
        </aside>
      </div>
    </article>
  );
}

/* Continue lendo: até três posts relacionados, nos mesmos cartões da lista do blog */
function Relacionados({ post }) {
  const outros = relacionados(post);
  if (!outros.length) return null;
  return (
    <section className="rl">
      <div className="container">
        <h2>Continue lendo</h2>
        <div className="rl__grid">
          {outros.map((p) => (
            <Link key={p.slug} className="bl2__card" to={`/blog/${p.slug}`}>
              <CapaPost post={p} />
              <span className="bt__meta">{p.produto}<i />{p.secretaria}</span>
              <h3>{p.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Topo do artigo, como nos posts do mindcloud.co: voltar e contexto numa linha, título e resumo
   centralizados e a capa larga embaixo */
function TopoArtigo({ post }) {
  const leitura = post.leitura ? `${post.leitura} min de leitura` : null;
  return (
    <section className="ta">
      <div className="container">
        <div className="ta__linha">
          <Link className="ta__voltar" to="/blog"><Icone nome="seta" size={14} /> Voltar ao blog</Link>
          <span className="bt__meta">{post.tipo}<i />{post.produto}{leitura && <><i />{leitura}</>}</span>
          <span aria-hidden="true" />
        </div>
        <div className="ta__texto">
          <h1>{post.tituloLongo || post.titulo}</h1>
          <p>{post.artigo?.emResumo ?? post.resumo}</p>
        </div>
        <div className="ta__capa"><CapaPost post={post} grande /></div>
      </div>
    </section>
  );
}
