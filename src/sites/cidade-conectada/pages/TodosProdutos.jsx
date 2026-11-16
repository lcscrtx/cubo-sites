import { useState } from "react";
import { Link } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { ARTES } from "../sections/ProdutoArt.jsx";
import { HeroCor, Secao, Pendencias, LinkSeta } from "./partes.jsx";
import { Orbita } from "./HeroArtes.jsx";
import { PRODUTOS } from "../data/produtos.js";
import "../sections/Produtos.css";
import "./pages.css";
import "./internas.css";

// Todos os produtos (quadro "Todos os produtos" do wireframe), na linguagem da Home:
// hero colorido com a órbita dos 6 produtos, catálogo com as mini telas, formas de contratar,
// montador com pedido de proposta, comparativo, atalho para Como contratar, perguntas e CTA.

const COMPARATIVO = [
  ["Produtos", "Os escolhidos", "Todos"],
  ["Expansão", "Por etapas", "Não se aplica"],
  ["Integração entre produtos", "—", "—"],
  ["Treinamento", "—", "—"],
  ["Suporte", "—", "—"],
  ["Indicado para", "—", "—"],
];

const FAQ = [
  { p: "Posso começar com poucos produtos e ampliar depois?", r: "Sim. A contratação pode começar pelas prioridades da cidade." },
  { p: "Como é calculado o valor da proposta?", r: "O serviço é dimensionado de acordo com os produtos e o porte do município." },
];

