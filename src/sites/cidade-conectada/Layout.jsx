import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "../../ds/SiteHeader.jsx";
import SiteFooter from "../../ds/SiteFooter.jsx";
import "./Layout.css";

// Casca comum do site do Cidade Conectada: cabeçalho, rodapé e marca.
// Links que ainda não têm página própria apontam para a seção equivalente da Home.

export const BASE = "/cidade-conectada";

// o navegador não restaura a rolagem antiga ao recarregar; quem decide é useNavegacao
if (typeof history !== "undefined" && "scrollRestoration" in history) history.scrollRestoration = "manual";
const H = (ancora) => `${BASE}#${ancora}`;

const nav = [
  {
    label: "Produtos",
    href: `${BASE}/produtos`,
    itens: [
      { label: "SuperApp de Serviços", icone: "app", texto: "Os serviços da prefeitura em um só app", href: `${BASE}/produtos/superapp` },
      { label: "Interoperabilidade", icone: "interop", texto: "Integra os sistemas que a prefeitura já usa", href: `${BASE}/produtos/interoperabilidade` },
      { label: "Atendimento WhatsApp", icone: "chat", texto: "A prefeitura no canal do cidadão", href: `${BASE}/produtos/atendimento-whatsapp` },
      { label: "TeleAtendimento com Libras", icone: "libras", texto: "Atendimento por vídeo com intérprete", href: `${BASE}/produtos/teleatendimento-libras` },
      { label: "IA para Atendimento", icone: "ia", texto: "Respostas por texto e voz", href: `${BASE}/produtos/ia-atendimento` },
      { label: "Conecta OS", icone: "os", texto: "Ordens de serviço até a equipe em campo", href: `${BASE}/produtos/conecta-os` },
    ],
  },
  { label: "Secretarias", href: `${BASE}/secretarias` },
  { label: "Clientes", href: `${BASE}/clientes/joao-pessoa` },
  { label: "Como contratar", href: `${BASE}/como-contratar` },
  {
    label: "Conteúdo",
    href: `${BASE}/blog`,
    itens: [
      { label: "Blog", icone: "blog", texto: "Exemplos reais, histórias e guias", href: `${BASE}/blog` },
      { label: "Materiais", icone: "materiais", texto: "Vídeo e apresentação para a sua equipe", href: `${BASE}/materiais` },
      { label: "Central de ajuda", icone: "ajuda", texto: "Dúvidas de cidadãos e de servidores", href: `${BASE}/ajuda` },
    ],
  },
];

const topBar = {
  label: "Conheça também:",
  products: [
    { label: "Cidade Zero Papel", href: "/cidade-zero-papel" },
    { label: "Legislativo Conectado", href: "/legislativo-conectado" },
  ],
  links: [
    { label: "Central de ajuda", href: `${BASE}/ajuda` },
    { label: "Acesso do cliente", href: "/acesso" },
  ],
};

const footerColumns = [
  {
    title: "Produtos",
    links: [
      { label: "SuperApp de Serviços", href: `${BASE}/produtos/superapp` },
      { label: "Interoperabilidade", href: `${BASE}/produtos/interoperabilidade` },
      { label: "Atendimento WhatsApp", href: `${BASE}/produtos/atendimento-whatsapp` },
      { label: "TeleAtendimento com Libras", href: `${BASE}/produtos/teleatendimento-libras` },
      { label: "IA para Atendimento", href: `${BASE}/produtos/ia-atendimento` },
      { label: "Conecta OS", href: `${BASE}/produtos/conecta-os` },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Blog", href: `${BASE}/blog` },
      { label: "Materiais", href: `${BASE}/materiais` },
      { label: "Central de ajuda", href: `${BASE}/ajuda` },
      { label: "Exemplos por secretaria", href: `${BASE}/secretarias` },
    ],
  },
  {
    title: "Confiança",
    links: [
      { label: "Como contratar", href: `${BASE}/como-contratar` },
      { label: "Segurança e LGPD", href: H("seguranca") },
    ],
  },
  {
    title: "Outros produtos Cubo",
    links: [
      { label: "Cidade Zero Papel", href: "/cidade-zero-papel" },
      { label: "Legislativo Conectado", href: "/legislativo-conectado" },
    ],
  },
];

export function Brand() {
  return (
    <a className="cc-brand" href={BASE} aria-label="Cidade Conectada, início">
      <img className="cc-brand__logo" src="/brand/cidade-conectada-logo.svg" alt="Cidade Conectada" width="128" height="43" />
      <span className="cc-brand__by">by <img src="/brand/cubo-logo.svg" alt="Cubo" height="14" /></span>
    </a>
  );
}

/** Ao trocar de página: vai para a âncora pedida ou volta ao topo. Atualiza o título da aba. */
function useNavegacao(titulo) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titulo ? `${titulo} · Cidade Conectada` : "Cidade Conectada · Cubo Tecnologia";
  }, [titulo]);
  useEffect(() => {
    if (hash) {
      // espera a página montar antes de rolar
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
}

export default function Layout({ titulo, headerOverlay = false, children }) {
  useNavegacao(titulo);
  return (
    <div data-site="cidade-conectada">
      <SiteHeader overlay={headerOverlay} topBar={topBar} brand={<Brand />} nav={nav} cta={{ label: "Agendar demonstração", href: `${BASE}/demonstracao` }} />
      <main>{children}</main>
      <SiteFooter brand={<Brand />} resumo="A solução completa para colocar a prefeitura na palma da mão." columns={footerColumns} name="Cidade Conectada" />
    </div>
  );
}
