import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "../../ds/SiteHeader.jsx";
import SiteFooter from "../../ds/SiteFooter.jsx";
import "./comum.css";

// Casca dos sites novos (Cubo, Legislativo Conectado, Cidade Zero Papel): mesmo cabeçalho e
// rodapé do Cidade Conectada, trocando marca, menu, fonte (data-site) e nome na aba.

if (typeof history !== "undefined" && "scrollRestoration" in history) history.scrollRestoration = "manual";

function useNavegacao(titulo, nome) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${nome}` : nome === "Cubo Tecnologia" ? "Cubo Tecnologia" : `${nome} · Cubo Tecnologia`;
  }, [titulo, nome]);
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function LayoutSite({ site, nome, titulo, brand, nav, topBar, cta, resumo, colunas, byCubo = true, headerOverlay = false, children }) {
  useNavegacao(titulo, nome);
  return (
    <div data-site={site}>
      <SiteHeader overlay={headerOverlay} topBar={topBar} brand={brand} nav={nav} cta={cta} />
      <main>{children}</main>
      <SiteFooter brand={brand} resumo={resumo} columns={colunas} name={nome} byCubo={byCubo} />
    </div>
  );
}
