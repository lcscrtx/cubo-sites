import Icone from "../../ds/Icone.jsx";
import { ARTES } from "../cidade-conectada/sections/ProdutoArt.jsx";
import { PRODUTOS_CUBO, LogoZeroPapel } from "./marcas.jsx";
import { useCiclo } from "./Blocos.jsx";
import "../cidade-conectada/sections/Produtos.css";

// Cenas dos heroes e mini telas dos produtos novos. Cartões brancos sobre o azul,
// cada um com um pedaço de interface e um movimento simples ligado ao produto.
// Nomes e números dentro das telas são de exemplo de interface, não dados de cliente.

/* ===== Cidade Zero Papel ===== */

const ETAPAS_ZP = [
  { t: "Protocolo", quem: "Atendimento", icone: "arquivo" },
  { t: "Tramitação", quem: "Secretaria de Obras", icone: "troca" },
  { t: "Assinatura", quem: "Secretário", icone: "assinatura" },
  { t: "Publicidade", quem: "Portal da transparência", icone: "megafone" },
  { t: "Arquivo", quem: "Arquivo digital", icone: "cadeado" },
];

const ETAPAS_CAMARA = [
  { t: "Protocolo", quem: "Protocolo legislativo" },
  { t: "Comissões", quem: "Comissão de Justiça" },
  { t: "Assinatura", quem: "Presidência" },
  { t: "Publicidade", quem: "Diário oficial" },
  { t: "Arquivo", quem: "Arquivo digital" },
];

