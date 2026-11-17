import LayoutSite from "../comum/LayoutSite.jsx";
import { CC_HOME, ZP_HOME, LC_HOME } from "../comum/marcas.jsx";
import { CONTATO } from "../../ds/contato.js";

// Casca do site da Cubo Tecnologia, a empresa-mãe. Menu do wireframe:
// Produtos · Soluções · Sobre · Clientes · Blog · Carreiras · Fale conosco (página de contato).

export const FALE = `mailto:${CONTATO.email}?subject=${encodeURIComponent("Contato pelo site da Cubo")}`;
export const PARCEIRO = `mailto:${CONTATO.email}?subject=${encodeURIComponent("Quero ser parceiro da Cubo")}`;
export const VAGAS = CONTATO.redes.find((r) => r.label === "LinkedIn")?.href;

export function MarcaCubo() {
  return (
    <a className="mk-brand" href="/" aria-label="Cubo Tecnologia, início">
      <img src="/brand/cubo-logo.svg" alt="Cubo Tecnologia" height="26" style={{ height: 26, width: "auto" }} />
    </a>
  );
}

const nav = [
  {
    label: "Produtos",
    href: "/#produtos",
    itens: [
      { label: "Cidade Conectada", icone: "app", texto: "Atendimento ao cidadão na palma da mão", href: CC_HOME },
      { label: "Cidade Zero Papel", icone: "arquivo", texto: "Processos eletrônicos, do protocolo ao arquivo", href: ZP_HOME },
      { label: "Legislativo Conectado", icone: "camara", texto: "Para câmaras e assembleias", href: LC_HOME },
    ],
  },
  { label: "Soluções", href: "/solucoes" },
  { label: "Sobre", href: "/sobre" },
  { label: "Clientes", href: "/#clientes" },
  { label: "Blog", href: "/blog" },
  { label: "Carreiras", href: "/carreiras" },
];

const topBar = {
  label: "Nossos produtos:",
  products: [
    { label: "Cidade Conectada", href: CC_HOME },
    { label: "Cidade Zero Papel", href: ZP_HOME },
    { label: "Legislativo Conectado", href: LC_HOME },
  ],
  links: [
    { label: "Blog", href: "/blog" },
    { label: "Acesso do cliente", href: "/acesso" },
  ],
};

const colunas = [
  {
    title: "Produtos",
    links: [
      { label: "Cidade Conectada", href: CC_HOME },
      { label: "Cidade Zero Papel", href: ZP_HOME },
      { label: "Legislativo Conectado", href: LC_HOME },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Cubo", href: "/sobre" },
      { label: "Soluções", href: "/solucoes" },
      { label: "Conformidade e ética", href: "/sobre#conformidade" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Fale conosco",
    links: [
      { label: "Contato", href: "/contato" },
      { label: "Falar com a equipe", href: FALE },
      { label: "Seja um parceiro", href: PARCEIRO },
    ],
  },
];

export default function Layout({ titulo, headerOverlay, children }) {
  return (
    <LayoutSite
      site="cubo"
      nome="Cubo Tecnologia"
      titulo={titulo}
      brand={<MarcaCubo />}
      nav={nav}
      topBar={topBar}
      cta={{ label: "Fale conosco", href: "/contato" }}
      resumo="Entre a prefeitura e o cidadão, a gente."
      colunas={colunas}
      byCubo={false}
      headerOverlay={headerOverlay}
    >
      {children}
    </LayoutSite>
  );
}
