import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icone from "../../ds/Icone.jsx";
import Grainient from "../../ds/bg/Grainient.jsx";
import { useInView, prefersReducedMotion } from "../../ds/motion.js";
import { PRODUTOS_CUBO } from "./marcas.jsx";
import "../cidade-conectada/sections/Hero.css";
import "../cidade-conectada/sections/Faq.css";
import "../cidade-conectada/sections/Blog.css";

// Blocos repetidos nos sites da Cubo, do Legislativo e do Zero Papel,
// na mesma linguagem da Home do Cidade Conectada.

/** Ciclo simples para destacar um item por vez (para quando o usuário pede menos movimento). */
export function useCiclo(n, ms, ativo = true) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!ativo || prefersReducedMotion()) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms, ativo]);
  return i;
}

/** Hero de Home: degradê da marca na tela inteira, texto centralizado e a cena do produto embaixo. */
export function HeroCentro({ rotulo, titulo, texto, acoes, nota, cena }) {
  return (
    <section className="cc-hero hx">
      <div className="cc-hero__bg" aria-hidden="true">
        <Grainient
          colors={["#16205B", "#1F299C", "#0372FF", "#4F9BFF"]}
          angle={160}
          speed={prefersReducedMotion() ? 0 : 0.5}
          flow={0.9}
          softness={1}
          silk={0.5}
          grainAmount={0}
          contrast={1.05}
          stir={0.8}
        />
      </div>
      <div className="container cc-hero__copy">
        {rotulo && <span className="cc-hero__eyebrow">{rotulo}</span>}
        <h1 className="cc-hero__title">{titulo}</h1>
        {texto && <p className="cc-hero__lead">{texto}</p>}
        {acoes && <div className="cc-hero__actions">{acoes}</div>}
        {nota && <div className="hx-nota">{nota}</div>}
      </div>
      {cena && <div className="container cc-hero__scene hx-scene">{cena}</div>}
    </section>
  );
}

