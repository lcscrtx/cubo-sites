import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Seguranca.css";

// Seção 9 · Segurança e validade do Zero Papel, no molde da seção de segurança do Cidade Conectada.
// Tema de confiança: sem ilustração, só ícones de traço e texto direto.
// O que a Cubo ainda não confirmou fica com o marcador amarelo, como na home anterior.

const ICONES = {
  validade: <path d="M4 19c3-6 5-8 6-6s-2 6 1 5 4-7 6-6-1 5 3 4M4 21h16" />,
  lgpd: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
  infra: <path d="M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01" />,
  rastro: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" />,
};

const ITENS = [
  { id: "validade", titulo: "Validade jurídica", texto: <span className="ph">Base legal e tipo de assinatura</span> },
  { id: "lgpd", titulo: "LGPD", texto: <span className="ph">Práticas adotadas nos processos</span> },
  { id: "infra", titulo: "Infraestrutura", texto: <span className="ph">Nuvem e cópias de segurança do acervo</span> },
  { id: "rastro", titulo: "Rastreabilidade", texto: "Quem fez, quando e em que etapa está, em cada processo." },
];

export default function Seguranca() {
  const [ref, on] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`sg js-reveal ${on ? "is-in" : ""}`} id="seguranca">
      <div className="container">
        <header className="sec-head reveal">
          <h2>Documentos seguros<br />e rastreáveis.</h2>
          <div className="sec-head__side">
            <p>O que garante que o processo digital vale tanto quanto o papel, e que cada documento da prefeitura está protegido.</p>
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
