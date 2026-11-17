import { CONTATO } from "./contato.js";
import CookieAviso, { abrirPreferencias } from "./Cookies.jsx";
import "./SiteFooter.css";

/**
 * Rodapé comum a todos os sites.
 * - brand: nó com o logo do site.
 * - resumo: uma frase sobre o site.
 * - columns: [{ title, links: [{ label, href }] }]
 * - name: nome do site para o copyright.
 * - byCubo: true nos produtos, mostra "um produto Cubo Tecnologia".
 */
export default function SiteFooter({ brand, resumo, columns, name, byCubo = true }) {
  const ano = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__about">
            {brand}
            {resumo && <p>{resumo}</p>}
            <div className="site-footer__contact">
              <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
              <a href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp {CONTATO.whatsapp.numero}</a>
              <address>{CONTATO.endereco.join(", ")}</address>
            </div>
            <ul className="site-footer__social">
              {CONTATO.redes.map((r) => (
                <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer">{r.label}</a></li>
              ))}
            </ul>
          </div>

          <nav className="site-footer__cols" aria-label="Rodapé">
            {columns.map((col) => (
              <div key={col.title} className="site-footer__col">
                <h2>{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <span>© {ano} {name}. Todos os direitos reservados.</span>
          <span className="site-footer__legal">
            <a href="/privacidade">Privacidade</a>
            <a href="/privacidade#cookies">Cookies</a>
            <a href="/termos">Termos de uso</a>
            <button type="button" onClick={abrirPreferencias}>Gerenciar cookies</button>
          </span>
          {byCubo && (
            <a className="site-footer__cubo" href="/" aria-label="Cubo Tecnologia">
              um produto
              <img src="/brand/cubo-logo.svg" alt="Cubo Tecnologia" height="18" />
            </a>
          )}
        </div>
      </div>
      <CookieAviso />
    </footer>
  );
}
