import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Blog.css";
import "../../cidade-conectada/sections/Faq.css";

// Seções 10 e 11 · Blog e Dúvidas do Zero Papel, nos moldes das mesmas seções do Cidade Conectada.
// O blog ainda não tem posts do Zero Papel: os cards mostram as pautas em produção, com o marcador amarelo.
// Respostas que dependem da Cubo (validade jurídica, prazo) ficam com o marcador amarelo.

const ICONES = {
  assinatura: <path d="M4 19c3-6 5-8 6-6s-2 6 1 5 4-7 6-6-1 5 3 4M4 21h16" />,
  arquivo: <path d="M4 7h16v13H4zM3 4h18v3H3zM10 11h4" />,
  tramite: <path d="M5 6h6v5H5zM13 13h6v5h-6zM8 11v4h5" />,
};

const PAUTAS = [
  { icone: "assinatura", tema: "Assinatura", titulo: "Assinatura eletrônica no dia a dia da prefeitura" },
  { icone: "arquivo", tema: "Arquivo", titulo: "O que fazer com o acervo em papel que já existe" },
  { icone: "tramite", tema: "Gestão", titulo: "Onde o tempo de um processo para, e como ver isso" },
];

export function BlogZeroPapel() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`bl js-reveal ${on ? "is-in" : ""}`} id="conteudo">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Conteúdos para<br />a sua gestão.</h2>
          <div className="sec-head__side">
            <p>Os primeiros conteúdos do Cidade Zero Papel estão em produção. Enquanto isso, veja exemplos reais de gestão digital no blog da Cubo.</p>
            <a className="sec-link" href="/blog">
              Ver blog da Cubo
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>

        <div className="bl-grid">
          {PAUTAS.map((p, i) => (
            <article key={p.titulo} className="bl-card reveal" style={{ "--rd": `${80 + i * 90}ms` }}>
              <div className="bl-card__cover" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{ICONES[p.icone]}</svg>
              </div>
              <span className="bl-card__meta">{p.tema} · <span className="ph">Em produção</span></span>
              <h3>{p.titulo}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PERGUNTAS = [
  { p: "O processo eletrônico tem validade jurídica?", r: <span className="ph">Base legal e tipo de assinatura</span> },
  { p: "Em quanto tempo a prefeitura sai do papel?", r: <span className="ph">Resposta com prazo real</span> },
  { p: "Já usamos outro sistema. Dá para migrar?", r: "O que vem do sistema atual, e como, é definido junto com a equipe da prefeitura." },
  { p: "E o arquivo em papel que já existe?", r: "Ele é digitalizado, com uma linha de corte clara entre o que era papel e o que já nasce digital." },
  { p: "Há treinamento?", r: "Sim. Para quem protocola, tramita e assina, no ritmo de cada setor." },
  { p: "Funciona junto com o Cidade Conectada?", r: "Sim. O que o cidadão pede no app já chega à prefeitura como processo eletrônico." },
];

export function FaqZeroPapel({ demo }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`fq js-reveal ${on ? "is-in" : ""}`} id="faq">
      <div className="container fq-body">
        <aside className="fq-side reveal">
          <h2>Dúvidas comuns<br />da gestão.</h2>
          <p>Não achou a sua? Fale com um especialista e receba a resposta para a realidade da sua prefeitura.</p>
          <a className="btn btn--ghost" href={demo}>Falar com especialista</a>
        </aside>

        <dl className="fq-list">
          {PERGUNTAS.map((q, i) => (
            <div key={q.p} className="fq-item reveal" style={{ "--rd": `${60 + i * 60}ms` }}>
              <dt>{q.p}</dt>
              <dd>{q.r}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
