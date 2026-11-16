import { Link, useParams } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { Capa, PostCard } from "./partes.jsx";
import { postPorSlug, relacionados } from "../data/posts.js";
import "./pages.css";

// Blog · modelo de artigo (quadro "Blog · Modelo de artigo" do wireframe).
// Ordem: voltar, etiquetas, título, autoria, capa, "em resumo", números, texto, citação,
// fontes, chamada para a secretaria, relacionados e CTA final do produto.

function NaoEncontrado() {
  return (
    <Layout titulo="Post não encontrado">
      <div className="container pg-section pg-empty pg-empty--page">
        <h1>Post não encontrado</h1>
        <p>Ele pode ter mudado de endereço.</p>
        <Link className="btn btn--primary" to={`${BASE}/blog`}>Ver o blog</Link>
      </div>
    </Layout>
  );
}

/** Corpo do artigo, usado pelo blog do Cidade Conectada e pelo blog único da Cubo. */
export function ArtigoConteudo({ post, base = BASE, exemplosHref = `${BASE}/secretarias`, demoHref = `${BASE}/demonstracao` }) {
  const a = post.artigo;
  return (
    <>
        <article className="pg-article">
          <div className="pg-read">
            <Link className="pg-back" to={`${base}/blog`}>
              <Icone nome="seta" size={14} className="pg-back__ico" /> Voltar ao blog
            </Link>

            <ul className="pg-chips" aria-label="Etiquetas">
              {[post.tipo, post.secretaria, post.cidade, post.produto].filter(Boolean).map((c) => <li key={c}>{c}</li>)}
            </ul>

            <h1>{post.tituloLongo || post.titulo}</h1>
            <p className="pg-byline">
              Equipe Cubo · Publicado em <span className="ph">[data]</span>
              {post.leitura && <> · Leitura de {post.leitura} minutos</>}
            </p>
          </div>

          <div className="pg-wide"><Capa icone={post.icone} grande /></div>

          <div className="pg-read pg-prose">
            {a ? (
              <>
                <p className="pg-summary"><strong>Em resumo:</strong> {a.emResumo}</p>

                <dl className="pg-stats">
                  {a.numeros.map((n) => (
                    <div key={n.rotulo}><dd>{n.valor}</dd><dt>{n.rotulo}</dt></div>
                  ))}
                </dl>

                {a.secoes.map((s) => (
                  <section key={s.titulo}>
                    <h2>{s.titulo}</h2>
                    {s.passos && <ol className="pg-steps">{s.passos.map((t) => <li key={t}>{t}</li>)}</ol>}
                    {s.texto && <p>{s.texto}</p>}
                  </section>
                ))}

                {a.citacao && (
                  <blockquote className="pg-quote">
                    <p>“{a.citacao.texto}”</p>
                    <cite>{a.citacao.autor}</cite>
                  </blockquote>
                )}

                <section className="pg-sources">
                  <h2>Fontes</h2>
                  <ul>{a.fontes.map((x) => <li key={x}>{x}</li>)}</ul>
                </section>
              </>
            ) : (
              <>
                <p className="pg-summary"><strong>Em resumo:</strong> {post.resumo}</p>
                <p><span className="ph">Texto completo em produção pela Cubo</span></p>
              </>
            )}

            <aside className="pg-next">
              <p>Quer algo parecido na sua cidade? Veja os exemplos de {post.secretaria} ou fale com um especialista.</p>
              <div className="pg-next__links">
                <Link className="sec-link" to={exemplosHref}>Ver exemplos de {post.secretaria} <Icone nome="seta" size={14} /></Link>
                <Link className="sec-link" to={demoHref}>Agendar demonstração <Icone nome="seta" size={14} /></Link>
              </div>
            </aside>
          </div>
        </article>

        <section className="container pg-section">
          <h2 className="pg-h2">Continue lendo</h2>
          <div className="pg-grid">
            {relacionados(post).map((p) => <PostCard key={p.slug} post={p} base={base} />)}
          </div>
        </section>

    </>
  );
}

export default function BlogArtigo() {
  const { slug } = useParams();
  const post = postPorSlug(slug);
  if (!post) return <NaoEncontrado />;

  return (
    <Layout titulo={post.titulo}>
      <ArtigoConteudo post={post} />
      <CtaFinal />
    </Layout>
  );
}
