import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@fontsource-variable/figtree";
import "@fontsource-variable/ibm-plex-sans";
import "./ds/tokens.css";
import "./ds/base.css";

import CidadeConectadaHome from "./sites/cidade-conectada/Home.jsx";
import BlogLista from "./sites/cidade-conectada/pages/BlogLista.jsx";
import BlogArtigo from "./sites/cidade-conectada/pages/BlogArtigo.jsx";
import Materiais from "./sites/cidade-conectada/pages/Materiais.jsx";
import Ajuda from "./sites/cidade-conectada/pages/Ajuda.jsx";
import TodosProdutos from "./sites/cidade-conectada/pages/TodosProdutos.jsx";
import Produto from "./sites/cidade-conectada/pages/Produto.jsx";
import SecretariasPage from "./sites/cidade-conectada/pages/SecretariasPage.jsx";
import CasoJoaoPessoa from "./sites/cidade-conectada/pages/CasoJoaoPessoa.jsx";
import ComoContratar from "./sites/cidade-conectada/pages/ComoContratar.jsx";
import Demonstracao from "./sites/cidade-conectada/pages/Demonstracao.jsx";
import CuboHome from "./sites/cubo/Home.jsx";
import CuboSobre from "./sites/cubo/Sobre.jsx";
import { BlogCubo, ArtigoCubo } from "./sites/cubo/Blog.jsx";
import LegislativoHome from "./sites/legislativo/Home.jsx";
import ZeroPapelHome from "./sites/zero-papel/Home.jsx";

// Um projeto, vários sites. Cada site mora em src/sites/<nome> e pode ganhar domínio próprio depois.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CuboHome />} />
        <Route path="/sobre" element={<CuboSobre />} />
        <Route path="/blog" element={<BlogCubo />} />
        <Route path="/blog/:slug" element={<ArtigoCubo />} />
        <Route path="/cidade-conectada" element={<CidadeConectadaHome />} />
        <Route path="/cidade-conectada/blog" element={<BlogLista />} />
        <Route path="/cidade-conectada/blog/:slug" element={<BlogArtigo />} />
        <Route path="/cidade-conectada/materiais" element={<Materiais />} />
        <Route path="/cidade-conectada/ajuda" element={<Ajuda />} />
        <Route path="/cidade-conectada/produtos" element={<TodosProdutos />} />
        <Route path="/cidade-conectada/produtos/:slug" element={<Produto />} />
        <Route path="/cidade-conectada/secretarias" element={<SecretariasPage />} />
        <Route path="/cidade-conectada/clientes/joao-pessoa" element={<CasoJoaoPessoa />} />
        <Route path="/cidade-conectada/como-contratar" element={<ComoContratar />} />
        <Route path="/cidade-conectada/demonstracao" element={<Demonstracao />} />
        <Route path="/legislativo-conectado" element={<LegislativoHome />} />
        <Route path="/cidade-zero-papel" element={<ZeroPapelHome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
