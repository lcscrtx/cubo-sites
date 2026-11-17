import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

// Entrada da pré-renderização (scripts/prerender.mjs): gera o HTML de uma rota no build,
// para o Google e as redes sociais lerem o conteúdo sem precisar rodar o JavaScript.
export { ROTAS, SITE_URL, seoDe, headHtml } from "./seo/dados.js";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
