import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Blog.css";
import "../../cidade-conectada/sections/Faq.css";

// Seções 11 e 12 · Blog e Dúvidas do Legislativo, nos moldes das mesmas seções do Cidade Conectada.
// O blog ainda não tem posts do Legislativo: os cards mostram as pautas em produção, com o marcador amarelo.
// As respostas do FAQ vêm do roteiro de apresentação; a do período eleitoral aguarda revisão do jurídico.

const ICONES = {
  chat: <path d="M4 5h16v11H9l-5 4V5Zm4 5h8m-8 3h5" />,
  painel: <path d="M4 4h16v16H4zM8 15v-3m4 3V9m4 6v-5" />,
  mapa: <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Zm6-2v14m6-12v14" />,
};

const PAUTAS = [
  { icone: "chat", tema: "Atendimento", titulo: "Como a Câmara atende o cidadão pelo WhatsApp oficial" },
  { icone: "painel", tema: "Mandato", titulo: "O que o vereador acompanha no Painel do Vereador" },
  { icone: "mapa", tema: "Participação", titulo: "Pesquisa por bairro antes de propor um projeto" },
];

const BLOG_CUBO = "/blog";

export function BlogLegislativo() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`bl js-reveal ${on ? "is-in" : ""}`} id="conteudo">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Conteúdos para<br />a sua Câmara.</h2>
          <div className="sec-head__side">
            <p>Os primeiros conteúdos do Legislativo Conectado estão em produção. Enquanto isso, veja exemplos reais de atendimento digital no blog da Cubo.</p>
            <a className="sec-link" href={BLOG_CUBO}>
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
  { p: "Já temos site e TV Câmara. O que muda?", r: "O serviço entra no site atual e o player usa a transmissão existente. Não substitui, conecta." },
  { p: "Os vereadores já atendem pelo WhatsApp pessoal. Por que mudar?", r: "Eles podem continuar. O canal oficial acrescenta registro e protocolo." },
  { p: "E se a IA responder errado?", r: "Ela responde com base em fonte oficial e, quando não tem certeza, passa para uma pessoa." },
  { p: "Serve para uma Câmara pequena?", r: "Sim. A IA faz a triagem e o servidor cuida do que precisa de atenção humana." },
  { p: "Como funciona no período eleitoral?", r: <>O canal é institucional, e os envios seguem as regras do período e ficam registrados. <span className="ph">Revisão do jurídico</span></> },
  { p: "Como a LGPD é atendida?", r: "O cidadão autoriza o contato, pode sair quando quiser, e cada envio fica registrado." },
];

export function FaqLegislativo({ demo }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`fq js-reveal ${on ? "is-in" : ""}`} id="faq">
      <div className="container fq-body">
        <aside className="fq-side reveal">
          <h2>Dúvidas comuns<br />da Câmara.</h2>
          <p>Não achou a sua? Fale com um especialista e receba a resposta para a realidade da sua Casa.</p>
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
