import { Link, useParams } from "react-router-dom";
import Layout, { FALE } from "./Layout.jsx";
import { PageHero, Capa, PostCard, metaDoPost, Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { ArtigoConteudo } from "../cidade-conectada/pages/BlogArtigo.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import { POSTS, postPorSlug } from "../cidade-conectada/data/posts.js";
import { CC_HOME } from "../comum/marcas.jsx";
import "../cidade-conectada/pages/pages.css";

// Blog único da Cubo (quadros "Blog · Lista" e "Blog · Modelo de artigo").
// Reúne os posts de todos os produtos; os sites de produto mostram a prévia filtrada.
// Sem barra de filtros, como no blog do Cidade Conectada: com poucos posts ela só atrapalha.

const HOME_DO_PRODUTO = { "Cidade Conectada": CC_HOME };

export function BlogCubo() {
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

  const home = HOME_DO_PRODUTO[post.produto];
  return (
    <Layout titulo={post.titulo}>
      <ArtigoConteudo
        post={post}
        base=""
        exemplosHref={home ? `${home}/secretarias` : "/#produtos"}
        demoHref={home ? `${home}/demonstracao` : "/#contato"}
      />
      <CtaFinal
        id="contato"
        texto={home ? `Veja o ${post.produto} em ação com um especialista.` : "Fale com a nossa equipe."}
        acoes={<a className="btn btn--light" href={home ? `${home}/demonstracao` : FALE}>{home ? "Agendar demonstração" : "Falar com nossa equipe"}</a>}
      />
    </Layout>
  );
}
