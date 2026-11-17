import { useEffect, useState } from "react";
import Icone from "../../../ds/Icone.jsx";
import { useInView, useTicker, prefersReducedMotion } from "../../../ds/motion.js";
import { PRODUTOS_CUBO } from "../../comum/marcas.jsx";
import "./Portfolio.css";

// Seção escura dos produtos, na linha do mindcloud.co ("Integrations are hard, let us help"):
// texto à esquerda, uma tela do produto à direita e abas embaixo. Cada aba troca a tela e o texto.
// As abas avançam sozinhas até a pessoa escolher uma. As telas são exemplos de interface.

/* Cidade Conectada: a conversa no WhatsApp da prefeitura, uma mensagem por vez */
const CONVERSA = [
  ["out", "Tem um poste apagado na minha rua."],
  ["in", "Pode enviar a localização?"],
  ["out", "Localização enviada", "mapa"],
  ["in", "Protocolo 18733 registrado e enviado à Secretaria de Infraestrutura."],
];
function TelaConversa({ on }) {
  const n = Math.min(CONVERSA.length, (useTicker(on, 1300) % (CONVERSA.length + 2)) + 1);
  return (
    <div className="pf-ui">
      <div className="pf-ui__head"><span className="pf-ui__ico"><Icone nome="chat" size={15} /></span><span><strong>Prefeitura</strong><small>WhatsApp oficial · Cidade Conectada</small></span></div>
      <div className="pf-chat">
        {CONVERSA.slice(0, n).map(([lado, t, ic], i) => (
          <p key={i} className={`pf-msg pf-msg--${lado}`}>{ic && <Icone nome={ic} size={13} />}{t}</p>
        ))}
      </div>
      <div className="pf-ui__input"><span>Escreva uma mensagem…</span><i><Icone nome="seta" size={14} /></i></div>
    </div>
  );
}

/* Cidade Zero Papel: o processo avançando etapa por etapa */
const ETAPAS = [["Protocolo", "Atendimento"], ["Tramitação", "Secretaria de Obras"], ["Assinatura", "Secretário"], ["Publicidade", "Portal da transparência"], ["Arquivo", "Arquivo digital"]];
function TelaProcesso({ on }) {
  const passo = useTicker(on, 1100) % (ETAPAS.length + 2);
  return (
    <div className="pf-ui">
      <div className="pf-ui__head"><span className="pf-ui__ico"><Icone nome="arquivo" size={15} /></span><span><strong>Processo 2026/00418</strong><small>Licença para obra · Cidade Zero Papel</small></span></div>
      <ol className="pf-steps">
        {ETAPAS.map(([t, quem], i) => (
          <li key={t} className={i < passo ? "is-done" : i === passo ? "is-now" : ""}>
            <i>{i < passo && <Icone nome="check" size={11} />}</i><span>{t}</span><small>{quem}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Legislativo Conectado: o painel do vereador com resumo da semana, demandas por bairro
   e a última demanda que chegou, do bairro em destaque */
const BAIRROS = [
  ["Centro", 82, 34, "Iluminação", "Poste apagado na Rua Duque de Caxias"],
  ["Bairro Novo", 64, 21, "Calçadas", "Calçada quebrada em frente à escola"],
  ["Vila Nova", 48, 15, "Praças", "Praça da Vila Nova sem manutenção"],
  ["Jardim", 30, 9, "Coleta de lixo", "Coleta atrasada na Rua das Acácias"],
];
const RESUMO = [["79", "demandas"], ["61%", "respondidas"], ["2 dias", "tempo médio"]];

function TelaPainel({ on }) {
  const ativo = useTicker(on, 1800) % BAIRROS.length;
  const [bairro, , , , ultima] = BAIRROS[ativo];
  return (
    <div className="pf-ui">
      <div className="pf-ui__head">
        <span className="pf-ui__ico"><Icone nome="painel" size={15} /></span>
        <span><strong>Painel do Vereador</strong><small>Legislativo Conectado</small></span>
        <em className="pf-ui__chip">Esta semana</em>
      </div>
      <dl className="pf-kpis">
        {RESUMO.map(([v, r]) => <div key={r}><dd>{v}</dd><dt>{r}</dt></div>)}
      </dl>
      <ul className="pf-bars">
        {BAIRROS.map(([b, v, n], i) => (
          <li key={b} className={i === ativo ? "is-on" : ""}>
            <span>{b}</span><i><b style={{ width: `${v}%` }} /></i><em>{n}</em>
          </li>
        ))}
      </ul>
      <div className="pf-ultima" key={ativo}>
        <span className="pf-ultima__dot" />
        <span><strong>{ultima}</strong><small>Nova demanda · {bairro} · via WhatsApp · agora</small></span>
        <b>Responder</b>
      </div>
    </div>
  );
}

const ABAS = [
  { tela: TelaConversa, titulo: "Cidade Conectada", texto: "O cidadão pede pelo app, pelo WhatsApp ou em Libras. O pedido ganha protocolo, chega à secretaria certa e a resposta volta para ele." },
  { tela: TelaProcesso, titulo: "Cidade Zero Papel", texto: "Protocolo, tramitação e assinatura eletrônicos. Cada etapa fica registrada, do primeiro despacho ao arquivo, sem papel." },
  { tela: TelaPainel, titulo: "Legislativo Conectado", texto: "As demandas do cidadão chegam à Câmara organizadas por bairro e tema, e cada vereador responde pelo próprio painel." },
];

export default function Portfolio() {
  const [ref, on] = useInView({ threshold: 0.25 });
  const [aba, setAba] = useState(0);
  const [tocou, setTocou] = useState(false);

  useEffect(() => {
    if (!on || tocou || prefersReducedMotion()) return;
    const id = setInterval(() => setAba((a) => (a + 1) % ABAS.length), 7000);
    return () => clearInterval(id);
  }, [on, tocou]);

  const A = ABAS[aba];
  const p = PRODUTOS_CUBO[aba];

  return (
    <section ref={ref} className="pf" id="produtos">
      <div className="container pf__inner">
        <div className="pf__top">
          <div className="pf__copy">
            <span className="pf__label">Nossos produtos</span>
            <h2>Três produtos,<br /><span>um jeito Cubo.</span></h2>
            <p>Cada produto tem o seu site e a sua equipe. Por trás de todos, a mesma tecnologia própria e o mesmo acompanhamento.</p>

            {/* abas na horizontal, ao lado da tela que elas trocam; embaixo, o texto e o link do produto aberto */}
            <div className="pf__tabs" role="tablist" aria-label="Produtos">
              {ABAS.map((x, i) => (
                <button key={x.titulo} type="button" role="tab" aria-selected={i === aba} className={i === aba ? "is-on" : ""} onClick={() => { setAba(i); setTocou(true); }}>
                  {x.titulo}
                  {i === aba && !tocou && on && <span className="pf__bar" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <div className="pf__item" key={aba}>
              <p>{A.texto}</p>
              <a className="pf__btn" href={p.href}>Conhecer o {p.nome}</a>
            </div>
          </div>
          <div className="pf__tela" aria-hidden="true">
            <div key={aba} className="pf__tela-in"><A.tela on={on} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
