import { useInView } from "../../../ds/motion.js";
import "./Faq.css";

// Seção 11 · Perguntas frequentes. O wireframe pede respostas sempre visíveis (sem acordeão):
// quem chega aqui está comparando, e esconder a resposta só atrapalha.
// Respostas que dependem da Cubo ficam com o marcador amarelo.

const PERGUNTAS = [
  { p: "Posso contratar apenas alguns produtos?", r: "Sim. Você pode contratar a solução completa ou escolher os produtos de que precisa." },
  { p: "O aplicativo pode ter o nome da minha prefeitura?", r: "Sim. Nome, cores e serviços são definidos de acordo com a sua cidade." },
  { p: "Como adquirir o Cidade Conectada?", r: <><span className="ph">Resumo</span> <a href="/cidade-conectada/como-contratar">Veja como contratar</a>.</> },
  { p: "Em quanto tempo o projeto é implementado?", r: <span className="ph">Resposta com prazo real</span> },
  { p: "Há treinamento e suporte?", r: <span className="ph">Resposta com formato e canais</span> },
  { p: "Como os dados são protegidos?", r: <span className="ph">Resposta real</span> },
];

export default function Faq() {
  const [ref, on] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className={`fq js-reveal ${on ? "is-in" : ""}`} id="faq">
      <div className="container fq-body">
        <aside className="fq-side reveal">
          <h2>Dúvidas comuns<br />da gestão.</h2>
          <p>Não achou a sua? Fale com um especialista e receba a resposta para a realidade da sua cidade.</p>
          <a className="btn btn--ghost" href="/cidade-conectada/demonstracao">Falar com especialista</a>
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
