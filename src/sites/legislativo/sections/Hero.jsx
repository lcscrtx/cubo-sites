import { useEffect, useState } from "react";
import Grainient from "../../../ds/bg/Grainient.jsx";
import Icone from "../../../ds/Icone.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import "../../cidade-conectada/sections/Hero.css";
import "./Hero.css";

// Hero do Legislativo Conectado, no mesmo molde do hero do Cidade Conectada (degradê da marca,
// texto centralizado, cena embaixo), mas com uma cena própria da Câmara, como pede o wireframe
// ("app, WhatsApp, TV Câmara e Painel do Vereador"):
// no centro, a TV Câmara ao vivo com uma votação acontecendo, cadeira por cadeira;
// à esquerda, a demanda do cidadão no WhatsApp virando indicação; à direita, o Painel do Vereador.
// Nomes, números e votos são exemplos de interface.

// 21 cadeiras do plenário: s = sim, n = não, a = abstenção (na ordem em que votam)
const VOTOS = "sssnsssasssnsssssnsss".split("");
const PASSO_MS = 260;
const PAUSA = 10; // passos parados com o resultado na tela antes de recomeçar

const BAIRROS = [["Centro", 82], ["Bairro Novo", 64], ["Vila Nova", 48]];

function CenaCamara() {
  const reduzido = prefersReducedMotion();
  const [t, setT] = useState(reduzido ? VOTOS.length : 0);

  useEffect(() => {
    if (reduzido) return;
    const id = setInterval(() => setT((x) => (x + 1) % (VOTOS.length + PAUSA)), PASSO_MS);
    return () => clearInterval(id);
  }, [reduzido]);

  const votados = Math.min(t, VOTOS.length);
  const conta = (v) => VOTOS.slice(0, votados).filter((x) => x === v).length;
  const fim = votados === VOTOS.length;

  return (
    <div className="lch" aria-hidden="true">
      {/* cidadão: a demanda vira indicação */}
      <div className="lch-card lch-chat">
        <div className="lch-card__top"><span className="lch-wa"><Icone nome="chat" size={13} /></span>WhatsApp da Câmara</div>
        <p className="lch-msg lch-msg--out">A praça do meu bairro está sem iluminação.</p>
        <p className="lch-msg lch-msg--in">Sua demanda virou a indicação 118/2026, do vereador do Centro.</p>
      </div>

      {/* TV Câmara: votação ao vivo */}
      <div className="lch-tv">
        <div className="lch-tv__top">
          <span className="lch-tv__live"><i />Ao vivo</span>
          <strong>TV Câmara</strong>
          <small>Sessão ordinária</small>
        </div>
        <div className="lch-tv__tela">
          <div className="lch-plen">
            {VOTOS.map((v, i) => <span key={i} className={i < votados ? `is-${v}` : ""} />)}
          </div>
          <div className="lch-tv__mesa">Mesa diretora</div>
        </div>
        <div className="lch-tv__pauta">
          <div>
            <small>Em votação</small>
            <strong>Projeto de Lei 32/2026 · Iluminação da praça central</strong>
          </div>
          <div className="lch-placar">
            <span className="is-s">Sim <b>{conta("s")}</b></span>
            <span className="is-n">Não <b>{conta("n")}</b></span>
            <span className={`lch-placar__res ${fim ? "is-on" : ""}`}>{fim ? "Aprovado" : "Votando"}</span>
          </div>
        </div>
      </div>

      {/* vereador: demandas por bairro */}
      <div className="lch-card lch-painel">
        <div className="lch-card__top"><Icone nome="painel" size={14} />Painel do Vereador</div>
        <small className="lch-painel__sub">Demandas por bairro</small>
        <ul>
          {BAIRROS.map(([b, v]) => <li key={b}><span>{b}</span><i><b style={{ width: `${v}%` }} /></i></li>)}
        </ul>
      </div>
    </div>
  );
}

export default function Hero({ demo }) {
  return (
    <section className="cc-hero">
      <div className="cc-hero__bg" aria-hidden="true">
        <Grainient
          colors={["#16205B", "#1F299C", "#0372FF", "#4F9BFF"]}
          angle={160}
          speed={prefersReducedMotion() ? 0 : 0.5}
          flow={0.9}
          softness={1}
          silk={0.5}
          grainAmount={0}
          contrast={1.05}
          stir={0.8}
        />
      </div>

      <div className="container cc-hero__copy">
        <span className="cc-hero__eyebrow">Entre a Câmara e o cidadão, a gente.</span>
        <h1 className="cc-hero__title">A porta de entrada digital da sua Câmara.</h1>
        <p className="cc-hero__lead">
          Um só lugar onde o cidadão entende o que a Câmara faz, participa e recebe resposta, no aplicativo, no site ou no WhatsApp.
        </p>
        <div className="cc-hero__actions">
          <a className="btn btn--light" href={demo}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href="#solucao">Conhecer os produtos</a>
        </div>
      </div>

      <div className="container cc-hero__scene">
        <CenaCamara />
      </div>
    </section>
  );
}
