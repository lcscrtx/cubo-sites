import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import { CC_HOME, ZP_HOME, LC_HOME, LogoCidadeConectada, LogoZeroPapel, LogoLegislativo } from "../../comum/marcas.jsx";
import Prismas from "./Prismas.jsx";
import "./HeroCubo.css";

// Hero da Cubo na linguagem do getsymmetry.com: título no centro, cilindros nos azuis da marca
// e, na frente, um único cartão de interface que mostra o trabalho de um produto por vez.
// Os três avisos são exemplos de interface (nomes e números ilustrativos), um por produto.

const AVISOS = [
  {
    id: "cc",
    Logo: () => <LogoCidadeConectada altura={22} />,
    canal: "WhatsApp da Prefeitura",
    selo: "Novo pedido",
    titulo: "Poste apagado na Rua das Flores",
    texto: "Maria enviou foto e localização pelo WhatsApp. O pedido ganhou protocolo e já está na Secretaria de Infraestrutura.",
    tags: [["infra", "Infraestrutura"], ["check", "Protocolo 18733"]],
    acoes: ["Acompanhar", "Responder"],
    href: CC_HOME,
    produto: "Cidade Conectada",
  },
  {
    id: "zp",
    Logo: () => <LogoZeroPapel />,
    canal: "Processo eletrônico",
    selo: "Sua vez",
    titulo: "Processo 2026/00418 aguarda assinatura",
    texto: "Licença para obra. Já passou por protocolo e tramitação; falta a assinatura do secretário para seguir.",
    tags: [["predio", "Secretaria de Obras"], ["arquivo", "Sem papel"]],
    acoes: ["Assinar", "Ver histórico"],
    href: ZP_HOME,
    produto: "Cidade Zero Papel",
  },
  {
    id: "lc",
    Logo: () => <LogoLegislativo altura={22} />,
    canal: "Painel do Vereador",
    selo: "Esta semana",
    titulo: "12 novas demandas do bairro Centro",
    texto: "Iluminação lidera os pedidos. Responda pelo painel e o cidadão recebe a resposta no WhatsApp da Câmara.",
    tags: [["mapa", "Centro"], ["infra", "Iluminação"]],
    acoes: ["Responder", "Ver no mapa"],
    href: LC_HOME,
    produto: "Legislativo Conectado",
  },
];
const PASSO_MS = 5000;

export default function HeroCubo() {
  const [i, setI] = useState(0);
  const [parado, setParado] = useState(false);

  useEffect(() => {
    if (parado || prefersReducedMotion()) return;
    const id = setInterval(() => setI((x) => (x + 1) % AVISOS.length), PASSO_MS);
    return () => clearInterval(id);
  }, [parado]);

  const a = AVISOS[i];

  return (
    <section className="hsy">
      <div className="container hsy__copy">
        <h1>Entre a prefeitura e o cidadão, a gente.</h1>
        <p>
          Desenvolvemos soluções digitais que descomplicam a gestão e melhoram a vida dos cidadãos,
          unindo tecnologia e eficiência para construir cidades mais inteligentes e humanas.
        </p>
        <div className="hsy__actions">
          <a className="btn btn--primary" href="#produtos">Conhecer produtos</a>
          <Link className="btn btn--ghost" to="/sobre">Sobre a Cubo</Link>
        </div>
      </div>

      <div className="hsy__stage">
        <Prismas />
        <div className="hsy__front" onMouseEnter={() => setParado(true)} onMouseLeave={() => setParado(false)}>
          <article key={a.id} className="hsy__card" aria-label={`Exemplo de aviso do ${a.produto}`}>
            <header>
              <span className="hsy__logo"><a.Logo /></span>
              <small>{a.canal} · agora</small>
              <em>{a.selo}</em>
            </header>
            <h2>{a.titulo}</h2>
            <p>{a.texto}</p>
            <ul className="hsy__tags">
              {a.tags.map(([ic, t]) => <li key={t}><Icone nome={ic} size={13} />{t}</li>)}
            </ul>
            {/* um cursor entra, clica na ação principal e o próximo aviso chega (só CSS, reinicia a cada aviso) */}
            <svg className="hsy__cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19 5 3Z" /></svg>
            <footer>
              <span className="hsy__act hsy__act--main" aria-hidden="true"><Icone nome="check" size={14} />{a.acoes[0]}</span>
              <span className="hsy__act" aria-hidden="true">{a.acoes[1]}</span>
              <a className="hsy__go" href={a.href}>Ver no {a.produto} <Icone nome="seta" size={14} /></a>
            </footer>
          </article>
          <div className="hsy__dots" role="tablist" aria-label="Produtos">
            {AVISOS.map((x, k) => (
              <button key={x.id} type="button" role="tab" aria-selected={k === i} aria-label={x.produto} className={k === i ? "is-on" : ""} onClick={() => { setI(k); setParado(true); }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
