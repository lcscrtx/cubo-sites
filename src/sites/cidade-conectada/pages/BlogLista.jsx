import { Link } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import { PageHero, Capa, PostCard, metaDoPost } from "./partes.jsx";
import { POSTS } from "../data/posts.js";
import "./pages.css";

// Blog · lista (quadro "Blog · Lista com filtros" do wireframe, sem a barra de filtros:
// com poucos posts ela só atrapalhava). Destaque editorial no topo e o resto em grade.

export default function BlogLista() {
  const destaque = POSTS.find((p) => p.destaque);
  const lista = POSTS.filter((p) => !p.destaque);

  return (
    <Layout titulo="Blog">
      <PageHero
        rotulo="Blog"
        titulo="Exemplos reais, histórias e guias para digitalizar a gestão pública."
        texto="Encontre o que outras cidades e secretarias já estão fazendo."
      />

      <section className="container pg-section">
        {destaque && (
          <Link className="pg-feature" to={`${BASE}/blog/${destaque.slug}`}>
            <Capa icone={destaque.icone} grande />
            <div className="pg-feature__body">
              <span className="pg-post__meta">{metaDoPost(destaque)}</span>
              <h2>{destaque.titulo}</h2>
              <p>{destaque.resumo}</p>
              <span className="btn btn--primary">Ler história</span>
            </div>
          </Link>
        )}

        <h2 className="pg-h2">Mais recentes</h2>
        <div className="pg-grid">
          {lista.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
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
