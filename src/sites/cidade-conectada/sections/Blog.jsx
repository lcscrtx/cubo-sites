import { Link } from "react-router-dom";
import { useInView } from "../../../ds/motion.js";
import { POSTS } from "../data/posts.js";
import { BASE } from "../Layout.jsx";
import "./Blog.css";

// Seção 10 · Blog: os 3 posts mais recentes do Cidade Conectada.
// Títulos do wireframe. Enquanto não há fotos, a capa é plana: ícone de traço da área sobre o painel.
// Quando o blog existir, estes dados vêm dele (prévia em todos os sites).

const ICONES = {
  saude: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" />,
  infra: <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z" />,
  ambiente: <path d="M12 21v-6m0 0c-4 0-7-2.7-7-6.5C5 5 8.1 3 12 3s7 2 7 5.5c0 3.8-3 6.5-7 6.5Zm0-6 3-3m-3 1-2.5-2.5" />,
};

// os três da Home, na ordem do wireframe
const NA_HOME = ["cartao-sus-digital", "iluminacao-publica-lidera-pedidos", "poda-de-arvores"].map((s) => POSTS.find((p) => p.slug === s));
const AREA = { Saúde: "saude", Infraestrutura: "infra", "Meio Ambiente": "ambiente" };

export default function Blog() {
  const [ref, on] = useInView({ threshold: 0.25 });

  return (
    <section ref={ref} className={`bl js-reveal ${on ? "is-in" : ""}`} id="conteudo">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Exemplos reais<br />e novidades.</h2>
          <div className="sec-head__side">
            <p>Histórias de prefeituras que usam o Cidade Conectada, contadas por secretaria.</p>
            <Link className="sec-link" to={`${BASE}/blog`}>
              Ver blog
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </header>

        <div className="bl-grid">
          {NA_HOME.map((p, i) => (
            <Link key={p.slug} className="bl-card reveal" to={`${BASE}/blog/${p.slug}`} style={{ "--rd": `${80 + i * 90}ms` }}>
              <div className="bl-card__cover" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{ICONES[AREA[p.secretaria]]}</svg>
              </div>
              <span className="bl-card__meta">História · {p.secretaria}</span>
              <h3>{p.titulo}</h3>
              <span className="bl-card__more">
                Ler
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
