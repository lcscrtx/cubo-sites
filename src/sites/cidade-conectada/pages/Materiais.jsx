import Layout from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { PageHero } from "./partes.jsx";
import "./pages.css";

// Materiais: o que o servidor leva para o secretário ou para o prefeito (wireframe: "Conversão").
// Os arquivos ainda não existem; cada item mostra o que é e fica marcado até a Cubo enviar.

const FOLHAS = [
  { nome: "SuperApp de Serviços", icone: "app" },
  { nome: "Interoperabilidade", icone: "interop" },
  { nome: "Atendimento WhatsApp", icone: "chat" },
  { nome: "TeleAtendimento com Libras", icone: "libras" },
  { nome: "IA para Atendimento", icone: "ia" },
  { nome: "Conecta OS", icone: "os" },
];

export default function Materiais() {
  return (
    <Layout titulo="Materiais">
      <PageHero
        rotulo="Materiais"
        titulo="Leve o Cidade Conectada para a sua equipe."
        texto="Vídeo curto, apresentação e uma folha por produto: tudo o que ajuda a explicar a proposta para o secretário ou o prefeito."
      />

      <section className="container pg-section">
        <div className="pg-mat">
          <article className="pg-mat__card pg-mat__card--main" id="video">
            <span className="pg-mat__ico"><Icone nome="video" /></span>
            <h2>Cidade Conectada em 2 minutos</h2>
            <p>Uma visão rápida do pedido do cidadão à resposta da prefeitura, para assistir antes da reunião.</p>
            <div className="pg-mat__foot">
              <span className="btn btn--primary is-disabled" aria-disabled="true">Assistir ao vídeo</span>
              <span className="ph">Vídeo a enviar pela Cubo</span>
            </div>
          </article>

          <article className="pg-mat__card" id="apresentacao" style={{ animationDelay: "80ms" }}>
            <span className="pg-mat__ico"><Icone nome="materiais" /></span>
            <h2>Apresentação para baixar</h2>
            <p>O material para o servidor levar ao secretário ou ao prefeito: produtos, números de João Pessoa e como contratar.</p>
            <div className="pg-mat__foot">
              <span className="btn btn--ghost is-disabled" aria-disabled="true">Baixar apresentação (PDF)</span>
              <span className="ph">Arquivo a enviar pela Cubo</span>
            </div>
          </article>
        </div>
      </section>

      <section className="container pg-section">
        <h2 className="pg-h2">Uma folha por produto</h2>
        <ul className="pg-onepagers">
          {FOLHAS.map((f) => (
            <li key={f.nome}>
              <span><Icone nome={f.icone} /></span>
              <div>
                <strong>{f.nome}</strong>
                <small className="ph">PDF a enviar</small>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaFinal />
    </Layout>
  );
}
