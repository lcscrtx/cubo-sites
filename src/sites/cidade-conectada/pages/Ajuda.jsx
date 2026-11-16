import { useMemo, useState } from "react";
import Layout, { BASE } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import { CONTATO } from "../../../ds/contato.js";
import { PageHero } from "./partes.jsx";
import "./pages.css";

// Central de ajuda: duas portas, cidadão e prefeitura. Busca filtra as perguntas das duas.
// Só respondemos o que o próprio site já afirma; o resto fica marcado para a Cubo escrever.

const PH = (t = "Resposta a escrever pela Cubo") => <span className="ph">{t}</span>;

const AJUDA = {
  cidadao: [
    {
      titulo: "Fazer um pedido",
      icone: "app",
      perguntas: [
        { p: "Por onde peço um serviço da prefeitura?", r: "Pelo aplicativo da sua cidade ou pelo WhatsApp da prefeitura, quando a cidade oferece esse canal. Você pode anexar foto ou vídeo." },
        { p: "Quais serviços estão disponíveis?", r: "Depende da sua cidade: cada prefeitura escolhe os serviços que oferece no aplicativo." },
        { p: "Preciso criar uma conta?", r: PH() },
      ],
    },
    {
      titulo: "Acompanhar",
      icone: "os",
      perguntas: [
        { p: "Como acompanho o meu pedido?", r: "Todo pedido gera um protocolo. Você acompanha o andamento e recebe mensagens a cada etapa, até a conclusão." },
        { p: "Em quanto tempo meu pedido é atendido?", r: "O prazo depende do serviço e da secretaria responsável pela sua cidade." },
        { p: "Posso cancelar um pedido?", r: PH() },
      ],
    },
    {
      titulo: "Acessibilidade",
      icone: "libras",
      perguntas: [
        { p: "Como falo com a prefeitura em Libras?", r: "Nas cidades que contratam o TeleAtendimento com Libras, o atendimento acontece por vídeo com intérprete." },
        { p: "O aplicativo funciona com leitor de tela?", r: PH() },
      ],
    },
  ],
  prefeitura: [
    {
      titulo: "Contratação",
      icone: "blog",
      perguntas: [
        { p: "Posso contratar apenas alguns produtos?", r: "Sim. Você pode contratar a solução completa ou escolher os produtos de que precisa." },
        { p: "O aplicativo pode ter o nome da minha prefeitura?", r: "Sim. Nome, cores e serviços são definidos de acordo com a sua cidade." },
        { p: "Quais documentos são necessários?", r: PH() },
      ],
    },
    {
      titulo: "Implantação",
      icone: "grade",
      perguntas: [
        { p: "Em quanto tempo o projeto é implementado?", r: PH("Resposta com prazo real") },
        { p: "Há treinamento para os servidores?", r: PH("Resposta com formato e público") },
        { p: "O que acontece com os dados na troca de gestão?", r: PH() },
      ],
    },
    {
      titulo: "Suporte e dados",
      icone: "ajuda",
      perguntas: [
        { p: "Como abro um chamado de suporte?", r: PH("Canais e prazo de atendimento") },
        { p: "Como os dados são protegidos?", r: PH("Resposta real sobre LGPD") },
        { p: "O sistema conversa com o que a prefeitura já usa?", r: "Sim, esse é o papel da Interoperabilidade: integrar os sistemas que a prefeitura já tem." },
      ],
    },
  ],
};

const texto = (r) => (typeof r === "string" ? r : "");
const sem = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Ajuda() {
  const [aba, setAba] = useState("cidadao");
  const [busca, setBusca] = useState("");
  const q = sem(busca.trim());

  // com busca, procura nas duas abas; sem busca, mostra só a aba escolhida
  const categorias = useMemo(() => {
    const fonte = q ? [...AJUDA.cidadao, ...AJUDA.prefeitura] : AJUDA[aba];
    return fonte
      .map((c) => ({ ...c, perguntas: c.perguntas.filter((x) => !q || sem(`${x.p} ${texto(x.r)}`).includes(q)) }))
      .filter((c) => c.perguntas.length);
  }, [aba, q]);

  return (
    <Layout titulo="Central de ajuda">
      <PageHero rotulo="Central de ajuda" titulo="Como podemos ajudar?" texto="Dúvidas de quem usa o aplicativo e de quem gerencia o Cidade Conectada na prefeitura.">
        <div className="pg-help-search">
          <label className="pg-search">
            <Icone nome="busca" size={18} />
            <span className="sr-only">Buscar na central de ajuda</span>
            <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Busque por protocolo, Libras, contratação…" />
          </label>
        </div>
      </PageHero>

      <section className="container pg-section">
        {!q && (
          <div className="pg-tabs" role="tablist" aria-label="Para quem é a ajuda">
            <button type="button" role="tab" aria-selected={aba === "cidadao"} onClick={() => setAba("cidadao")}>Sou cidadão</button>
            <button type="button" role="tab" aria-selected={aba === "prefeitura"} onClick={() => setAba("prefeitura")}>Sou da prefeitura</button>
          </div>
        )}
        {q && <p className="pg-count">{categorias.reduce((n, c) => n + c.perguntas.length, 0)} resultado(s) para “{busca.trim()}”</p>}

        {categorias.length ? (
          <div className="pg-help" key={`${aba}-${q}`}>
            {categorias.map((c, i) => (
              <div key={c.titulo} className="pg-help__cat" style={{ animationDelay: `${i * 70}ms` }}>
                <h3><span><Icone nome={c.icone} size={18} /></span>{c.titulo}</h3>
                <ul>
                  {c.perguntas.map((x) => (
                    <li key={x.p}>
                      <details open={!!q}>
                        <summary>{x.p}</summary>
                        <p>{x.r}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="pg-empty">
            <p>Nada encontrado para “{busca.trim()}”.</p>
            <button type="button" className="btn btn--ghost" onClick={() => setBusca("")}>Limpar busca</button>
          </div>
        )}
      </section>

      <section className="container pg-section">
        <h2 className="pg-h2">Ainda precisa de ajuda?</h2>
        <div className="pg-contact">
          <div>
            <h3>Sou cidadão</h3>
            <p>Pedidos e reclamações sobre serviços são atendidos pela prefeitura da sua cidade, pelo aplicativo ou pelo WhatsApp dela.</p>
          </div>
          <div>
            <h3>Sou da prefeitura</h3>
            <p>Suporte para equipes de cidades clientes.</p>
            {PH("Canal de suporte a confirmar")}
          </div>
          <div>
            <h3>Quero contratar</h3>
            <p>Fale com o time comercial da Cubo.</p>
            <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
            <a href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp {CONTATO.whatsapp.numero}</a>
            <a className="btn btn--primary" href={`${BASE}#demonstracao`} style={{ marginTop: 8 }}>Agendar demonstração</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
