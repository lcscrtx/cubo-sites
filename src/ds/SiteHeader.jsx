import { useEffect, useRef, useState } from "react";
import Icone from "./Icone.jsx";
import "./SiteHeader.css";

/**
 * Cabeçalho comum a todos os sites.
 * - topBar: faixa fina com os outros produtos da Cubo e links de apoio.
 * - brand: nó com o logo do site.
 * - nav: [{ label, href, itens?: [{ label, href, texto?, icone? }] }]  itens = abre um menu suspenso
 * - cta: { label, href }
 * - overlay: o cabeçalho fica por cima do hero, transparente e com texto branco;
 *   ao rolar a página ele vira a faixa branca de sempre.
 *
 * Desktop: menus suspensos abrem no hover e no foco do teclado.
 * Abaixo de 1080px: botão de menu abre um painel com tudo (itens, produtos Cubo e o CTA).
 */

function Seta() {
  return (
    <svg className="site-nav__chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteHeader({ topBar, brand, nav, cta, overlay = false }) {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const painelRef = useRef(null);

  // sombra no cabeçalho depois que a página rola
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // painel móvel: trava a rolagem do fundo e fecha com Esc
  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    painelRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = antes;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header className={`site-header ${overlay ? "site-header--overlay" : ""} ${rolou ? "is-scrolled" : ""} ${aberto ? "is-open" : ""}`}>
      {topBar && (
        <div className="site-topbar">
          <div className="container site-topbar__inner">
            <span>
              {topBar.label}{" "}
              {topBar.products.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && <span className="site-topbar__sep">·</span>}
                  <a href={p.href}>{p.label}</a>
                </span>
              ))}
            </span>
            <span className="site-topbar__links">
              {topBar.links.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </span>
          </div>
        </div>
      )}

      <div className="site-nav">
        <div className="container site-nav__inner">
          {brand}

          <nav className="site-nav__menu" aria-label="Menu principal">
            {nav.map((item) =>
              item.itens ? (
                <div key={item.label} className="site-nav__group">
                  <a href={item.href} aria-haspopup="true">
                    {item.label}
                    <Seta />
                  </a>
                  <div className="site-nav__drop">
                    <ul>
                      {item.itens.map((s) => (
                        <li key={s.label}>
                          <a href={s.href}>
                            {s.icone && <span className="site-nav__ico"><Icone nome={s.icone} /></span>}
                            <span className="site-nav__txt">
                              <strong>{s.label}</strong>
                              {s.texto && <span>{s.texto}</span>}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <a key={item.label} href={item.href}>{item.label}</a>
              )
            )}
          </nav>

          <a className="btn btn--primary site-nav__cta" href={cta.href}>{cta.label}</a>

          <button
            type="button"
            className="site-nav__toggle"
            aria-expanded={aberto}
            aria-controls="site-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((a) => !a)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      {/* Painel do menu no celular */}
      <div id="site-mobile" ref={painelRef} className="site-mobile" hidden={!aberto}>
        <div className="container">
          <nav aria-label="Menu">
            {nav.map((item) => (
              <div key={item.label} className="site-mobile__group">
                <a href={item.href} onClick={fechar} className="site-mobile__top">{item.label}</a>
                {item.itens && (
                  <ul>
                    {item.itens.map((s) => (
                      <li key={s.label}><a href={s.href} onClick={fechar}>{s.label}</a></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          {topBar && (
            <div className="site-mobile__extra">
              <span>{topBar.label}</span>
              {topBar.products.map((p) => <a key={p.href} href={p.href} onClick={fechar}>{p.label}</a>)}
            </div>
          )}
          <a className="btn btn--primary site-mobile__cta" href={cta.href} onClick={fechar}>{cta.label}</a>
        </div>
      </div>
    </header>
  );
}
