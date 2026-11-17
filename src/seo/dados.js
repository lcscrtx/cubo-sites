import { CONTATO } from "../ds/contato.js";
import { PRODUTOS } from "../sites/cidade-conectada/data/produtos.js";
import { POSTS } from "../sites/cidade-conectada/data/posts.js";

// SEO dos 4 sites: título, descrição, endereço canônico e dados estruturados (JSON-LD) de cada rota.
// Usado em dois lugares: na pré-renderização do build (scripts/prerender.mjs), que escreve isto no <head>
// de cada HTML, e no navegador (Seo.jsx), que atualiza o <head> quando a pessoa navega sem recarregar.
// Textos da Cubo: documento de conteúdo (SEO por página). Quando houver domínio próprio, troque SITE_URL.

export const SITE_URL = "https://cubo-sites.vercel.app";
const MARCA = "Cubo Tecnologia";

const abs = (p) => `${SITE_URL}${p}`;

/* ---------- dados estruturados ---------- */
const ORG = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#cubo`,
  name: MARCA,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand/cubo-logo.svg`,
  email: CONTATO.email,
  telephone: "+55-83-99610-8953",
  slogan: "o amanhã, fazemos hoje.",
  description: "GovTech de João Pessoa (PB) que desenvolve tecnologia própria para prefeituras, câmaras e assembleias.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Empresário Clovis Rolim, 2051, DCT – Duo Corporate Towers, Torre Norte, Salas 801, 803 e 805",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    postalCode: "58033-454",
    addressCountry: "BR",
  },
  sameAs: CONTATO.redes.map((r) => r.href),
};

const SITE = { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: MARCA, inLanguage: "pt-BR", publisher: { "@id": ORG["@id"] } };

/** Aplicativo/produto da Cubo como SoftwareApplication (categoria governo). */
const app = (nome, url, descricao) => ({
  "@type": "SoftwareApplication",
  "@id": `${abs(url)}#app`,
  name: nome,
  url: abs(url),
  description: descricao,
  applicationCategory: "GovernmentApplication",
  inLanguage: "pt-BR",
  publisher: { "@id": ORG["@id"] },
  provider: { "@id": ORG["@id"] },
  areaServed: "BR",
});

/** Trilha de navegação: [[nome, caminho], ...] a partir do início do site. */
const trilha = (itens) => ({
  "@type": "BreadcrumbList",
  itemListElement: itens.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })),
});

const CC = "/cidade-conectada";
const CC_NOME = "Cidade Conectada";
const CC_DESC = "Aplicativo da cidade para prefeituras: mais de 600 serviços ao cidadão no celular, atendimento por WhatsApp, Libras e IA, ordens de serviço e painel do prefeito em tempo real.";
const ZP_DESC = "Processo eletrônico para prefeituras: protocolo, tramitação, assinatura eletrônica e arquivo digital, para a prefeitura sair do papel.";
const LC_DESC = "Plataforma digital para câmaras municipais e assembleias legislativas: vereadores, ouvidoria, comunicação e pesquisas em um só canal com o cidadão.";

