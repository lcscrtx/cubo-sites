import { useInView } from "../../../ds/motion.js";
import "./Seguranca.css";

// Seção 9 · Segurança e conformidade.
// Tema de confiança: sem ilustração, só ícones de traço e texto direto.
// O que a Cubo ainda não confirmou fica com o marcador amarelo, como no wireframe.

const ICONES = {
  lgpd: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
  infra: <path d="M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01" />,
  integra: <path d="M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5" />,
  acess: <path d="M12 5a1.5 1.5 0 1 0 0-.01M5 8.5l7 1.5 7-1.5M12 10v4m0 0-3 6m3-6 3 6" />,
};

const ITENS = [
  { id: "lgpd", titulo: "LGPD", texto: <span className="ph">Práticas adotadas</span> },
  { id: "infra", titulo: "Infraestrutura", texto: <span className="ph">Nuvem, backup e disponibilidade</span> },
  { id: "integra", titulo: "Integrações", texto: <span className="ph">Sistemas e APIs</span> },
  { id: "acess", titulo: "Acessibilidade", texto: "Atendimento com Libras, alinhado à Lei Brasileira de Inclusão." },
];

export default function Seguranca() {
  const [ref, on] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`sg js-reveal ${on ? "is-in" : ""}`} id="seguranca">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Tecnologia confiável<br />para dados públicos.</h2>
          <div className="sec-head__side">
            <p>Dados de cidadãos e da gestão pedem cuidado. Veja como o Cidade Conectada protege cada informação.</p>
            <a className="sec-link" href="#seguranca-lgpd">
              Ver segurança e LGPD
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>

        <ul className="sg-list">
          {ITENS.map((it, i) => (
            <li key={it.id} className="reveal" style={{ "--rd": `${80 + i * 90}ms` }}>
              <span className="sg-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONES[it.id]}</svg>
              </span>
              <h3>{it.titulo}</h3>
              <p>{it.texto}</p>
            </li>
          ))}
        </ul>

        <p className="sg-note reveal" style={{ "--rd": "440ms" }}><span className="ph">Selos e certificações só se comprovados</span></p>
      </div>
    </section>
  );
}
