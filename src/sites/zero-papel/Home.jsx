import LayoutSite from "../comum/LayoutSite.jsx";
import Icone from "../../ds/Icone.jsx";
import { CONTATO } from "../../ds/contato.js";
import { HeroCentro, OutrosProdutos, PreviaBlog, Passos, Cartoes } from "../comum/Blocos.jsx";
import { CenaZeroPapel } from "../comum/Cenas.jsx";
import { LogoZeroPapel, PorCubo, CC_HOME, ZP_HOME, LC_HOME } from "../comum/marcas.jsx";
import { Secao, Pendencias } from "../cidade-conectada/pages/partes.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import "./zero-papel.css";

// Home do Cidade Zero Papel (quadro "Cidade Zero Papel · Home" do wireframe).
// Mesma estrutura do Cidade Conectada. Números, clientes e respostas que dependem da Cubo
// ficam fora da página e entram nas notas "A confirmar pela Cubo".

const DEMO = `mailto:${CONTATO.email}?subject=${encodeURIComponent("Demonstração do Cidade Zero Papel")}`;

function Marca() {
  return (
    <a className="mk-brand" href={ZP_HOME} aria-label="Cidade Zero Papel, início">
      <LogoZeroPapel />
      <PorCubo />
    </a>
  );
}

const RECURSOS = [
  { icone: "arquivo", t: "Protocolo eletrônico", d: "O pedido entra digital, com número e data, pelo balcão ou pela internet." },
  { icone: "troca", t: "Tramitação de processos", d: "Cada etapa com responsável e prazo, do setor que recebe ao que decide." },
  { icone: "assinatura", t: "Assinatura eletrônica", d: "Documentos assinados sem imprimir, com registro de quem assinou e quando." },
  { icone: "blog", t: "Gestão de documentos", d: "Ofícios, pareceres e contratos organizados e fáceis de encontrar." },
  { icone: "chat", t: "Comunicação interna", d: "Recados e despachos entre setores sem papel circulando pela prefeitura." },
  { icone: "painel", t: "Relatórios e indicadores", d: "Quantos processos estão em cada etapa e onde o tempo está parando." },
];