/** Um processo avançando etapa por etapa, com quem fez cada uma. camara = versão do Legislativo. */
export function ProcessoVivo({ compacto = false, camara = false }) {
  const etapas = camara ? ETAPAS_CAMARA : ETAPAS_ZP;
  const passo = useCiclo(etapas.length + 1, 1300);
  return (
    <div className={`sc-card sc-proc ${compacto ? "sc-proc--sm" : ""}`}>
      <div className="sc-card__head">
        <span className="sc-card__ico"><Icone nome="arquivo" size={16} /></span>
        <div><strong>{camara ? "Proposição 032/2026" : "Processo 2026/00418"}</strong><small>{camara ? "Projeto de lei" : "Licença para obra"}</small></div>
        <em className={passo >= etapas.length ? "is-ok" : ""}>{passo >= etapas.length ? "Concluído" : "Em andamento"}</em>
      </div>
      <ol>
        {etapas.map((e, i) => (
          <li key={e.t} className={i < passo ? "is-done" : i === passo ? "is-now" : ""}>
            <span className="sc-proc__dot">{i < passo && <Icone nome="check" size={11} />}</span>
            <span className="sc-proc__t">{e.t}</span>
            {!compacto && <small>{e.quem}</small>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Pilha de papel virando processo digital (os documentos somem, o contador sobe). */
export function SemPapel() {
  const i = useCiclo(4, 1500);
  return (
    <div className="sc-card sc-paper">
      <div className="sc-card__head"><span className="sc-card__ico"><Icone nome="nuvem" size={16} /></span><div><strong>Arquivo digital</strong><small>Tudo rastreável</small></div></div>
      <ul>
        {["Ofício 112", "Requerimento 87", "Parecer 45", "Contrato 19"].map((d, k) => (
          <li key={d} className={k <= i ? "is-on" : ""}><Icone nome="arquivo" size={14} />{d}<em>{k <= i ? "Digital" : "Papel"}</em></li>
        ))}
      </ul>
    </div>
  );
}

/* ===== Legislativo Conectado ===== */

/** WhatsApp oficial da Câmara: pedido do cidadão vira protocolo e chega ao vereador. */
export function ChatCamara() {
  const passo = useCiclo(4, 1600);
  return (
    <div className="sc-card sc-chat">
      <div className="sc-card__head">
        <span className="sc-card__ico sc-card__ico--wa"><Icone nome="chat" size={16} /></span>
        <div><strong>Câmara Municipal</strong><small>WhatsApp oficial</small></div>
      </div>
      <div className="sc-chat__body">
        <p className="sc-msg sc-msg--out">A praça do meu bairro está sem iluminação.</p>
        {passo >= 1 && <p className="sc-msg sc-msg--in">Pode enviar uma foto e a localização?</p>}
        {passo >= 2 && <p className="sc-msg sc-msg--out sc-msg--file"><Icone nome="mapa" size={13} /> Localização enviada</p>}
        {passo >= 3 && <p className="sc-msg sc-msg--in">Protocolo 2041 registrado e enviado ao vereador da região.</p>}
      </div>
    </div>
  );
}

const BAIRROS = [
  { b: "Centro", v: 82 },
  { b: "Bairro Novo", v: 64 },
  { b: "Vila Nova", v: 48 },
  { b: "Jardim", v: 30 },
];

/** Painel do Vereador: demandas por bairro, com o mais pedido em destaque. */
export function PainelVereador({ compacto = false }) {
  const ativo = useCiclo(BAIRROS.length, 1400);
  return (
    <div className={`sc-card sc-painel ${compacto ? "sc-painel--sm" : ""}`}>
      <div className="sc-card__head">
        <span className="sc-card__ico"><Icone nome="painel" size={16} /></span>
        <div><strong>Painel do Vereador</strong><small>Demandas por bairro</small></div>
      </div>
      <ul>
        {BAIRROS.map((x, i) => (
          <li key={x.b} className={i === ativo ? "is-on" : ""}>
            <span>{x.b}</span>
            <i><b style={{ width: `${x.v}%` }} /></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** TV Câmara: sessão ao vivo com a pauta do dia. */
export function TvCamara() {
  const ativo = useCiclo(3, 2000);
  return (
    <div className="sc-card sc-tv">
      <div className="sc-tv__screen">
        <span className="sc-tv__live"><i />Ao vivo</span>
        <div className="sc-tv__plen" aria-hidden="true">{Array.from({ length: 9 }).map((_, k) => <span key={k} />)}</div>
      </div>
      <div className="sc-tv__pauta">
        <small>Pauta da sessão</small>
        {["Iluminação da praça central", "Projeto de lei 32/2026", "Indicações dos vereadores"].map((p, i) => (
          <span key={p} className={i === ativo ? "is-on" : ""}>{p}</span>
        ))}
      </div>
    </div>
  );
}

/** Cena do hero do Legislativo: cidadão, vereador e sessão, lado a lado. */
export function CenaLegislativo() {
  return (
    <div className="sc-trio">
      <figure><ChatCamara /><figcaption>Cidadão</figcaption></figure>
      <figure className="sc-trio__mid"><PainelVereador /><figcaption>Vereador</figcaption></figure>
      <figure><TvCamara /><figcaption>Câmara</figcaption></figure>
    </div>
  );
}

/** Cena do hero do Zero Papel: o processo no centro, o arquivo digital ao lado. */
export function CenaZeroPapel() {
  return (
    <div className="sc-duo">
      <figure className="sc-duo__main"><ProcessoVivo /><figcaption>Do protocolo ao arquivo</figcaption></figure>
      <figure><SemPapel /><figcaption>Menos papel</figcaption></figure>
    </div>
  );
}

/* ===== Cubo ===== */

/** Cena do hero da Cubo: os três produtos, um aceso por vez. */
export function CenaCubo() {
  const ativo = useCiclo(3, 2400);
  const telas = {
    "cidade-conectada": <ARTES.SuperApp />,
    "zero-papel": <ProcessoVivo compacto />,
    legislativo: <PainelVereador compacto />,
  };
  return (
    <div className="sc-cubo">
      {PRODUTOS_CUBO.map((p, i) => (
        <a key={p.id} href={p.href} className={`sc-cubo__item ${i === ativo ? "is-on" : ""}`}>
          <div className={`sc-cubo__tela ${p.id === "cidade-conectada" ? "sc-cubo__tela--panel" : ""}`}>{telas[p.id]}</div>
          <span className="sc-cubo__nome"><Icone nome={p.icone} size={15} />{p.nome}</span>
          <small>{p.objetivo}</small>
        </a>
      ))}
    </div>
  );
}

/** Sobre: a Cubo no centro e os três produtos ligados a ela. */
export function Ecossistema() {
  const ativo = useCiclo(3, 1800);
  return (
    <div className="sc-card sc-eco">
      <div className="sc-eco__hub"><img src="/brand/cubo-logo.svg" alt="" height="22" /></div>
      <svg className="sc-eco__lines" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M150 0 V24 H50 V60 M150 24 V60 M150 24 H250 V60" /></svg>
      <div className="sc-eco__row">
        {PRODUTOS_CUBO.map((p, i) => (
          <span key={p.id} className={i === ativo ? "is-on" : ""}><Icone nome={p.icone} size={18} />{p.nome}</span>
        ))}
      </div>
      <p className="sc-eco__foot"><Icone nome="mapa" size={14} /> Sede em João Pessoa (PB)</p>
    </div>
  );
}

export { LogoZeroPapel };
