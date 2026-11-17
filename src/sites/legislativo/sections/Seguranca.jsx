import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Seguranca.css";

// Seção 10 · Segurança e respaldo legal do Legislativo, no molde da seção de segurança do Cidade Conectada.
// Tema de confiança: sem ilustração, só ícones de traço e texto direto. Cada item é uma lei federal
// que a Câmara já precisa cumprir e o que o Legislativo Conectado faz por ela (quadro "Legislativo Conectado · Home").
// O que a Cubo ainda não confirmou fica com o marcador amarelo.

const ICONES = {
  lai: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />,
  usuario: <path d="M5 5h14v14H5zM9 10l2 2 4-4M9 15h6" />,
  acess: <path d="M12 5a1.5 1.5 0 1 0 0-.01M5 8.5l7 1.5 7-1.5M12 10v4m0 0-3 6m3-6 3 6" />,
  lgpd: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
};

const ITENS = [
  { id: "lai", titulo: "Acesso à Informação", lei: "Lei 12.527/2011", texto: "A informação da Câmara aberta ao cidadão, no app, no site e no WhatsApp." },
  { id: "usuario", titulo: "Direitos do usuário", lei: "Lei 13.460/2017", texto: "Cada pedido com protocolo e resposta registrada, do início ao fim." },
  { id: "acess", titulo: "Inclusão", lei: "Lei 13.146/2015", texto: "Atendimento em Libras por avatar e videochamada com tradução." },
  { id: "lgpd", titulo: "LGPD", lei: "Lei 13.709/2018", texto: "O cidadão autoriza o contato, pode sair quando quiser, e cada envio fica registrado." },
];

export default function Seguranca() {
  const [ref, on] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`sg js-reveal ${on ? "is-in" : ""}`} id="diferenciais">
      <div className="container">
        <header className="sec-head reveal">
          <h2>A Câmara cumprindo<br />o que a lei já pede.</h2>
          <div className="sec-head__side">
            <p>A IA responde com base em fonte oficial e, quando não tem certeza, passa para uma pessoa. E o Legislativo Conectado ajuda a Casa a atender quatro leis federais no dia a dia.</p>
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
              <p><small style={{ color: "var(--text-3)" }}>{it.lei}</small></p>
            </li>
          ))}
        </ul>

        <p className="sg-note reveal" style={{ "--rd": "440ms" }}>
          <span className="ph">Número de câmaras atendidas e de demandas registradas</span>{" "}
          <span className="ph">Selos e certificações só se comprovados</span>
        </p>
      </div>
    </section>
  );
}
