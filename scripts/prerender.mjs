// Pré-renderização do build: para cada rota de src/seo/dados.js, escreve dist/<rota>/index.html com o
// <head> de SEO e o HTML da página já montado. Também gera 404.html, sitemap.xml e robots.txt.
// Roda depois de "vite build" (cliente) e "vite build --ssr" (servidor): veja o script "build" do package.json.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const ssr = resolve("dist-ssr/entry-server.js");
const { render, ROTAS, SITE_URL, seoDe, headHtml } = await import(pathToFileURL(ssr).href);

const modelo = readFileSync(join(dist, "index.html"), "utf8");
if (!modelo.includes("<!--seo-->") || !modelo.includes("<!--app-->")) throw new Error("index.html sem <!--seo--> ou <!--app-->");

const pagina = (rota, url = rota) => modelo.replace("<!--seo-->", headHtml(seoDe(rota))).replace("<!--app-->", render(url));

function escrever(arquivo, html) {
  mkdirSync(dirname(arquivo), { recursive: true });
  writeFileSync(arquivo, html);
}

for (const rota of ROTAS) {
  escrever(rota === "/" ? join(dist, "index.html") : join(dist, rota, "index.html"), pagina(rota));
}
// página não encontrada: a Vercel serve dist/404.html com status 404
escrever(join(dist, "404.html"), pagina("/404", "/pagina-nao-encontrada"));

const hoje = new Date().toISOString().slice(0, 10);
const indexaveis = ROTAS.filter((r) => seoDe(r).canonical === `${SITE_URL}${r}`);
const prioridade = (r) => (r === "/" || r === "/cidade-conectada" ? "1.0" : r.split("/").length <= 2 || r.endsWith("/produtos") ? "0.8" : "0.6");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexaveis
    .map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${hoje}</lastmod><priority>${prioridade(r)}</priority></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`pré-renderizadas ${ROTAS.length} rotas + 404; sitemap com ${indexaveis.length} endereços`);
