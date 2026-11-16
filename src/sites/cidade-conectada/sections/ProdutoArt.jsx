// Mini telas planas de cada produto (seção 4). Sem perspectiva: cada card mostra
// um pedaço de interface do próprio produto, só na escala de azul.

function SuperApp() {
  return (
    <div className="pa-phone">
      <div className="pa-phone__top"><small>Olá, Maria</small><b>Serviços</b></div>
      <div className="pa-phone__grid">
        {["Saúde", "IPTU", "Ônibus", "Luz", "Poda", "Escola"].map((s, i) => (
          <span key={s} className={i === 0 ? "is-on" : ""}><i />{s}</span>
        ))}
      </div>
    </div>
  );
}

function Interop() {
  const sis = ["Saúde", "Tributos", "Protocolo"];
  return (
    <div className="pa-interop">
      <div className="pa-interop__hub">Cidade Conectada</div>
      <svg className="pa-interop__lines" viewBox="0 0 240 70" preserveAspectRatio="none" aria-hidden="true">
        <path d="M120 0 V20 H40 V70 M120 20 V70 M120 20 H200 V70" />
      </svg>
      <div className="pa-interop__row">
        {sis.map((s) => <span key={s}>{s}</span>)}
      </div>
    </div>
  );
}

function WhatsApp() {
  return (
    <div className="pa-chat">
      <p className="pa-chat__in">Tem um buraco na minha rua.</p>
      <p className="pa-chat__out">Pedido registrado. Protocolo 18734.</p>
      <p className="pa-chat__in pa-chat__in--short">Obrigada!</p>
    </div>
  );
}

function Libras() {
  return (
    <div className="pa-video">
      <div className="pa-video__main">
        <span className="pa-video__person" />
        <em><i />Intérprete ao vivo</em>
      </div>
      <div className="pa-video__self"><span className="pa-video__person pa-video__person--sm" /></div>
    </div>
  );
}

function IA() {
  return (
    <div className="pa-ai">
      <p className="pa-ai__q">Como tiro a segunda via do IPTU?</p>
      <div className="pa-ai__a">
        <span className="pa-ai__badge">IA</span>
        <span className="pa-ai__typing"><i /><i /><i /></span>
      </div>
      <div className="pa-ai__chips"><span>Emitir boleto</span><span>Falar com atendente</span></div>
    </div>
  );
}

function ConectaOS() {
  const cols = [
    { t: "Aberta", n: 2 },
    { t: "Em campo", n: 2 },
    { t: "Concluída", n: 1 },
  ];
  return (
    <div className="pa-board">
      {cols.map((c, i) => (
        <div key={c.t} className="pa-board__col">
          <small>{c.t}</small>
          {Array.from({ length: c.n }).map((_, k) => <span key={k} className={i === 2 ? "is-done" : i === 1 && k === 0 ? "is-on" : ""} />)}
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const barras = [42, 58, 50, 66, 61, 74, 70, 86];
  return (
    <div className="pa-dash">
      <div className="pa-dash__kpis">
        <span><small>Demandas</small><b>15.674</b></span>
        <span><small>Concluídas</small><b>79%</b></span>
      </div>
      <div className="pa-dash__chart">
        {barras.map((h, i) => <i key={i} style={{ height: `${h}%` }} className={i === barras.length - 1 ? "is-on" : ""} />)}
      </div>
    </div>
  );
}

export const ARTES = { SuperApp, Interop, WhatsApp, Libras, IA, ConectaOS, Dashboard };