/* ---------- páginas ---------- */
const PAGINAS = {
  // Cubo (textos do documento de conteúdo)
  "/": {
    title: "Cubo Tecnologia | GovTech para o setor público",
    description: "Conheça a Cubo Tecnologia: soluções próprias para serviços ao cidadão, processos de gestão e decisões públicas. Fale com nossa equipe.",
    jsonld: [ORG, SITE],
  },
  "/sobre": {
    title: "Sobre a Cubo | Tecnologia própria para governos",
    description: "Somos uma GovTech sediada em João Pessoa. Conheça nossa história, nossas competências e o que orienta nosso trabalho no setor público.",
    trilha: [["Sobre a Cubo", "/sobre"]],
  },
  "/solucoes": {
    title: "Soluções para governos | Cubo Tecnologia",
    description: "Soluções de tecnologia para o setor público: serviços digitais, gestão, dados e aplicativos. Conheça as frentes de atuação da Cubo.",
    trilha: [["Soluções", "/solucoes"]],
  },
  "/carreiras": {
    title: "Carreiras na Cubo | Tecnologia com impacto público",
    description: "Conheça as áreas de atuação da Cubo e consulte vagas em tecnologia para o setor público. Veja os requisitos e as condições de cada oportunidade.",
    trilha: [["Carreiras", "/carreiras"]],
  },
  "/contato": {
    title: "Contato | Fale com a Cubo Tecnologia",
    description: "Fale com a Cubo sobre os desafios do seu órgão. Entre em contato para conhecer nossas soluções de tecnologia para o setor público.",
    trilha: [["Contato", "/contato"]],
  },
  "/blog": {
    title: "Blog da Cubo | Histórias de gestão pública digital",
    description: "Histórias reais de prefeituras que digitalizaram serviços com a Cubo: números, exemplos de uso e guias para a gestão pública.",
    trilha: [["Blog", "/blog"]],
  },
  "/acesso": {
    title: "Acesso do cliente | Cubo Tecnologia",
    description: "Acesse o ambiente do Cidade Conectada, do Cidade Zero Papel e do Legislativo Conectado.",
    trilha: [["Acesso do cliente", "/acesso"]],
  },
  "/privacidade": {
    title: "Política de Privacidade | Cubo Tecnologia",
    description: "Como a Cubo Tecnologia trata os dados pessoais recebidos pelo site e pelos canais de contato, e como exercer os seus direitos pela LGPD.",
    trilha: [["Política de Privacidade", "/privacidade"]],
  },
  "/termos": {
    title: "Termos de uso | Cubo Tecnologia",
    description: "As regras para usar os sites da Cubo Tecnologia e de seus produtos: Cidade Conectada, Cidade Zero Papel e Legislativo Conectado.",
    trilha: [["Termos de uso", "/termos"]],
  },

  // Cidade Conectada: as buscas que importam são "app da cidade", "aplicativo para prefeitura", "app de serviços da prefeitura"
  [CC]: {
    title: "Cidade Conectada | App da cidade e serviços da prefeitura no celular",
    description: CC_DESC,
    jsonld: [app(CC_NOME, CC, CC_DESC)],
    trilha: [[CC_NOME, CC]],
  },
  [`${CC}/produtos`]: {
    title: "Produtos do Cidade Conectada | App, WhatsApp, Libras e IA para prefeituras",
    description: "SuperApp de serviços, interoperabilidade, atendimento por WhatsApp, teleatendimento em Libras, IA para atendimento e Conecta OS: as soluções do Cidade Conectada.",
    trilha: [[CC_NOME, CC], ["Produtos", `${CC}/produtos`]],
  },
  [`${CC}/secretarias`]: {
    title: "Cidade Conectada por secretaria | Saúde, infraestrutura, meio ambiente",
    description: "Como cada secretaria da prefeitura usa o Cidade Conectada: saúde, infraestrutura, meio ambiente e outras, com serviços no app da cidade.",
    trilha: [[CC_NOME, CC], ["Secretarias", `${CC}/secretarias`]],
  },
  [`${CC}/clientes/joao-pessoa`]: {
    title: "João Pessoa na Palma da Mão | Caso Cidade Conectada",
    description: "Como João Pessoa chegou a mais de 188 mil demandas em um ano e mais de 450 mil usuários com o app da cidade feito com o Cidade Conectada.",
    trilha: [[CC_NOME, CC], ["João Pessoa", `${CC}/clientes/joao-pessoa`]],
  },
  [`${CC}/como-contratar`]: {
    title: "Como contratar o Cidade Conectada | App para prefeituras",
    description: "Passo a passo para a prefeitura contratar o Cidade Conectada: conversa, proposta, implantação e treinamento das equipes.",
    trilha: [[CC_NOME, CC], ["Como contratar", `${CC}/como-contratar`]],
  },
  [`${CC}/demonstracao`]: {
    title: "Demonstração do Cidade Conectada | Veja o app da cidade funcionando",
    description: "Agende uma demonstração do Cidade Conectada e veja o app do cidadão, o portal do servidor e o painel do prefeito funcionando.",
    trilha: [[CC_NOME, CC], ["Demonstração", `${CC}/demonstracao`]],
  },
  [`${CC}/ajuda`]: {
    title: "Central de ajuda do Cidade Conectada",
    description: "Dúvidas de cidadãos e servidores sobre o app da cidade: cadastro, solicitações, acompanhamento e atendimento.",
    trilha: [[CC_NOME, CC], ["Ajuda", `${CC}/ajuda`]],
  },
  [`${CC}/materiais`]: {
    title: "Materiais do Cidade Conectada | Vídeo e apresentação",
    description: "Vídeo e apresentação do Cidade Conectada para levar à equipe da prefeitura.",
    trilha: [[CC_NOME, CC], ["Materiais", `${CC}/materiais`]],
  },
  [`${CC}/blog`]: {
    title: "Blog do Cidade Conectada | Prefeitura digital na prática",
    description: "Histórias de sucesso, exemplos de uso e guias de prefeituras que levaram os serviços para o app da cidade.",
    trilha: [[CC_NOME, CC], ["Blog", `${CC}/blog`]],
  },

  // Cidade Zero Papel e Legislativo Conectado
  "/cidade-zero-papel": {
    title: "Cidade Zero Papel | Processo eletrônico e assinatura digital para prefeituras",
    description: ZP_DESC,
    jsonld: [app("Cidade Zero Papel", "/cidade-zero-papel", ZP_DESC)],
    trilha: [["Cidade Zero Papel", "/cidade-zero-papel"]],
  },
  "/legislativo-conectado": {
    title: "Legislativo Conectado | Plataforma digital para câmaras municipais",
    description: LC_DESC,
    jsonld: [app("Legislativo Conectado", "/legislativo-conectado", LC_DESC)],
    trilha: [["Legislativo Conectado", "/legislativo-conectado"]],
  },
};

