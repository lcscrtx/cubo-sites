import { Link } from "react-router-dom";
import Layout, { VAGAS } from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { useInView } from "../../ds/motion.js";
import { Pendencias } from "../cidade-conectada/pages/partes.jsx";
import Cta from "./home/Cta.jsx";
import { Topo, Cabeca } from "./paginas/partes.jsx";
import "./cubo.css";

// Carreiras, com o texto do documento de conteúdo (conteudo-site-cubo-tecnologia.md).
// As vagas abrem no LinkedIn da Cubo, que é o canal oficial que a Cubo usa hoje.
// Benefícios, banco de talentos e as etapas oficiais do processo seletivo ainda não foram confirmados:
// ficam com o marcador amarelo ou nas notas, sem texto inventado.

const MOTIVOS = [
  ["Aplicação concreta", "As soluções da Cubo atendem demandas de prefeituras e de seus públicos. Seu conhecimento contribui para o acesso a serviços, a rotina dos servidores e o acompanhamento da gestão."],
  ["Diferentes formas de contribuir", "Há desafios em software, aplicativos, produto, dados, infraestrutura e atendimento. Cada área cuida de uma parte da experiência de quem usa a tecnologia."],
  ["Origem que aproxima", "Somos uma empresa sediada na Paraíba, com tecnologia própria usada por municípios do Nordeste. Essa proximidade com a realidade local faz parte do que construímos."],
];

const AREAS = [
  ["os", "Engenharia", "Software, sistemas web, aplicativos e integrações. Vagas já divulgadas incluem desenvolvimento back-end com PHP e Node.js."],
  ["grade", "Produto", "Entender os problemas, organizar prioridades e acompanhar a evolução das soluções."],
  ["painel", "Dados", "Organização, administração e uso de dados para apoiar as soluções e a gestão."],
  ["nuvem", "Infraestrutura", "Ambientes que sustentam as soluções digitais. Vagas já divulgadas incluem nuvem com AWS."],
  ["chat", "Atendimento e Sucesso do Cliente", "Orientação a usuários, dúvidas e acompanhamento das demandas ligadas às soluções."],
];

const ETAPAS = [
  ["Candidatura", "Envie seu perfil pela página da vaga e confira os requisitos."],
  ["Análise do perfil", "A equipe avalia como sua experiência se conecta à oportunidade."],
  ["Conversa inicial", "Para conhecer sua trajetória, apresentar a vaga e tirar dúvidas."],
  ["Conversa com a área", "Uma troca sobre conhecimentos e situações ligadas à função."],
  ["Retorno", "O resultado e, havendo aprovação, as orientações para a entrada."],
];

function Motivos() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`sb-resolve js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <Cabeca
          selo="Trabalho com propósito"
          titulo="Problemas reais. Conhecimentos que se encontram."
          texto="Trabalhar com tecnologia para o setor público é olhar para o que acontece nas cidades e ajudar a construir respostas digitais."
        />
        <div className="cr-motivos">
          {MOTIVOS.map(([t, d], i) => (
            <article key={t} className="sb-card reveal" style={{ "--rd": `${80 + i * 70}ms` }}>
              <strong>{t}</strong>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} id="areas" className={`cr-areas js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <Cabeca
          selo="Onde você contribui"
          titulo="Diferentes conhecimentos. Desafios compartilhados."
          texto="As áreas ligadas ao desenvolvimento e à sustentação das soluções da Cubo. As vagas de cada área dependem das oportunidades abertas."
        />
        <ul className="cr-areas__lista">
          {AREAS.map(([ic, t, d], i) => (
            <li key={t} className="reveal" style={{ "--rd": `${60 + i * 60}ms` }}>
              <span className="sp__ico"><Icone nome={ic} size={16} /></span>
              <strong>{t}</strong>
              <p>{d}</p>
            </li>
          ))}
        </ul>
        <div className="pg-acoes reveal">
          <a className="st__btn" href={VAGAS} target="_blank" rel="noreferrer">Ver vagas por área</a>
        </div>
      </div>
    </section>
  );
}

function Processo() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`sh js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <Cabeca
          selo="Seu próximo passo"
          titulo="Uma conversa para conhecer experiências e possibilidades."
          texto="O processo ajuda você a conhecer a oportunidade e a Cubo a entender sua experiência, seus conhecimentos e seus interesses."
        />
        <ol className="cr-etapas">
          {ETAPAS.map(([t, d], i) => (
            <li key={t} style={{ "--i": i }}>
              <span className="cr-etapas__n">{i + 1}</span>
              <strong>{t}</strong>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <Pendencias itens={["Etapas oficiais do processo seletivo e variações por vaga", "Existência e formato de avaliação técnica", "Prazos e canal para acompanhar a candidatura"]} />
      </div>
    </section>
  );
}

function Onde() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`cr-onde js-reveal ${on ? "is-in" : ""}`}>
      <div className="container cr-onde__inner">
        <div className="reveal">
          <span className="sb-selo">Onde acontece</span>
          <h2>Confira os detalhes da oportunidade que combina com você.</h2>
          <p>Localização, frequência de atividades presenciais, regime de contratação e requisitos estão na descrição de cada vaga.</p>
        </div>
        <ul className="sp__lista reveal" style={{ "--rd": "120ms" }}>
          <li><span className="sp__ico"><Icone nome="mapa" size={16} /></span><strong>João Pessoa</strong><small>PB</small><em>Sede</em></li>
          <li><span className="sp__ico"><Icone nome="predio" size={16} /></span><strong>Caruaru</strong><small>PE · vagas híbridas já divulgadas</small></li>
        </ul>
      </div>
    </section>
  );
}

function Beneficios() {
  return (
    <section className="cr-benef">
      <div className="container">
        <Cabeca
          selo="Condições e benefícios"
          titulo="Conheça o que acompanha cada oportunidade."
          texto="Benefícios e condições aparecem na descrição da vaga do seu interesse."
        />
        <p className="cr-benef__ph"><span className="ph">Relação oficial de benefícios, elegibilidade e diferenças entre vagas</span></p>
      </div>
    </section>
  );
}

export default function Carreiras() {
  return (
    <Layout titulo="Carreiras">
      <Topo
        selo="Carreiras na Cubo"
        titulo="Seu trabalho pode aproximar o serviço público das pessoas."
        texto="Na Cubo, desenvolvemos tecnologia própria para o setor público. Aplicativos, sistemas web, dados e atendimento fazem parte desse trabalho, e por trás de cada entrega há um problema concreto a resolver."
        acoes={<>
          <a className="st__btn" href={VAGAS} target="_blank" rel="noreferrer">Ver vagas abertas</a>
          <span className="pg-btn pg-btn--ph"><span className="ph">Banco de talentos</span></span>
        </>}
        fatos={[
          ["João Pessoa", "sede da Cubo, na Paraíba"],
          ["5 áreas", "engenharia, produto, dados, infraestrutura e atendimento"],
          ["Própria", "tecnologia, do código ao suporte"],
          ["LinkedIn", "onde a Cubo divulga as vagas"],
        ]}
      />
      <Motivos />
      <Areas />
      <Processo />
      <Beneficios />
      <Onde />
      <Cta
        semSobre
        titulo={<h2>Qual pode ser a sua próxima contribuição?<br /><span>Venha construir com a gente.</span></h2>}
        acoes={<>
          <a className="ct__btn ct__btn--claro" href={VAGAS} target="_blank" rel="noreferrer">Ver vagas abertas</a>
          <Link className="ct__btn" to="/sobre">Sobre a Cubo</Link>
        </>}
      />
    </Layout>
  );
}
