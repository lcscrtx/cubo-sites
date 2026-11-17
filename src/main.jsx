import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource-variable/figtree";
import "@fontsource-variable/ibm-plex-sans";
import "./ds/tokens.css";
import "./ds/base.css";
import App from "./App.jsx";

// Um projeto, vários sites. O HTML de cada rota já vem pré-renderizado do build (scripts/prerender.mjs),
// para o Google ler o conteúdo; aqui o React monta a página por cima e assume a navegação.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
