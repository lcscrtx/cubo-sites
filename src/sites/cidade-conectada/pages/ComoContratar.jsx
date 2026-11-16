import { Link } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { HeroCor, Secao, Pendencias } from "./partes.jsx";
import { CaminhoContrato } from "./HeroArtes.jsx";
import "./pages.css";
import "./internas.css";

// Como contratar (quadro "Cidade Conectada · Como contratar").
// O wireframe pede revisão do jurídico antes de publicar: modalidades e documentos ficam marcados.

const VALOR = [
  { t: "Serviço mensal", d: "Contratação em modelo de serviço contínuo.", i: "os" },
  { t: "Porte do município", d: "O dimensionamento considera o tamanho da cidade.", i: "predio" },
  { t: "Produtos escolhidos", d: "A proposta muda conforme os produtos e o uso previsto.", i: "grade" },
];

const CAMINHO = [
  { t: "Conversa", d: "Entendemos as prioridades." },
  { t: "Demonstração", d: "Sua equipe vê o produto." },
  { t: "Proposta", d: "Escopo e dimensionamento." },
  { t: "Documentação", d: "Material para análise interna." },
  { t: "Contrato", d: "Conforme a modalidade definida pelo órgão." },
  { t: "Implantação", d: "Prazo combinado na proposta." },
];

const DOCS = [
  { t: "Apresentação institucional", d: "Material para levar ao secretário ou ao prefeito.", acao: "Baixar" },
  { t: "Ficha técnica", d: "Requisitos e integrações", acao: "Baixar" },
  { t: "Atestados", d: "Disponíveis e autorizados", acao: "Solicitar" },
  { t: "Modelo de referência", d: "Se o jurídico autorizar", acao: "Solicitar" },
  { t: "Segurança e LGPD", d: "Políticas e práticas", acao: "Baixar" },
  { t: "Registros e certidões", d: "Somente documentos vigentes", acao: "Solicitar" },
];

const DEPOIS = [
  { t: "Migração", d: "Dados, sistemas e responsabilidades de cada lado.", i: "interop" },
  { t: "Treinamento", d: "Formato, público e carga horária para a equipe.", i: "pessoas" },
  { t: "Suporte e continuidade", d: "Canais, prazos e passagem em troca de gestão.", i: "chat" },
];

const FAQ = [
  { p: "Posso começar com um produto e ampliar depois?", r: "Sim. A contratação pode começar pelos produtos prioritários." },
  { p: "O valor depende do tamanho do município?", r: "Sim. O serviço é dimensionado de acordo com o porte e os produtos escolhidos." },
];

export default function ComoContratar() {
  return (
    <Layout titulo="Como contratar" headerOverlay>
      <HeroCor
        crumbs={[{ label: "Início", to: BASE }, { label: "Como contratar" }]}
        rotulo="Como contratar"
        titulo="Como contratar o Cidade Conectada"
        texto="Tudo o que sua equipe precisa saber sobre formato, preço, documentos e implantação."
        acoes={<>
          <Link className="btn btn--primary" to={`${BASE}/demonstracao?produtos=completa`}>Solicitar proposta</Link>
          <a className="btn btn--ghost" href="#documentos">Ver documentos</a>
        </>}
        arte={<CaminhoContrato />}
      />

      <Secao titulo={<>Como o valor<br />é definido.</>} texto="Sem tabela única: a proposta considera três critérios.">
        <div className="in-three">
          {VALOR.map((v, i) => (
            <div key={v.t} className="in-pain in-pain--big">
              <span className="in-pain__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="in-cross__ico"><Icone nome={v.i} /></span>
              <strong>{v.t}</strong>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
        <Pendencias itens={["Definir se haverá faixa de preço ou simulador público"]} />
      </Secao>

      <Secao titulo={<>Do primeiro contato<br />ao início.</>} texto="Seis etapas, conduzidas junto com a equipe da prefeitura.">
        <ol className="in-path">
          {CAMINHO.map((c, i) => (
            <li key={c.t} style={{ "--d": `${i * 80}ms` }}>
              <span className="in-path__n">{i + 1}</span>
              <strong>{c.t}</strong>
              <p>{c.d}</p>
            </li>
          ))}
        </ol>
        <Pendencias itens={["Prazo real de implantação", "Modalidades de contratação aplicáveis, com revisão do jurídico (Lei 14.133/2021)"]} />
      </Secao>

      <Secao id="documentos" titulo={<>Documentos para<br />a sua análise.</>} texto="O que compras e jurídico precisam para avaliar a contratação.">
        <ul className="in-docs">
          {DOCS.map((d) => (
            <li key={d.t}>
              <span className="in-docs__ico"><Icone nome="arquivo" /></span>
              <div><strong>{d.t}</strong><small>{d.d}</small></div>
              <span className="in-docs__act">{d.acao} <Icone nome={d.acao === "Baixar" ? "materiais" : "seta"} size={14} /></span>
            </li>
          ))}
        </ul>
        <Pendencias itens={["Arquivos de cada documento"]} />
      </Secao>

      <Secao titulo={<>Depois da<br />assinatura.</>} texto="Implantação, migração e suporte com a mesma equipe do começo ao fim.">
        <div className="in-three">
          {DEPOIS.map((d, i) => (
            <div key={d.t} className="in-pain in-pain--big">
              <span className="in-pain__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="in-cross__ico"><Icone nome={d.i} /></span>
              <strong>{d.t}</strong>
              <p>{d.d}</p>
            </div>
          ))}
        </div>
        <Pendencias itens={["Como funcionam migração, treinamento e suporte (formato, carga horária, canais e prazos)"]} />
      </Secao>

      <Secao titulo={<>Dúvidas sobre<br />contratação.</>} texto="Respostas sempre visíveis.">
        <dl className="in-faq">{FAQ.map((q) => <div key={q.p}><dt>{q.p}</dt><dd>{q.r}</dd></div>)}</dl>
        <Pendencias itens={["Qual modalidade a prefeitura deve usar? (resposta revisada pelo jurídico)"]} />
      </Secao>

      <CtaFinal titulo="Precisa de uma proposta para sua cidade?" texto={null} rotuloBotao="Solicitar proposta" hrefBotao={`${BASE}/demonstracao?produtos=completa`} completo={false} />
    </Layout>
  );
}
