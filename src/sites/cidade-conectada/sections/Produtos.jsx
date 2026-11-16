import { ARTES } from "./ProdutoArt.jsx";
import { useInView } from "../../../ds/motion.js";
import "./Produtos.css";

// Seção 4 · Seis produtos: nome oficial + explicação simples.
// Cada card mostra uma mini tela plana do próprio produto (ProdutoArt.jsx).

const PRODUTOS = [
  {
    nome: "SuperApp de Serviços",
    texto: "Um único aplicativo com os serviços da prefeitura, com a marca da sua cidade.",
    href: "/cidade-conectada/produtos/superapp",
    arte: "SuperApp",
  },
  {
    nome: "Interoperabilidade",
    texto: "Integra os sistemas que a prefeitura já usa, sem retrabalho entre secretarias.",
    href: "/cidade-conectada/produtos/interoperabilidade",
    arte: "Interop",
  },
  {
    nome: "Atendimento WhatsApp",
    texto: "A prefeitura no canal que o cidadão já usa todos os dias.",
    href: "/cidade-conectada/produtos/atendimento-whatsapp",
    arte: "WhatsApp",
  },
  {
    nome: "TeleAtendimento com Libras",
    texto: "Atendimento por vídeo com intérprete, acessível à pessoa surda.",
    href: "/cidade-conectada/produtos/teleatendimento-libras",
    arte: "Libras",
  },
  {
    nome: "IA para Atendimento",
    texto: "Respostas por texto e voz, com encaminhamento para a equipe quando precisa.",
    href: "/cidade-conectada/produtos/ia-atendimento",
    arte: "IA",
  },
  {
    nome: "Conecta OS",
    texto: "Controle das ordens de serviço, do pedido do cidadão à equipe em campo.",
    href: "/cidade-conectada/produtos/conecta-os",
    arte: "ConectaOS",
  },
];

function Card({ p, index, on }) {
  return (
    <a className="pd-card" href={p.href} style={{ "--d": `${index * 80}ms` }} data-in={on || undefined}>
      <div className="pd-card__art">
        {(() => { const Arte = ARTES[p.arte]; return <Arte />; })()}
      </div>
      <div className="pd-card__body">
        <h3>{p.nome}</h3>
        <p>{p.texto}</p>
        <span className="pd-card__more">
          Saber mais
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </a>
  );
}

export default function Produtos() {
  const [ref, on] = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className={`pd ${on ? "is-in" : ""}`} id="produtos">
      <div className="container">
        <header className="pd-head">
          <h2>Seis produtos, do pedido<br />do cidadão à execução.</h2>
          <div className="pd-head__side">
            <p>Contrate a solução completa ou só o que a sua cidade precisa agora. Todos conversam entre si.</p>
            <a className="pd-link" href="/cidade-conectada/produtos">
              Ver todos os produtos
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>

        <div className="pd-grid">
          {PRODUTOS.map((p, i) => <Card key={p.nome} p={p} index={i} on={on} />)}
        </div>
      </div>
    </section>
  );
}
