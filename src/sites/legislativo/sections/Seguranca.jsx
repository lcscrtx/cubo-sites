import { useInView } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Seguranca.css";
import "./Seguranca.css";

// Seção 10 · Diferenciais e respaldo legal do Legislativo, no molde da seção de segurança do Cidade Conectada.
// Tema de confiança: sem ilustração, só ícones de traço e texto direto. Cada item é uma lei federal
// que a Câmara já precisa cumprir e o que o Legislativo Conectado faz por ela (quadro "Legislativo Conectado · Home").
// O que a Cubo ainda não confirmou fica com o marcador amarelo.

const ICONES = {
  lai: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />,
  usuario: <path d="M5 5h14v14H5zM9 10l2 2 4-4M9 15h6" />,
  acess: <path d="M12 5a1.5 1.5 0 1 0 0-.01M5 8.5l7 1.5 7-1.5M12 10v4m0 0-3 6m3-6 3 6" />,
  lgpd: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
  fonte: <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3ZM9 18h6m-5 3h4" />,
  historico: <path d="M4 7h16M4 12h16M4 17h10M18 15v4m-2-2h4" />,
  canal: <path d="M4 5h16v11H9l-5 4V5Zm5 5 2 2 4-4" />,
};

// o que separa o Legislativo Conectado de um canal de mensagens comum
const DIFERENCIAIS = [
  { id: "fonte", titulo: "IA que mostra a fonte", texto: "Cada resposta indica o documento oficial. Quando não tem certeza, passa para uma pessoa." },
  { id: "historico", titulo: "Um histórico só", texto: "App, site e WhatsApp alimentam o mesmo protocolo e o mesmo painel." },
  { id: "canal", titulo: "Canal institucional", texto: "O WhatsApp oficial da Casa, com registro de cada envio, que soma ao atendimento dos gabinetes." },
];

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
          <h2>Tecnologia que aproxima<br />e dá segurança.</h2>
          <div className="sec-head__side">
            <p>O que separa o Legislativo Conectado de um canal de mensagens comum, e as quatro leis federais que ele ajuda a Câmara a cumprir no dia a dia.</p>
          </div>
        </header>

        <ul className="sg-list lsg-dif">
          {DIFERENCIAIS.map((it, i) => (
            <li key={it.id} className="reveal" style={{ "--rd": `${80 + i * 90}ms` }}>
              <span className="sg-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONES[it.id]}</svg>
              </span>
              <h3>{it.titulo}</h3>
              <p>{it.texto}</p>
            </li>
          ))}
        </ul>

        <p className="lsg-rotulo reveal" style={{ "--rd": "300ms" }}>Respaldo legal</p>
        <ul className="sg-list lsg-leis">
          {ITENS.map((it, i) => (
            <li key={it.id} className="reveal" style={{ "--rd": `${360 + i * 90}ms` }}>
              <span className="sg-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONES[it.id]}</svg>
              </span>
              <h3>{it.titulo}</h3>
              <p>{it.texto}</p>
              <p><small style={{ color: "var(--text-3)" }}>{it.lei}</small></p>
            </li>
          ))}
        </ul>

        <p className="sg-note reveal" style={{ "--rd": "720ms" }}>
          <span className="ph">Número de câmaras atendidas e de demandas registradas</span>{" "}
          <span className="ph">Selos e certificações só se comprovados</span>
        </p>
      </div>
    </section>
  );
}