/** Cartões dos produtos da Cubo. exceto = id do site atual (some da lista). */
export function OutrosProdutos({ exceto, titulo, texto }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  const lista = PRODUTOS_CUBO.filter((p) => p.id !== exceto);
  return (
    <section ref={ref} className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <header className="sec-head reveal">
        <h2>{titulo}</h2>
        {texto && <div className="sec-head__side"><p>{texto}</p></div>}
      </header>
      <div className={`cx-outros cx-outros--${lista.length}`}>
        {lista.map((p, i) => (
          <a key={p.id} className="cx-outro reveal" href={p.href} style={{ "--rd": `${80 + i * 90}ms` }}>
            <span className="cx-outro__ico"><Icone nome={p.icone} size={22} /></span>
            <span className="cx-outro__logo"><p.Logo /></span>
            <p>{p.frase}</p>
            <span className="cx-outro__more">Conhecer <Icone nome="seta" size={14} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Perguntas com respostas sempre visíveis (mesmo desenho da Home do Cidade Conectada). */
export function Perguntas({ titulo, texto, botao, itens, rodape }) {
  const [ref, on] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} className={`fq js-reveal ${on ? "is-in" : ""}`} id="faq">
      <div className="container fq-body">
        <aside className="fq-side reveal">
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
          {botao && <a className="btn btn--ghost" href={botao.href}>{botao.label}</a>}
        </aside>
        <div>
          <dl className="fq-list">
            {itens.map((q, i) => (
              <div key={q.p} className="fq-item reveal" style={{ "--rd": `${60 + i * 60}ms` }}>
                <dt>{q.p}</dt>
                <dd>{q.r}</dd>
              </div>
            ))}
          </dl>
          {rodape}
        </div>
      </div>
    </section>
  );
}

const ICONE_AREA = { Saúde: "saude", Infraestrutura: "infra", "Meio Ambiente": "ambiente", Administração: "app", "Desenvolvimento Urbano": "predio", "Gestão digital": "grade" };

/** Prévia do blog único. Sem posts do produto, mostra um aviso honesto e leva ao blog da Cubo. */
export function PreviaBlog({ titulo, texto, posts, vazio }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`bl js-reveal ${on ? "is-in" : ""}`} id="conteudo">
      <div className="container">
        <header className="sec-head reveal">
          <h2>{titulo}</h2>
          <div className="sec-head__side">
            {texto && <p>{texto}</p>}
            <Link className="sec-link" to="/blog">Ver blog <Icone nome="seta" size={14} /></Link>
          </div>
        </header>
        {posts?.length ? (
          <div className="bl-grid">
            {posts.map((p, i) => (
              <Link key={p.slug} className="bl-card reveal" to={`/blog/${p.slug}`} style={{ "--rd": `${80 + i * 90}ms` }}>
                <div className="bl-card__cover" aria-hidden="true"><Icone nome={p.icone || ICONE_AREA[p.secretaria] || "blog"} size={56} /></div>
                <span className="bl-card__meta">{p.tipo.replace(" de sucesso", "").replace(" de uso", "")} · {p.produto}</span>
                <h3>{p.titulo}</h3>
                <span className="bl-card__more">Ler <Icone nome="seta" size={14} /></span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="cx-vazio reveal">
            <span className="cx-vazio__ico"><Icone nome="blog" size={22} /></span>
            <div>
              <strong>{vazio?.titulo ?? "Primeiros conteúdos em produção"}</strong>
              <p>{vazio?.texto ?? "Enquanto isso, veja exemplos reais de gestão digital no blog da Cubo."}</p>
            </div>
            <Link className="btn btn--ghost" to="/blog">Ir para o blog</Link>
          </div>
        )}
      </div>
    </section>
  );
}

/** Jornada em etapas numeradas: a etapa ativa avança sozinha quando a seção aparece. */
export function Passos({ id, titulo, texto, passos, rodape }) {
  const [ref, on] = useInView({ threshold: 0.3 });
  const ativo = useCiclo(passos.length, 1800, on);
  return (
    <section ref={ref} id={id} className={`container in-s js-reveal ${on ? "is-in" : ""}`}>
      <header className="sec-head reveal">
        <h2>{titulo}</h2>
        {texto && <div className="sec-head__side"><p>{texto}</p></div>}
      </header>
      <ol className="cx-passos reveal" style={{ "--n": passos.length, "--rd": "100ms" }}>
        <span className="cx-passos__trilho" aria-hidden="true"><i style={{ width: `${(ativo / (passos.length - 1)) * 100}%` }} /></span>
        {passos.map((p, i) => (
          <li key={p.t} className={i === ativo ? "is-on" : i < ativo ? "is-done" : ""}>
            <span className="cx-passos__n">{i < ativo ? <Icone nome="check" size={14} /> : i + 1}</span>
            {p.icone && <span className="cx-passos__ico"><Icone nome={p.icone} size={20} /></span>}
            <strong>{p.t}</strong>
            <p>{p.d}</p>
          </li>
        ))}
      </ol>
      {rodape}
    </section>
  );
}

/** Grade de cartões com ícone, título e texto. */
export function Cartoes({ itens, colunas = 3, numerar = false }) {
  return (
    <div className={`cx-cards cx-cards--${colunas}`}>
      {itens.map((c, i) => (
        <article key={c.t} className="cx-card" style={{ "--d": `${i * 70}ms` }}>
          {numerar ? <span className="cx-card__n">{String(i + 1).padStart(2, "0")}</span> : c.icone && <span className="cx-card__ico"><Icone nome={c.icone} size={22} /></span>}
          <h3>{c.t}</h3>
          {c.d && <p>{c.d}</p>}
          {c.lista && <ul>{c.lista.map((x) => <li key={x}><Icone nome="check" size={14} />{x}</li>)}</ul>}
        </article>
      ))}
    </div>
  );
}
