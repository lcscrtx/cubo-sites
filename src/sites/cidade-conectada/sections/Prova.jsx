import { useInView, useCountUp, useTicker } from "../../../ds/motion.js";
import "./Prova.css";

// Seção 2 · Prova: caso João Pessoa. Linguagem visual inspirada em getsymmetry.com:
// painéis em tons pastel, grade isométrica e uma mini tela inclinada em cada um.
// Tudo anima ao entrar na tela; com "reduzir movimento" ligado, aparece pronto.

/* 1 · Fila viva de demandas: um pedido novo chega no topo e os anteriores avançam de status */
const POOL = ["Troca de lâmpada", "Poda de árvore", "Tapa-buraco", "Coleta de entulho", "Cartão SUS", "Limpeza de terreno", "Remédio em Casa", "Vacinação domiciliar"];
const STATUS = [
  { s: "Recebida", c: "new" },
  { s: "Em execução", c: "run" },
  { s: "Concluída", c: "ok" },
];

function Demandas({ on }) {
  const tick = useTicker(on, 2400);
  // slots 0..2 visíveis (0 = mais novo); slot 3 é o que está saindo
  const slots = [0, 1, 2, 3].map((slot) => {
    const abs = tick + 3 - slot;
    return { abs, slot, titulo: POOL[abs % POOL.length], status: STATUS[Math.min(slot, 2)] };
  });
  return (
    <div className="pv-iso pv-iso--queue">
      {slots.map(({ abs, slot, titulo, status }) => (
        <div key={abs} className={`pv-ui pv-row ${slot === 3 ? "is-out" : ""}`} style={{ "--slot": slot }}>
          <span className="pv-row__icon" />
          <strong>{titulo}</strong>
          <span className={`pv-status pv-status--${status.c}`}>{status.s}</span>
        </div>
      ))}
    </div>
  );
}

/* 2 · Barra que enche até 79% */
function Conclusao({ on }) {
  const pct = Math.round(useCountUp(79, on, 1800));
  return (
    <div className="pv-iso">
      <div className="pv-ui pv-progress">
        <span className="pv-progress__label">Demandas de 2025</span>
        <strong>{pct}% concluídas</strong>
        <div className="pv-progress__bar"><span style={{ width: `${pct}%` }} /></div>
        <div className="pv-progress__legend">
          <span><i className="ok" />Concluídas</span>
          <span><i className="run" />Em andamento</span>
        </div>
      </div>
    </div>
  );
}

/* 3 · Serviços aparecem um a um; depois um deles é "tocado" de cada vez */
const SERVICOS = ["Saúde", "IPTU", "Ônibus", "Iluminação", "Poda", "Ouvidoria", "Educação", "Alvará"];

function Servicos({ on }) {
  const tick = useTicker(on, 1300);
  const mais = Math.round(useCountUp(592, on, 2000));
  const ativo = on ? tick % SERVICOS.length : -1;
  return (
    <div className="pv-iso">
      <div className="pv-ui pv-chips">
        {SERVICOS.map((x, i) => (
          <span key={x} className={i === ativo ? "is-active" : ""} style={{ "--d": `${i * 70}ms` }}>{x}</span>
        ))}
        <span className="pv-chips__more" style={{ "--d": `${SERVICOS.length * 70}ms` }}>+{mais}</span>
      </div>
    </div>
  );
}

/* 4 · Acessos do dia subindo */
const CORES = ["var(--blue-800)", "var(--blue)", "var(--blue-400)", "var(--blue-300)", "var(--blue-200)"];

function Usuarios({ on }) {
  const tick = useTicker(on, 1500);
  const base = Math.round(useCountUp(1284, on, 1800));
  const acessos = base + [0, 3, 5, 6, 9, 11, 14, 15, 18, 21][tick % 10] + Math.floor(tick / 10) * 21;
  return (
    <div className="pv-iso">
      <div className="pv-ui pv-users">
        <div className="pv-users__avatars">
          {CORES.map((c, i) => <i key={c} style={{ background: c, "--d": `${i * 90}ms` }} />)}
        </div>
        <div>
          <strong>João Pessoa na Palma da Mão</strong>
          <span><b className="pv-live" />Acessos hoje · {acessos.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    </div>
  );
}

const PAINEIS = [
  { valor: 188, prefixo: "+", sufixo: " mil", texto: "demandas registradas em 2025, pelo app e pelo WhatsApp.", tom: "azul", Ui: Demandas },
  { valor: 80, prefixo: "Quase ", sufixo: "%", texto: "das demandas de 2025 já foram concluídas.", tom: "verde", Ui: Conclusao },
  { valor: 600, prefixo: "+", sufixo: "", texto: "serviços da prefeitura disponíveis em um só lugar.", tom: "amarelo", Ui: Servicos },
  { valor: 450, prefixo: "+", sufixo: " mil", texto: "pessoas usando o aplicativo em abril de 2026.", tom: "celeste", Ui: Usuarios },
];

function Painel({ valor, prefixo, sufixo, texto, tom, Ui, index }) {
  const [ref, on] = useInView({ threshold: 0.35 });
  const n = Math.round(useCountUp(valor, on, 1600));
  return (
    <article ref={ref} className={`pv-panel pv-panel--${tom} ${on ? "is-in" : ""}`} style={{ "--delay": `${(index % 2) * 120}ms` }}>
      <div className="pv-panel__copy">
        <h3>
          <span className="sr-only">{prefixo}{valor}{sufixo}</span>
          <span aria-hidden="true">{prefixo}{n}{sufixo}</span>
        </h3>
        <p>{texto}</p>
      </div>
      <div className="pv-panel__art" aria-hidden="true">
        <div className="pv-grid-lines" />
        <Ui on={on} />
      </div>
    </article>
  );
}

const CIDADES = ["João Pessoa", "Campina Grande", "Cabedelo", "Feira de Santana"];

export default function Prova() {
  const [headRef, headOn] = useInView({ threshold: 0.4 });
  const [footRef, footOn] = useInView({ threshold: 0.4 });

  return (
    <section className="pv" id="clientes">
      <div className="container">
        <header ref={headRef} className={`pv-head pv-reveal ${headOn ? "is-in" : ""}`}>
          <h2>Na prática:<br />João Pessoa na Palma da Mão.</h2>
          <div className="pv-head__side">
            <p>
              Desenvolvido pela Sead em parceria com a Cubo Tecnologia, o app concentra os serviços da Prefeitura e acompanha cada pedido até a conclusão.
            </p>
            <a className="pv-link" href="/cidade-conectada/clientes/joao-pessoa">
              Ver história completa
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </header>

        <div className="pv-grid">
          {PAINEIS.map((p, i) => <Painel key={p.tom} {...p} index={i} />)}
        </div>

        <div ref={footRef} className={`pv-reveal ${footOn ? "is-in" : ""}`}>
          <div className="pv-foot">
            <p className="pv-economia">
              <i aria-hidden="true" />
              Mais de <strong>R$ 40 milhões</strong> economizados, somando o aplicativo e o processo eletrônico usado pela Prefeitura.
            </p>
            <p className="pv-fonte">
              Demandas, conclusão e usuários: Prefeitura de João Pessoa (janeiro e abril de 2026). Serviços: Cubo Tecnologia.
              Economia: <span className="ph">definir fonte da soma</span>.
            </p>
          </div>

          <div className="pv-cidades">
            <span>Cidades que já usam o Cidade Conectada</span>
            <ul>
              {CIDADES.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
