import { Link } from "react-router-dom";
import Layout, { FALE } from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { useInView } from "../../ds/motion.js";
import { CONTATO } from "../../ds/contato.js";
import { Pendencias } from "../cidade-conectada/pages/partes.jsx";
import Cta from "./home/Cta.jsx";
import { Topo, Cabeca } from "./paginas/partes.jsx";
import "./cubo.css";

// Soluções: as frentes de atuação da Cubo, com o texto do documento de conteúdo (conteudo-site-cubo-tecnologia.md).
// Cada frente mostra o problema, como a Cubo resolve e três ganhos. O que o documento marca como [CONFIRMAR]
// fica nas notas "A confirmar pela Cubo" de cada frente, sem promessa no texto.

const FRENTES = [
  {
    id: "servicos",
    icone: "app",
    selo: "Acesso ao cidadão",
    titulo: "O serviço público mais perto de quem precisa.",
    problema: "Quando cada serviço exige um caminho diferente, o cidadão perde tempo procurando orientação. Para a equipe pública, informações dispersas dificultam a organização do atendimento.",
    resolve: "Plataformas próprias que combinam aplicativo do cidadão, atendimento por múltiplos canais e fluxos digitais, com mais de 600 tipos de serviço. Os serviços de cada município dependem do escopo contratado.",
    ganhos: [
      ["Acesso mais claro", "Serviços e orientações reunidos em canais digitais."],
      ["Atendimento organizado", "Demandas tratadas em fluxos definidos para cada serviço."],
      ["Identidade do município", "Personalização com a identidade visual da cidade."],
    ],
    produto: { label: "Cidade Conectada", href: "/cidade-conectada" },
  },
  {
    id: "processos",
    icone: "arquivo",
    selo: "Rotina da gestão",
    titulo: "Processos claros para o trabalho avançar.",
    problema: "Papéis, registros dispersos e etapas pouco claras dificultam o acompanhamento do trabalho. O servidor precisa localizar informações e entender o que cada demanda exige.",
    resolve: "Sistemas de gestão e processos internos, com tecnologia própria e portal do servidor. As etapas, as áreas envolvidas e as regras seguem as necessidades do órgão.",
    ganhos: [
      ["Rotina estruturada", "Etapas e responsabilidades definidas para os processos atendidos."],
      ["Informação organizada", "Registros digitais que apoiam o trabalho das equipes."],
      ["Menos papel", "Os fluxos incluídos no projeto passam a correr em meio digital."],
    ],
    pendencias: ["Recursos de tramitação, permissões, registros e documentos de cada solução"],
    produto: { label: "Cidade Zero Papel", href: "/cidade-zero-papel" },
  },
  {
    id: "dados",
    icone: "painel",
    selo: "Decisão com contexto",
    titulo: "Enxergue as demandas para orientar as decisões.",
    problema: "Quando a informação chega fragmentada, fica mais difícil compreender as demandas e identificar o que merece atenção. A gestão precisa de contexto para agir.",
    resolve: "As plataformas incluem painel de gestão em tempo real para acompanhamento pelo prefeito. Os dados exibidos dependem dos serviços implantados e do que é registrado nos sistemas.",
    ganhos: [
      ["Visão da operação", "Informações dos serviços reunidas para acompanhamento."],
      ["Prioridades com contexto", "Dados que ajudam a orientar a análise das demandas."],
      ["Diálogo entre equipes", "Uma referência comum para discutir os próximos passos."],
    ],
    pendencias: ["Indicadores, filtros, fontes externas, exportações e frequência de atualização"],
  },
  {
    id: "apps",
    icone: "app",
    selo: "Governo no celular",
    titulo: "Serviços públicos que cabem na rotina.",
    problema: "O cidadão precisa encontrar serviços e orientações em meio às tarefas do dia. Quando o acesso é difícil, uma necessidade simples exige mais esforço do que deveria.",
    resolve: "Aplicativos próprios, com experiência em aplicativo do cidadão usado por prefeituras. Serviços e conteúdos são definidos conforme o município e o escopo do projeto.",
    ganhos: [
      ["Acesso pelo celular", "Mais um canal para os serviços incluídos no aplicativo."],
      ["Experiência contextualizada", "Funcionalidades pensadas para o público atendido."],
      ["Identidade local", "Personalização com a identidade visual do município."],
    ],
    pendencias: ["Sistemas operacionais, requisitos de acesso e funcionalidades disponíveis"],
  },
  {
    id: "integracoes",
    icone: "interop",
    selo: "Sistemas em diálogo",
    titulo: "Conectar sistemas para apoiar o trabalho público.",
    problema: "Informações em sistemas diferentes exigem consultas separadas e repetição de registros. Conectar essas ferramentas depende de condições técnicas e de autorização para compartilhar os dados.",
    resolve: "Avaliamos conexões entre as nossas soluções e outros sistemas. Cada possibilidade passa por análise de viabilidade, documentação, interfaces disponíveis e acessos autorizados.",
    ganhos: [
      ["Fluxos mais contínuos", "Informação compartilhada entre sistemas quando a integração for viável."],
      ["Menos repetição", "Menos registros duplicados nas rotinas contempladas."],
      ["Escopo definido", "Condições, responsabilidades e limites claros antes da execução."],
    ],
    pendencias: ["Oferta de integração, sistemas compatíveis, dependências de terceiros e escopo"],
  },
  {
    id: "nuvem",
    icone: "nuvem",
    selo: "Base para operar",
    titulo: "A operação digital precisa de uma base bem definida.",
    problema: "Serviços digitais dependem de infraestrutura adequada ao uso previsto e de cuidado com os dados. Sem requisitos e responsabilidades definidos, a gestão perde clareza sobre a operação.",
    resolve: "A Cubo reúne desenvolvimento de software e atuação técnica em infraestrutura em nuvem. As condições de cada projeto são detalhadas com a equipe técnica do órgão.",
    ganhos: [
      ["Requisitos explícitos", "Infraestrutura e segurança discutidas com a equipe técnica do órgão."],
      ["Responsabilidades definidas", "Atribuições sobre operação e dados registradas no escopo."],
      ["Compromissos verificáveis", "Níveis de serviço estabelecidos conforme a solução e o contrato."],
    ],
    pendencias: ["Provedor, hospedagem, controles de acesso, cópias de segurança, monitoramento e resposta a incidentes", "SLAs, disponibilidade e responsabilidades relativas à LGPD"],
  },
  {
    id: "implantacao",
    icone: "pessoas",
    selo: "Pessoas e continuidade",
    titulo: "A tecnologia precisa fazer sentido para quem usa.",
    problema: "Uma ferramenta pode estar disponível sem que a equipe saiba como incorporá-la à rotina. Dúvidas de uso e mudanças nos processos precisam de orientação.",
    resolve: "A Cubo conta com profissionais de suporte e atendimento. Implantação, capacitação e suporte são definidos conforme o projeto.",
    ganhos: [
      ["Entrada em operação planejada", "Atividades e dependências da implantação alinhadas."],
      ["Orientação para as equipes", "Capacitação conforme os públicos e as rotinas atendidas."],
      ["Referência para dúvidas", "Canais e responsabilidades de suporte definidos."],
    ],
    pendencias: ["Etapas de implantação, formatos e carga horária da capacitação", "Canais de suporte, horários e prazos de resposta"],
  },
];

