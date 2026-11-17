import { useEffect, useState } from "react";
import Icone from "../../../ds/Icone.jsx";
import { useInView, prefersReducedMotion } from "../../../ds/motion.js";
import "./Numeros.css";

// Números na linha do mindcloud.co ("The numbers speak for themselves"): texto à esquerda e, à direita,
// um feed de atividades passando em faixas, apagado nas bordas, com um aviso em destaque no centro.
// Embaixo, os números reais do aplicativo de João Pessoa, com a fonte.
// As atividades do feed são exemplos de interface; os números de baixo são dados com fonte.

const ATIVIDADES = [
  ["app", "Pedido de poda registrado"],
  ["arquivo", "Processo 2026/00418 assinado"],
  ["camara", "Demanda do Centro respondida"],
  ["saude", "Cartão SUS emitido no app"],
  ["chat", "Protocolo 18733 pelo WhatsApp"],
  ["infra", "Poste consertado na Rua das Flores"],
  ["libras", "Atendimento em Libras concluído"],
  ["os", "Ordem de serviço encerrada"],
  ["ambiente", "Vistoria de árvore agendada"],
];
const TEMPOS = ["agora", "2s atrás", "5s atrás", "8s atrás", "12s atrás"];

// três faixas, cada uma começando num ponto da lista e andando para um lado
const FAIXAS = [0, 3, 6].map((ini) => [...ATIVIDADES.slice(ini), ...ATIVIDADES.slice(0, ini)]);

const NUMEROS = [
  ["+450 mil", "usuários do aplicativo", "abril de 2026"],
  ["+188 mil", "demandas registradas", "em 2025"],
  ["quase 80%", "das demandas concluídas", "em 2025"],
  ["+600", "serviços no celular", "do cidadão"],
];

function Chip({ icone, texto, tempo }) {
  return (
    <span className="nm-chip">
      <i><Icone nome={icone} size={14} /></i>
      {texto}
      <small>{tempo}</small>
    </span>
  );
}

export default function Numeros() {
  const [ref, on] = useInView({ threshold: 0.2 });
  const [k, setK] = useState(0);

  // o aviso do centro troca a cada 2,2 s, como se a atividade estivesse chegando ao vivo
  useEffect(() => {
    if (!on || prefersReducedMotion()) return;
    const id = setInterval(() => setK((x) => (x + 1) % ATIVIDADES.length), 2200);
    return () => clearInterval(id);
  }, [on]);
  const [icone, texto] = ATIVIDADES[k];

  return (
    <section ref={ref} className={`nm js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <div className="nm__top">
          <div className="nm__copy reveal">
            <span className="nm__selo">Em números</span>
            <h2>Os <span>números</span> falam<br />por <span>si.</span></h2>
            <p>Por trás de cada número, um pedido real que saiu do celular do cidadão e chegou à prefeitura, todos os dias.</p>
            <a className="nm__btn" href="#contato">Falar com a equipe</a>
          </div>

          <div className="nm__feed" aria-hidden="true">
            {FAIXAS.map((faixa, i) => (
              <div key={i} className={`nm__faixa nm__faixa--${i % 2 ? "dir" : "esq"}`}>
                <div className="nm__trilho">
                  {[...faixa, ...faixa].map(([ic, t], j) => <Chip key={j} icone={ic} texto={t} tempo={TEMPOS[j % TEMPOS.length]} />)}
                </div>
              </div>
            ))}
            <div className="nm__destaque" key={k}>
              <i><Icone nome={icone} size={16} /></i>
              <span>{texto}</span>
              <small>agora</small>
            </div>
          </div>
        </div>

        <div className="nm__nums">
          <span className="nm__fonte-selo">Aplicativo de serviços de João Pessoa</span>
          <dl>
            {NUMEROS.map(([v, r, q], i) => (
              <div key={r} className="reveal" style={{ "--rd": `${i * 80}ms` }}>
                <dt>{r}<small>{q}</small></dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="nm__fonte">Fonte: Prefeitura de João Pessoa (01/01/2026 e 04/04/2026).</p>
        </div>
      </div>
    </section>
  );
}