const nav = [
  {
    label: "Recursos",
    href: "#recursos",
    itens: RECURSOS.slice(0, 4).map((r) => ({ label: r.t, icone: r.icone, texto: r.d.split(",")[0].replace(/\.$/, ""), href: "#recursos" })),
  },
  { label: "Como funciona", href: "#jornada" },
  { label: "Migração", href: "#migracao" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Blog", href: "/blog" },
];

const topBar = {
  label: "Conheça também:",
  products: [
    { label: "Cidade Conectada", href: CC_HOME },
    { label: "Legislativo Conectado", href: LC_HOME },
  ],
  links: [
    { label: "Cubo Tecnologia", href: "/" },
    { label: "Acesso do cliente", href: "#acesso" },
  ],
};

const colunas = [
  { title: "Produto", links: [{ label: "Recursos", href: "#recursos" }, { label: "Como funciona", href: "#jornada" }, { label: "Migração", href: "#migracao" }, { label: "Segurança", href: "#seguranca" }] },
  { title: "Conteúdo", links: [{ label: "Blog", href: "/blog" }] },
  { title: "Outros produtos Cubo", links: [{ label: "Cidade Conectada", href: CC_HOME }, { label: "Legislativo Conectado", href: LC_HOME }] },
];

const PASSOS = [
  { t: "Protocolo", d: "O processo nasce digital." },
  { t: "Tramitação", d: "Etapas e responsáveis definidos." },
  { t: "Assinatura", d: "Documentos assinados eletronicamente." },
  { t: "Publicidade", d: "Acompanhamento e transparência." },
  { t: "Arquivo", d: "Tudo guardado e rastreável." },
];

const MIGRACAO = [
  { icone: "troca", t: "Migração de dados", d: "O que vem do sistema atual e como, definido junto com a equipe da prefeitura." },
  { icone: "arquivo", t: "Acervo físico", d: "Digitalização do que já existe em papel e uma linha de corte clara." },
  { icone: "pessoas", t: "Treinamento", d: "Para quem protocola, tramita e assina, no ritmo de cada setor." },
  { icone: "balanca", t: "Base legal interna", d: "Decreto ou portaria que oficializa o processo eletrônico na prefeitura." },
];

const SEGURANCA = [
  { icone: "assinatura", t: "Validade jurídica", d: "Base legal e tipo de assinatura de cada documento." },
  { icone: "cadeado", t: "LGPD", d: "Práticas de proteção dos dados pessoais nos processos." },
  { icone: "nuvem", t: "Infraestrutura", d: "Nuvem e cópias de segurança do acervo digital." },
  { icone: "relogio", t: "Rastreabilidade", d: "Quem fez, quando e em que etapa está, em cada processo." },
];

export default function ZeroPapelHome() {
  return (
    <LayoutSite
      site="zero-papel"
      nome="Cidade Zero Papel"
      brand={<Marca />}
      nav={nav}
      topBar={topBar}
      cta={{ label: "Agendar demonstração", href: "#contato" }}
      resumo="Processos eletrônicos, do protocolo ao arquivo."
      colunas={colunas}
      headerOverlay
    >
      <HeroCentro
        rotulo="Entre a prefeitura e o cidadão, a gente."
        titulo="Toda a prefeitura em processos eletrônicos, do protocolo ao arquivo."
        texto="Menos papel dentro da prefeitura, mais agilidade para responder ao cidadão, com tudo rastreável: quem fez, quando e em que etapa está."
        acoes={<>
          <a className="btn btn--light" href={DEMO}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href="#recursos">Conhecer recursos</a>
        </>}
        cena={<CenaZeroPapel />}
      />

      <Passos
        id="jornada"
        titulo={<>Um processo 100% digital<br />de ponta a ponta.</>}
        texto="Do pedido que chega ao documento arquivado, sem imprimir nada no caminho."
        passos={PASSOS}
        rodape={<Pendencias itens={["Validar as etapas reais do processo eletrônico"]} />}
      />

      <Secao id="recursos" titulo={<>Recursos para<br />a rotina da gestão.</>} texto="Tudo o que um processo precisa para andar dentro da prefeitura.">
        <Cartoes itens={RECURSOS} />
        <Pendencias itens={["Descrição real de cada recurso", "Tipo e validade jurídica da assinatura eletrônica", "Confirmar se a comunicação interna existe no produto"]} />
      </Secao>

      <Secao>
        <div className="cx-faixa zp-junto">
          <div>
            <h2>Junto com o Cidade Conectada, o pedido do cidadão já chega como processo.</h2>
            <p>O Cidade Zero Papel pode ser somado ao Cidade Conectada: o que o cidadão pede no app segue digital dentro da prefeitura.</p>
            <a className="btn btn--primary" href={CC_HOME}>Conhecer o Cidade Conectada</a>
          </div>
          <div className="zp-junto__flow" aria-hidden="true">
            <span><Icone nome="app" size={18} />Pedido no app</span>
            <i />
            <span className="is-on"><Icone nome="arquivo" size={18} />Processo eletrônico</span>
            <i />
            <span><Icone nome="check" size={18} />Resposta ao cidadão</span>
          </div>
        </div>
      </Secao>

      <Secao id="migracao" titulo={<>Mudança sem<br />perder o histórico.</>} texto="Para quem já usa outro sistema ou ainda tem o arquivo em papel.">
        <Cartoes itens={MIGRACAO} colunas={4} />
        <Pendencias itens={["Detalhes de migração, acervo, treinamento e base legal", "Três diferenciais reais em relação às alternativas"]} />
      </Secao>

      <Secao id="seguranca" titulo={<>Documentos seguros<br />e rastreáveis.</>} texto="O que garante que o processo digital vale tanto quanto o papel.">
        <Cartoes itens={SEGURANCA} colunas={4} />
        <Pendencias itens={["Base legal e tipo de assinatura", "Práticas de LGPD adotadas", "Nuvem e política de backup"]} />
      </Secao>

      <PreviaBlog
        titulo={<>Conteúdos para<br />a sua gestão.</>}
        texto="Prévia do blog da Cubo, filtrada pelo Cidade Zero Papel."
        vazio={{ titulo: "Primeiros conteúdos do Zero Papel em produção", texto: "Enquanto isso, veja exemplos reais de gestão digital no blog da Cubo." }}
      />

      <OutrosProdutos exceto="zero-papel" titulo={<>Também precisa<br />de outra frente?</>} texto="Outros produtos da Cubo para a gestão pública." />

      <section className="container">
        <Pendencias itens={["Clientes (brasões) ou chamada para cidades-piloto", "Números: processos digitais, documentos assinados, economia e redução no tempo de tramitação", "História de sucesso com depoimento de gestor", "Perguntas frequentes: validade jurídica, implantação, migração e arquivo físico", "Calculadora de economia, só com metodologia própria e comprovável", "Logo oficial do Cidade Zero Papel"]} />
      </section>

      <CtaFinal
        id="contato"
        titulo="Vamos tirar sua prefeitura do papel?"
        texto="Veja o Cidade Zero Papel em ação com um especialista."
        acoes={<>
          <a className="btn btn--light" href={DEMO}>Agendar demonstração</a>
          <a className="btn btn--outline-light" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={16} /> WhatsApp</a>
        </>}
      />
    </LayoutSite>
  );
}