function Check() {
  return <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 6.2 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function TodosProdutos() {
  const [sel, setSel] = useState(["superapp", "atendimento-whatsapp"]);
  const alternar = (s) => setSel((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));
  const escolhidos = PRODUTOS.filter((p) => sel.includes(p.slug));

  return (
    <Layout titulo="Produtos" headerOverlay>
      <HeroCor
        crumbs={[{ label: "Início", to: BASE }, { label: "Produtos" }]}
        rotulo="Entre a prefeitura e o cidadão, a gente."
        titulo="Seis produtos, uma prefeitura na palma da mão."
        texto="Contrate a solução completa ou escolha os produtos que sua cidade precisa agora. Todos conversam entre si."
        acoes={<>
          <a className="btn btn--primary" href="#monte">Montar minha solução</a>
          <Link className="btn btn--ghost" to={`${BASE}/demonstracao`}>Falar com especialista</Link>
        </>}
        arte={<Orbita />}
      />

      <Secao titulo={<>Nossos produtos</>} texto="Do pedido do cidadão à equipe em campo. Cada produto tem a sua página, com o que faz e como implantar.">
        <div className="pd-grid">
          {PRODUTOS.map((p, i) => {
            const Arte = ARTES[p.arte];
            return (
              <Link key={p.slug} className="pd-card" to={`${BASE}/produtos/${p.slug}`} data-in style={{ "--d": `${i * 60}ms` }}>
                <div className="pd-card__art"><Arte /></div>
                <div className="pd-card__body">
                  <h3>{p.curto}</h3>
                  <p>{p.promessa}</p>
                  <span className="pd-card__more">Conhecer <Icone nome="seta" size={14} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Secao>

      <Secao titulo={<>Duas formas<br />de contratar.</>} texto="Leve tudo integrado de uma vez ou comece pela prioridade da gestão e amplie por etapas.">
        <div className="in-two">
          <article className="in-way in-way--main">
            <span className="in-way__tag">Tudo integrado</span>
            <h3>Solução completa</h3>
            <p>Para colocar toda a prefeitura na palma da mão, com os produtos trabalhando juntos.</p>
            <ul>
              <li><span><Check /></span>Os seis produtos</li>
              <li><span><Check /></span>Atendimento e gestão integrados</li>
            </ul>
            <div className="in-way__icons" aria-hidden="true">
              {PRODUTOS.map((p) => <span key={p.slug}><Icone nome={p.icone} size={16} /></span>)}
            </div>
            <Link className="btn btn--primary" to={`${BASE}/demonstracao?produtos=completa`}>Solicitar proposta completa</Link>
          </article>
          <article className="in-way">
            <span className="in-way__tag in-way__tag--soft">Por etapas</span>
            <h3>Por produto</h3>
            <p>Para começar por uma prioridade e ampliar por etapas.</p>
            <ul>
              <li><span><Check /></span>Escolha um ou mais produtos</li>
              <li><span><Check /></span>Adicione outros depois</li>
            </ul>
            <a className="btn btn--ghost" href="#monte">Escolher produtos</a>
          </article>
        </div>
        <Pendencias itens={["Benefícios exclusivos da solução completa, se houver", "Dependências entre produtos, se houver"]} />
      </Secao>

      <Secao id="monte" titulo={<>Monte sua<br />solução.</>} texto="Marque o que sua prefeitura precisa. A proposta considera os produtos escolhidos e o porte do município.">
        <div className="in-builder">
          <div className="in-pick">
            {PRODUTOS.map((p) => {
              const on = sel.includes(p.slug);
              return (
                <button key={p.slug} type="button" className={`in-pick__item ${on ? "is-on" : ""}`} aria-pressed={on} onClick={() => alternar(p.slug)}>
                  <span className="in-pick__box"><Check /></span>
                  <span className="in-pick__ico"><Icone nome={p.icone} size={18} /></span>
                  <span className="in-pick__txt"><strong>{p.curto}</strong><small>{p.seletor}</small></span>
                </button>
              );
            })}
          </div>
          <aside className="in-summary" aria-live="polite">
            <span className="in-summary__label">Sua seleção</span>
            <strong>{escolhidos.length === 0 ? "Nenhum produto" : `${escolhidos.length} ${escolhidos.length === 1 ? "produto" : "produtos"}`}</strong>
            <ul>{escolhidos.map((p) => <li key={p.slug}><Icone nome={p.icone} size={14} />{p.curto}</li>)}</ul>
            {escolhidos.length === PRODUTOS.length && <p className="in-summary__tip">Você marcou todos: a solução completa é o caminho.</p>}
            <Link className={`btn btn--primary ${escolhidos.length === 0 ? "is-disabled" : ""}`} to={`${BASE}/demonstracao?produtos=${sel.join(",")}`} aria-disabled={escolhidos.length === 0}>Solicitar proposta</Link>
          </aside>
        </div>
      </Secao>

      <Secao titulo={<>Qual caminho combina<br />com a sua cidade?</>} texto="Compare as duas formas de contratar lado a lado.">
        <div className="in-table-wrap">
          <table className="in-table">
            <thead><tr><th>Item</th><th>Por produto</th><th>Solução completa</th></tr></thead>
            <tbody>
              {COMPARATIVO.map(([item, a, b]) => (
                <tr key={item}><th scope="row">{item}</th><td>{a}</td><td>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pendencias itens={["Comparativo: integração, treinamento, suporte e perfil de município indicado para cada caminho"]} />
      </Secao>

      <Secao>
        <div className="in-shortcut">
          <span className="in-shortcut__ico"><Icone nome="blog" size={22} /></span>
          <div>
            <h2>Preço, documentos e etapas em uma só página</h2>
            <p>Para digitalizar também os processos internos, some o <a href="/cidade-zero-papel">Cidade Zero Papel</a>.</p>
          </div>
          <div className="in-shortcut__actions">
            <Link className="btn btn--primary" to={`${BASE}/como-contratar`}>Ver como contratar</Link>
            <Link className="btn btn--ghost" to={`${BASE}/materiais#apresentacao`}>Baixar apresentação</Link>
          </div>
        </div>
      </Secao>

      <Secao titulo={<>Dúvidas sobre<br />os produtos.</>} texto="Não achou a sua?" acao={<LinkSeta to={`${BASE}/demonstracao`}>Falar com especialista</LinkSeta>}>
        <dl className="in-faq">{FAQ.map((q) => <div key={q.p}><dt>{q.p}</dt><dd>{q.r}</dd></div>)}</dl>
        <Pendencias itens={["Os produtos se integram entre si?", "O Cidade Conectada se integra aos sistemas atuais? (com exemplos de sistemas)"]} />
      </Secao>

      <CtaFinal titulo="Não sabe por onde começar?" texto="Um especialista ajuda a definir os produtos prioritários para sua cidade." completo={false} />
    </Layout>
  );
}