const SUSTENTA = [
  ["nuvem", "Nuvem", "A infraestrutura considera o uso previsto e as necessidades do órgão."],
  ["cadeado", "Segurança", "Acesso e tratamento de dados com critérios claros."],
  ["grade", "Escalabilidade", "O projeto avalia como a operação acompanha mudanças na demanda."],
  ["app", "Mobile", "Aplicativos como canal de acesso aos serviços pelo celular."],
  ["painel", "Dados", "As informações registradas nas plataformas apoiam o acompanhamento da gestão."],
];

function Indice() {
  return (
    <nav className="so-indice" aria-label="Frentes de atuação">
      <div className="container">
        <ul>
          {FRENTES.map((f) => (
            <li key={f.id}><a href={`#${f.id}`}><Icone nome={f.icone} size={15} />{f.selo}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Frente({ f, i }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  return (
    <article ref={ref} id={f.id} className={`so-frente js-reveal ${on ? "is-in" : ""}`}>
      <div className="so-frente__head reveal">
        <span className="so-frente__num">{String(i + 1).padStart(2, "0")}</span>
        <span className="sb-selo">{f.selo}</span>
        <h2>{f.titulo}</h2>
        {f.produto && (
          <a className="so-frente__prod" href={f.produto.href}>Conheça o {f.produto.label} <Icone nome="seta" size={14} /></a>
        )}
      </div>
      <div className="so-frente__body reveal" style={{ "--rd": "100ms" }}>
        <dl className="so-frente__texto">
          <div><dt>O problema</dt><dd>{f.problema}</dd></div>
          <div><dt>Como a Cubo resolve</dt><dd>{f.resolve}</dd></div>
        </dl>
        <ul className="so-ganhos">
          {f.ganhos.map(([t, d]) => (
            <li key={t}><Icone nome="check" size={16} /><span><strong>{t}</strong>{d}</span></li>
          ))}
        </ul>
        <Pendencias itens={f.pendencias} />
      </div>
    </article>
  );
}

function Sustenta() {
  const [ref, on] = useInView({ threshold: 0.25 });
  return (
    <section ref={ref} className={`so-sus js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <Cabeca
          selo="Tecnologia com propósito"
          titulo="O que sustenta o serviço também precisa ser claro."
          texto="A gestão não precisa dominar cada detalhe técnico. Precisa entender como a tecnologia atende à sua realidade e quais compromissos estarão no projeto."
        />
        <ul className="so-sus__grid">
          {SUSTENTA.map(([ic, t, d], i) => (
            <li key={t} className="reveal" style={{ "--rd": `${80 + i * 70}ms` }}>
              <span className="sp__ico"><Icone nome={ic} size={16} /></span>
              <strong>{t}</strong>
              <p>{d}</p>
            </li>
          ))}
        </ul>
        <Pendencias itens={["Documentação técnica disponível", "SLAs e compromissos contratuais por solução"]} />
      </div>
    </section>
  );
}

export default function Solucoes() {
  return (
    <Layout titulo="Soluções">
      <Topo
        selo="Tecnologia para governar"
        titulo="Cada desafio público pede uma solução que faça sentido."
        texto="Desenvolvemos plataformas digitais, sistemas web e aplicativos para o setor público. O escopo de cada projeto considera as prioridades do órgão, sua estrutura e as condições de implantação."
        acoes={<>
          <Link className="st__btn" to="/contato">Agendar uma conversa</Link>
          <Link className="pg-btn" to="/sobre">Conhecer a Cubo</Link>
        </>}
      />
      <Indice />
      <section className="so-lista">
        <div className="container">
          {FRENTES.map((f, i) => <Frente key={f.id} f={f} i={i} />)}
        </div>
      </section>
      <Sustenta />
      <Cta
        semSobre
        titulo={<h2>Qual desafio sua gestão precisa resolver?<br /><span>Vamos conversar.</span></h2>}
        acoes={<>
          <Link className="ct__btn ct__btn--claro" to="/contato">Agendar uma conversa</Link>
          <a className="ct__btn" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={15} />WhatsApp</a>
          <a className="ct__btn" href={FALE}>Enviar e-mail</a>
        </>}
      />
    </Layout>
  );
}
