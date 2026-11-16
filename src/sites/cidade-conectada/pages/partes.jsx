import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import Grainient from "../../../ds/bg/Grainient.jsx";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import { BASE } from "../Layout.jsx";
import "./heroCor.css";

// Peças comuns das páginas internas do Cidade Conectada.

/** Topo simples (blog, materiais, ajuda): rótulo, título e texto de apoio. */
export function PageHero({ rotulo, titulo, texto, children }) {
  return (
    <header className="pg-hero">
      <div className="container">
        {rotulo && <span className="pg-hero__eyebrow">{rotulo}</span>}
        <h1>{titulo}</h1>
        {texto && <p className="pg-hero__lead">{texto}</p>}
        {children}
      </div>
    </header>
  );
}

/**
 * Hero colorido das páginas internas, na mesma linguagem da Home:
 * bloco arredondado com o degradê da marca, cabeçalho por cima (Layout headerOverlay),
 * texto branco à esquerda e uma ilustração da página à direita.
 */
export function HeroCor({ crumbs, rotulo, titulo, texto, acoes, arte }) {
  return (
    <section className="hc">
      <div className="hc__bg" aria-hidden="true">
        <Grainient
          colors={["#16205B", "#1F299C", "#0372FF", "#4F9BFF"]}
          angle={150}
          speed={prefersReducedMotion() ? 0 : 0.5}
          flow={0.9}
          softness={1}
          silk={0.5}
          grainAmount={0}
          contrast={1.05}
          stir={0.8}
        />
      </div>
      <div className="container hc__grid">
        <div className="hc__copy">
          {crumbs && (
            <nav className="hc__crumbs" aria-label="Você está em">
              {crumbs.map((c, i) => (
                <span key={c.label}>
                  {i > 0 && <span className="hc__sep">/</span>}
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {rotulo && <span className="hc__eyebrow">{rotulo}</span>}
          <h1>{titulo}</h1>
          {texto && <p className="hc__lead">{texto}</p>}
          {acoes && <div className="hc__actions">{acoes}</div>}
        </div>
        {arte && <div className="hc__art" aria-hidden="true">{arte}</div>}
      </div>
    </section>
  );
}

/** Seção com cabeçalho no padrão da Home (título à esquerda, apoio à direita) e entrada ao rolar. */
export function Secao({ id, titulo, texto, acao, className = "", children }) {
  const [ref, on] = useInView({ threshold: 0.12 });
  return (
    <section ref={ref} id={id} className={`container in-s js-reveal ${on ? "is-in" : ""} ${className}`}>
      {(titulo || texto) && (
        <header className="sec-head reveal">
          {titulo && <h2>{titulo}</h2>}
          {(texto || acao) && (
            <div className="sec-head__side">
              {texto && <p>{texto}</p>}
              {acao}
            </div>
          )}
        </header>
      )}
      <div className="reveal" style={{ "--rd": "100ms" }}>{children}</div>
    </section>
  );
}

/** Pendências da Cubo agrupadas numa nota discreta, em vez de espalhadas pelo conteúdo. */
export function Pendencias({ itens }) {
  if (!itens?.length) return null;
  return (
    <details className="in-pend">
      <summary><span className="ph">A confirmar pela Cubo</span> {itens.length} {itens.length === 1 ? "item" : "itens"}</summary>
      <ul>{itens.map((t) => <li key={t}>{t}</li>)}</ul>
    </details>
  );
}

/** Link "seta" no padrão do site. */
export function LinkSeta({ to, children }) {
  return <Link className="sec-link" to={to}>{children} <Icone nome="seta" size={14} /></Link>;
}

/** Capa plana enquanto não há fotos: ícone de traço da área sobre o painel. */
export function Capa({ icone, grande }) {
  return (
    <div className={`pg-cover ${grande ? "pg-cover--lg" : ""}`} aria-hidden="true">
      <Icone nome={icone} size={grande ? 72 : 52} />
    </div>
  );
}

export function metaDoPost(p) {
  return [p.tipo.replace(" de sucesso", "").replace(" de uso", ""), p.secretaria, p.cidade].filter(Boolean).join(" · ");
}

export function PostCard({ post, base = BASE }) {
  return (
    <Link className="pg-post" to={`${base}/blog/${post.slug}`}>
      <Capa icone={post.icone} />
      <span className="pg-post__meta">{metaDoPost(post)}</span>
      <h3>{post.titulo}</h3>
      <p>{post.pendente ? <span className="ph">{post.resumo}</span> : post.resumo}</p>
      <span className="pg-post__more">
        Ler <Icone nome="seta" size={14} />
      </span>
    </Link>
  );
}
