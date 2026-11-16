import { Link } from "react-router-dom";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";
import { ARTES } from "../sections/ProdutoArt.jsx";
import { HeroCor, Secao, Pendencias, LinkSeta } from "./partes.jsx";
import { CrescimentoJP } from "./HeroArtes.jsx";
import "../sections/Produtos.css";
import "./pages.css";
import "./internas.css";

// História de João Pessoa (quadro "Cidade Conectada · História de João Pessoa").
// Modelo de história publicado pelo blog; dados e fontes do wireframe.

const NUMEROS = [
  { v: "188.090", r: "demandas em 2025, até a primeira quinzena de dezembro" },
  { v: "Quase 80%", r: "das demandas concluídas" },
  { v: "+600", r: "serviços disponíveis" },
  { v: "+R$ 40 mi", r: "de economia, somando o app e o processo eletrônico usado pela Prefeitura" },
];

const RESULTADOS = [
  "Média mensal de demandas: de 9.566 em 2024 para 15.674 em 2025, alta de 64%",
  "Serviços ativos: de 39 no começo de 2024 para 207 em 2025, chegando a mais de 600",
  "Iluminação pública: 37.580 solicitações em 2025",
  "Cartão SUS: 24.025 emissões e atualizações em 2025",
  "Mais de 450 mil usuários em abril de 2026",
];

const FICHA = [
  ["Início", "Setembro de 2023"],
  ["Disponível em", "Android, iOS e site da Prefeitura"],
  ["Órgãos mais demandados", "Seinfra, SMS, Semob-JP, Sedes e Emlur"],
  ["Produto", "SuperApp de Serviços"],
  ["Processo eletrônico", "Sistema de outro fornecedor, conectado ao app"],
];

const FONTES = [
  "Prefeitura de João Pessoa: crescimento do aplicativo (01/01/2026)",
  "Prefeitura de João Pessoa: usuários e serviços mais procurados (04/04/2026)",
  "Prefeitura de João Pessoa: como funciona o atendimento (21/04/2025)",
];

const OUTRAS = ["Campina Grande", "Cabedelo", "Feira de Santana"];

export default function CasoJoaoPessoa() {
  const { SuperApp, ConectaOS, WhatsApp } = ARTES;
  return (
    <Layout titulo="História de João Pessoa" headerOverlay>
      <HeroCor
        crumbs={[{ label: "Início", to: BASE }, { label: "Histórias de sucesso" }, { label: "João Pessoa" }]}
        rotulo="João Pessoa (PB) · Em uso desde setembro de 2023"
        titulo="Como João Pessoa colocou os serviços da prefeitura na palma da mão"
        texto="Desenvolvido pela Secretaria de Administração em parceria com a Cubo Tecnologia."
        acoes={<>
          <Link className="btn btn--primary" to={`${BASE}/demonstracao`}>Quero o mesmo na minha cidade</Link>
          <a className="btn btn--ghost" href="#historia">Ler a história</a>
        </>}
        arte={<CrescimentoJP />}
      />

      {/* Resultados em destaque */}
      <Secao titulo={<>Resultados<br />em destaque.</>} texto="Números da própria Prefeitura, com fonte e data.">
        <dl className="in-kpis">
          {NUMEROS.map((n) => <div key={n.v}><dd>{n.v}</dd><dt>{n.r}</dt></div>)}
        </dl>
        <p className="in-sec__src">Demandas e conclusão: Prefeitura de João Pessoa, 01/01/2026. Serviços: Cubo Tecnologia.</p>
        <Pendencias itens={["Fonte da soma da economia de R$ 40 milhões"]} />
      </Secao>

      {/* História + ficha */}
      <Secao id="historia" titulo={<>A história.</>} texto="Do atendimento presencial ao aplicativo com mais de 600 serviços.">
        <div className="in-story">
          <div className="in-story__text pg-prose">
            <section>
              <h2>O desafio</h2>
              <p>Muitas demandas do dia a dia precisavam de atendimento presencial no Centro Administrativo Municipal. A meta era tornar o acesso aos serviços mais ágil, sem que o cidadão precisasse sair de casa.</p>
            </section>
            <section>
              <h2>A solução</h2>
              <p>Lançado em 2023, o aplicativo reúne serviços de todas as secretarias, por categorias. O cidadão entra com CPF e data de nascimento, faz o pedido, anexa foto ou vídeo, recebe um protocolo e acompanha o andamento por mensagens.</p>
              <div className="in-story__arts" aria-hidden="true">
                <div className="in-art"><SuperApp /></div>
                <div className="in-art"><WhatsApp /></div>
                <div className="in-art"><ConectaOS /></div>
              </div>
            </section>
            <section>
              <h2>Os resultados</h2>
              <ul className="in-checks">{RESULTADOS.map((r) => <li key={r}><Icone nome="os" size={16} />{r}</li>)}</ul>
            </section>
          </div>

          <aside className="in-story__card">
            <h3>Ficha do projeto</h3>
            <dl>{FICHA.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <Link className="btn btn--primary" to={`${BASE}/demonstracao`}>Quero o mesmo na minha cidade</Link>
          </aside>
        </div>
      </Secao>

      {/* Depoimento */}
      <Secao>
        <blockquote className="in-quote">
          <p>“O aplicativo facilitou a vida de todos os cidadãos. Vinte e quatro horas por dia, qualquer pessoa tem acesso aos serviços da Prefeitura para fazer sua demanda.”</p>
          <cite>Valdo Alves, secretário de Administração de João Pessoa (janeiro de 2026)</cite>
        </blockquote>
      </Secao>

      {/* Fontes */}
      <Secao titulo="Fontes" texto="Para conferir cada número desta história.">
        <ul className="in-sources">{FONTES.map((f) => <li key={f}>{f}</li>)}</ul>
      </Secao>

      {/* Outras histórias */}
      <Secao titulo={<>Veja outras<br />cidades conectadas.</>} texto="Novas histórias entram pelo blog, por cidade e secretaria." acao={<LinkSeta to={`${BASE}/blog`}>Ir para o blog</LinkSeta>}>
        <div className="in-cities">
          {OUTRAS.map((c) => (
            <div key={c} className="in-city">
              <div className="pg-cover" aria-hidden="true"><Icone nome="predio" size={44} /></div>
              <h3>{c}</h3>
              <p className="in-city__soon">Em breve</p>
            </div>
          ))}
        </div>
        <Pendencias itens={["Histórias de Campina Grande, Cabedelo e Feira de Santana", "Fotos reais da cidade e do aplicativo em uso"]} />
      </Secao>

      <CtaFinal titulo="Sua cidade pode ser a próxima" texto={null} completo={false} />
    </Layout>
  );
}
