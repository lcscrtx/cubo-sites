import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoDe } from "./dados.js";

// Mantém o <head> certo quando a pessoa navega sem recarregar a página. O primeiro HTML de cada rota
// já vem com estas mesmas tags da pré-renderização (scripts/prerender.mjs); aqui só se atualiza.

function meta(attr, nome, valor) {
  let el = document.head.querySelector(`meta[${attr}="${nome}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nome);
    document.head.appendChild(el);
  }
  el.setAttribute("content", valor);
}

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const s = seoDe(pathname);
    // depois dos efeitos das páginas, que também mexem no título
    const id = requestAnimationFrame(() => {
      document.title = s.title;
      meta("name", "description", s.description);
      meta("name", "robots", s.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
      meta("property", "og:title", s.title);
      meta("property", "og:description", s.description);
      meta("property", "og:url", s.canonical ?? s.url);
      meta("name", "twitter:title", s.title);
      meta("name", "twitter:description", s.description);

      let link = document.head.querySelector('link[rel="canonical"]');
      if (s.canonical) {
        if (!link) {
          link = document.createElement("link");
          link.rel = "canonical";
          document.head.appendChild(link);
        }
        link.href = s.canonical;
      } else link?.remove();

      let ld = document.getElementById("seo-jsonld");
      if (s.jsonld.length) {
        if (!ld) {
          ld = document.createElement("script");
          ld.type = "application/ld+json";
          ld.id = "seo-jsonld";
          document.head.appendChild(ld);
        }
        ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": s.jsonld });
      } else ld?.remove();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
