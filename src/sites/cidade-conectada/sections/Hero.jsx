import Grainient from "../../../ds/bg/Grainient.jsx";
import { prefersReducedMotion } from "../../../ds/motion.js";
import HeroLive from "./HeroLive.jsx";
import "./Hero.css";

// Hero: a cor da marca preenche tudo (degradê animado, o mesmo do CTA final).
// Em cima, o texto centralizado; embaixo, a cena viva do slogan:
// cidadão → Cidade Conectada → prefeitura, e a resposta voltando.

export default function Hero() {
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
        <span className="cc-hero__eyebrow">Entre a prefeitura e o cidadão, a gente.</span>
        <h1 className="cc-hero__title">A solução completa para colocar a prefeitura na palma da mão.</h1>
        <p className="cc-hero__lead">
          Aplicativo de serviços, WhatsApp, atendimento em Libras, inteligência artificial e gestão de ordens de serviço, juntos ou separados.
        </p>
        <div className="cc-hero__actions">
          <a className="btn btn--light" href="/cidade-conectada/demonstracao">Agendar demonstração</a>
          <a className="btn btn--outline-light" href="/cidade-conectada/materiais#video">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M6.5 5.4v5.2L10.6 8z" fill="currentColor" /></svg>
            Ver em 2 minutos
          </a>
        </div>
      </div>

      <div className="container cc-hero__scene">
        <HeroLive />
      </div>
    </section>
  );
}
