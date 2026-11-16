import { Link } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { HeroCor, Pendencias } from "./partes.jsx";
import { ServicosVivos } from "./HeroArtes.jsx";
import { SECRETARIAS, E_AINDA } from "../data/secretarias.js";
import "./pages.css";
import "./internas.css";

// Exemplos por secretaria (quadro "Exemplos por secretaria" do wireframe).
// Atalhos para cada pasta no topo; cada bloco lista os serviços com a etiqueta
// "Em uso em João Pessoa" ou o produto que torna o serviço possível. Fonte sempre visível.

function Etiqueta({ uso }) {
  return uso === "jp"
    ? <em className="in-tag in-tag--jp">Em uso em João Pessoa</em>
    : <em className="in-tag">{uso}</em>;
}

export default function SecretariasPage() {
  return (
    <Layout titulo="Secretarias" headerOverlay>
      <HeroCor
        crumbs={[{ label: "Início", to: BASE }, { label: "Secretarias" }]}
        rotulo="Entre a prefeitura e o cidadão, a gente."
        titulo="Veja o que o Cidade Conectada faz em cada secretaria."
        texto="Exemplos reais do João Pessoa na Palma da Mão, com novos casos publicados a cada cidade."
        acoes={<a className="btn btn--primary" href={`#${SECRETARIAS[0].id}`}>Ver exemplos</a>}
        arte={<ServicosVivos />}
      />

      {/* Atalhos fixos para as pastas */}
      <nav className="in-tabs in-tabs--sticky" aria-label="Secretarias">
        <div className="container in-tabs__row">
          {SECRETARIAS.map((s) => <a key={s.id} href={`#${s.id}`}><Icone nome={s.icone} size={16} />{s.nome}</a>)}
          <a href="#mais"><Icone nome="grade" size={16} />Mais áreas</a>
        </div>
      </nav>

      <div className="container in-legend in-legend--page">
        <span><em className="in-tag in-tag--jp">Em uso em João Pessoa</em> disponível hoje no app da capital</span>
        <span><em className="in-tag">Nome do produto</em> possível com outro produto do Cidade Conectada</span>
      </div>

      <div className="container in-secs">
        {SECRETARIAS.map((s) => (
          <section key={s.id} id={s.id} className="in-sec">
            <header className="in-sec__head">
              <span className="in-sec__ico"><Icone nome={s.icone} size={22} /></span>
              <div>
                <h2>{s.nome}</h2>
                <p>{s.resumo}</p>
              </div>
              <Link className="sec-link" to={`${BASE}/blog`}>Ver histórias <Icone nome="seta" size={14} /></Link>
            </header>

            <ul className="in-sec__items">
              {s.itens.map((it) => (
                <li key={it.t}>
                  <strong>{it.t}</strong>
                  <p>{it.d}</p>
                  <Etiqueta uso={it.uso} />
                </li>
              ))}
            </ul>

            {(s.resultado || s.citacao) && (
              <div className="in-sec__result">
                {s.resultado && <p><strong>Resultado.</strong> {s.resultado}</p>}
                {s.citacao && <blockquote><p>“{s.citacao.texto}”</p><cite>{s.citacao.autor}</cite></blockquote>}
              </div>
            )}
            <p className="in-sec__src">Fonte: {s.fonte}</p>
            {s.pendente && <Pendencias itens={[s.pendente]} />}
          </section>
        ))}

        <section id="mais" className="in-sec">
          <header className="in-sec__head">
            <span className="in-sec__ico"><Icone nome="grade" size={22} /></span>
            <div><h2>E ainda</h2><p>Outras áreas que já atendem pelo aplicativo.</p></div>
          </header>
          <ul className="in-sec__items">
            {E_AINDA.map((it) => (
              <li key={it.t}><strong>{it.t}</strong><p>{it.d}</p><Etiqueta uso="jp" /></li>
            ))}
            <li className="in-sec__new"><strong>Novos exemplos enviados pela Cubo</strong><p>Publicados pelo blog, por cidade e secretaria.</p></li>
          </ul>
          <p className="in-sec__src">Fonte: Prefeitura de João Pessoa (jul/2024).</p>
        </section>
      </div>

      <CtaFinal titulo="Sua secretaria tem outra necessidade?" texto="Mostre sua prioridade e veja como o Cidade Conectada pode ajudar." completo={false} />
    </Layout>
  );
}