// produtos do Cidade Conectada
for (const p of PRODUTOS) {
  const url = `${CC}/produtos/${p.slug}`;
  PAGINAS[url] = {
    title: `${p.nome} | Cidade Conectada`,
    description: p.resumoHero ?? p.promessa,
    jsonld: [app(p.nome, url, p.resumoHero ?? p.promessa)],
    trilha: [[CC_NOME, CC], ["Produtos", `${CC}/produtos`], [p.curto ?? p.nome, url]],
  };
}

// posts: o mesmo texto aparece no blog da Cubo e no do Cidade Conectada; o canônico é o do Cidade Conectada
for (const p of POSTS) {
  const canon = `${CC}/blog/${p.slug}`;
  const artigo = {
    "@type": "Article",
    headline: p.titulo,
    description: p.resumo,
    inLanguage: "pt-BR",
    mainEntityOfPage: abs(canon),
    author: { "@id": ORG["@id"] },
    publisher: { "@id": ORG["@id"] },
  };
  const base = { title: `${p.titulo} | Cidade Conectada`, description: p.resumo, canonical: canon, jsonld: [artigo] };
  PAGINAS[canon] = { ...base, trilha: [[CC_NOME, CC], ["Blog", `${CC}/blog`], [p.titulo, canon]] };
  PAGINAS[`/blog/${p.slug}`] = { ...base, trilha: [["Blog", "/blog"], [p.titulo, `/blog/${p.slug}`]] };
}

const NAO_ENCONTRADA = {
  title: "Página não encontrada | Cubo Tecnologia",
  description: "Não encontramos esta página. Volte ao início para conhecer a Cubo Tecnologia ou encontre nossos canais de contato.",
  noindex: true,
};

/** Todas as rotas que viram HTML no build e entram no sitemap. */
export const ROTAS = Object.keys(PAGINAS);

/** SEO completo de um caminho. Caminho desconhecido = página não encontrada (noindex). */
export function seoDe(pathname) {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const pg = PAGINAS[p];
  if (!pg) return { ...NAO_ENCONTRADA, url: abs(p), jsonld: [] };
  const canonical = abs(pg.canonical ?? p);
  const grafo = [...(pg.jsonld ?? [])];
  if (pg.trilha) grafo.push(trilha([[MARCA, "/"], ...pg.trilha]));
  if (p !== "/" && !grafo.some((g) => g["@type"] === "Organization")) grafo.push(ORG);
  return { title: pg.title, description: pg.description, canonical, url: abs(p), jsonld: grafo, noindex: false };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Tags do <head> de uma página, como texto (usado pela pré-renderização). */
export function headHtml(seo) {
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    seo.canonical && `<link rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${MARCA}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(seo.canonical ?? seo.url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    seo.jsonld.length && `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify({ "@context": "https://schema.org", "@graph": seo.jsonld }).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}
