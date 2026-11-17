import { Link } from "react-router-dom";
import Layout from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { CONTATO } from "../../ds/contato.js";
import { abrirPreferencias } from "../../ds/Cookies.jsx";
import { Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { PRODUTOS_CUBO } from "../comum/marcas.jsx";
import { Topo } from "./paginas/partes.jsx";
import "./cubo.css";

// Páginas institucionais da Cubo: 404, Acesso do cliente, Política de Privacidade (com a de cookies) e Termos de uso.
// Privacidade e Termos são MINUTAS: o texto descreve só o que o site faz hoje (formulário que abre o e-mail,
// escolha de cookies guardada no navegador, fontes do Google, hospedagem na Vercel). Razão social, CNPJ,
// encarregado de dados, prazos e foro ficam com o marcador amarelo até a Cubo e o jurídico revisarem.

/* ===== 404 ===== */
export function NaoEncontrada() {
  return (
    <Layout titulo="Página não encontrada">
      <section className="nf">
        <div className="container nf__inner">
          <span className="sb-selo">Página não encontrada</span>
          <h1>Até o amanhã precisa do endereço certo.</h1>
          <p>Esta página pode ter mudado de endereço ou o link está incompleto. Volte ao início para conhecer a Cubo ou fale com nossa equipe.</p>
          <div className="pg-acoes">
            <Link className="st__btn" to="/">Voltar ao início</Link>
            <Link className="pg-btn" to="/contato">Falar com a Cubo</Link>
          </div>
          <ul className="nf__atalhos">
            {[["/solucoes", "Soluções"], ["/sobre", "Sobre a Cubo"], ["/carreiras", "Carreiras"], ["/blog", "Blog"]].map(([h, t]) => (
              <li key={h}><Link to={h}>{t} <Icone nome="seta" size={14} /></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

/* ===== Acesso do cliente ===== */
export function Acesso() {
  return (
    <Layout titulo="Acesso do cliente">
      <Topo
        selo="Acesso do cliente"
        titulo="Entre no sistema do seu produto."
        texto="Prefeituras, câmaras e equipes que já usam as soluções da Cubo acessam por aqui o ambiente de cada produto."
        acoes={<Link className="pg-btn" to="/contato">Preciso de ajuda para entrar</Link>}
      />
      <section className="ac">
        <div className="container">
          <ul className="ac__grid">
            {PRODUTOS_CUBO.map((p) => (
              <li key={p.nome} className="ac__card">
                <span className="ac__nome">{p.nome}</span>
                <p>{p.objetivoTexto}</p>
                <div className="ac__pe">
                  <span className="ph">Endereço do ambiente de acesso</span>
                  <a className="ac__site" href={p.href}>Conhecer o produto <Icone nome="seta" size={14} /></a>
                </div>
              </li>
            ))}
          </ul>
          <Pendencias itens={["Endereço de login de cada produto (painel da prefeitura, da câmara e do servidor)", "Canal de suporte para quem perdeu o acesso"]} />
        </div>
      </section>
    </Layout>
  );
}

/* ===== Documento legal (Privacidade, Termos) ===== */
function Documento({ selo, titulo, resumo, secoes }) {
  return (
    <section className="dl">
      <div className="container dl__inner">
        <aside className="dl__indice">
          <span className="sb-selo">{selo}</span>
          <nav aria-label="Seções">
            <ol>{secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.t}</a></li>)}</ol>
          </nav>
        </aside>
        <article className="dl__texto">
          <p className="dl__minuta"><span className="ph">Minuta para revisão do jurídico da Cubo</span></p>
          <h1>{titulo}</h1>
          <p className="dl__resumo">{resumo}</p>
          <p className="dl__data">Última atualização: <span className="ph">data da versão aprovada</span></p>
          {secoes.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.t}</h2>
              {s.c}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}

const CONTROLADOR = <>Cubo Tecnologia, <span className="ph">razão social</span>, CNPJ <span className="ph">CNPJ</span>, com sede em {CONTATO.endereco.join(", ")}.</>;

export function Privacidade() {
  const secoes = [
    { id: "quem", t: "Quem trata os dados", c: <p>Os dados pessoais recebidos por este site são tratados por {CONTROLADOR}</p> },
    {
      id: "dados",
      t: "Quais dados recebemos",
      c: <>
        <p>Pelo formulário de contato: nome, e-mail, telefone (opcional), órgão ou organização, cargo ou área (opcional), município e UF, assunto e a mensagem escrita por você.</p>
        <p>Pelos canais diretos: o que você nos envia por e-mail, WhatsApp, Instagram ou LinkedIn.</p>
        <p>Pela navegação: dados técnicos de acesso, como endereço IP, navegador e páginas visitadas, registrados pelos serviços que mantêm o site no ar (veja "Com quem compartilhamos").</p>
      </>,
    },
    {
      id: "uso",
      t: "Para que usamos",
      c: <ul>
        <li>Responder ao seu contato e conversar sobre as soluções da Cubo.</li>
        <li>Encaminhar o assunto para a equipe responsável (comercial, técnica, parcerias ou imprensa).</li>
        <li>Manter o site funcionando com segurança.</li>
      </ul>,
    },
    { id: "base", t: "Base legal", c: <p><span className="ph">Bases legais de cada finalidade (art. 7º da LGPD)</span></p> },
    {
      id: "compartilhamento",
      t: "Com quem compartilhamos",
      c: <>
        <p>Não vendemos dados pessoais. Para o site funcionar, alguns serviços recebem dados técnicos de acesso:</p>
        <ul>
          <li>Vercel, que hospeda o site.</li>
          <li>Google Fonts, que entrega as fontes usadas nas páginas.</li>
        </ul>
        <p>O formulário de contato abre o seu próprio programa de e-mail com a mensagem pronta. O envio passa pelo seu provedor de e-mail e chega ao e-mail da Cubo.</p>
        <p><span className="ph">Outros operadores e compartilhamentos, se houver</span></p>
      </>,
    },
    { id: "retencao", t: "Por quanto tempo guardamos", c: <p><span className="ph">Prazo de guarda das mensagens de contato e critério de exclusão</span></p> },
    {
      id: "direitos",
      t: "Seus direitos",
      c: <>
        <p>Pela Lei Geral de Proteção de Dados (Lei 13.709/2018, art. 18), você pode pedir:</p>
        <ul>
          <li>confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
          <li>portabilidade;</li>
          <li>eliminação dos dados tratados com base no seu consentimento;</li>
          <li>informação sobre com quem compartilhamos os dados;</li>
          <li>informação sobre a possibilidade de não consentir e suas consequências;</li>
          <li>revogação do consentimento.</li>
        </ul>
      </>,
    },
    {
      id: "cookies",
      t: "Política de Cookies",
      c: <>
        <p>Cookies e tecnologias parecidas guardam pequenas informações no seu navegador.</p>
        <p><strong>Essenciais.</strong> Guardam a sua escolha sobre cookies, para o aviso não aparecer a cada página. Ficam sempre ativos.</p>
        <p><strong>Medição e desempenho (opcionais).</strong> Servem para entender, de forma agregada, como o site é usado. Hoje o site não carrega nenhum cookie desse tipo. Se passar a carregar, eles só serão ativados com a sua permissão.</p>
        <p>Você pode rever a sua escolha quando quiser: <button type="button" className="dl__link" onClick={abrirPreferencias}>gerenciar cookies</button>.</p>
        <p><span className="ph">Inventário de cookies confirmado pela Cubo</span></p>
      </>,
    },
    {
      id: "contato",
      t: "Fale sobre seus dados",
      c: <>
        <p>Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a Cubo.</p>
        <p>Encarregado de dados (DPO): <span className="ph">nome e canal do encarregado</span></p>
        <p>Enquanto o canal não é definido: <a href={`mailto:${CONTATO.email}?subject=${encodeURIComponent("Dados pessoais")}`}>{CONTATO.email}</a>.</p>
      </>,
    },
    { id: "mudancas", t: "Mudanças nesta política", c: <p>Esta política pode ser atualizada. A data da versão em vigor fica no início da página.</p> },
  ];
  return (
    <Layout titulo="Política de Privacidade">
      <Documento
        selo="Privacidade"
        titulo="Política de Privacidade"
        resumo="Como a Cubo trata os dados pessoais recebidos por este site e pelos canais de contato, e como você exerce os seus direitos."
        secoes={secoes}
      />
    </Layout>
  );
}

export function Termos() {
  const secoes = [
    { id: "aceite", t: "Sobre estes termos", c: <p>Estes termos valem para o uso dos sites institucionais da Cubo e de seus produtos (Cidade Conectada, Cidade Zero Papel e Legislativo Conectado). Os sistemas contratados seguem os seus próprios contratos.</p> },
    { id: "conteudo", t: "O que o site apresenta", c: <p>As informações deste site apresentam a atuação institucional da Cubo. Escopo, prazos e condições de fornecimento são definidos nos instrumentos aplicáveis a cada contratação.</p> },
    { id: "propriedade", t: "Marcas e conteúdo", c: <p>Marcas, logotipos, textos, ilustrações e código deste site pertencem à Cubo Tecnologia ou são usados com autorização. Não podem ser copiados ou usados sem permissão prévia.</p> },
    { id: "links", t: "Links para outros sites", c: <p>O site tem links para serviços de terceiros, como WhatsApp, Instagram, LinkedIn e Google Maps. Esses serviços têm termos e políticas próprios.</p> },
    { id: "privacidade", t: "Privacidade", c: <p>O tratamento de dados pessoais está descrito na <Link to="/privacidade">Política de Privacidade</Link>.</p> },
    { id: "foro", t: "Lei aplicável e foro", c: <p>Estes termos seguem a lei brasileira. Foro: <span className="ph">comarca definida pelo jurídico</span></p> },
    { id: "mudancas", t: "Mudanças nestes termos", c: <p>Estes termos podem ser atualizados. A data da versão em vigor fica no início da página.</p> },
  ];
  return (
    <Layout titulo="Termos de uso">
      <Documento
        selo="Termos"
        titulo="Termos de uso"
        resumo="As regras para usar os sites da Cubo Tecnologia e de seus produtos."
        secoes={secoes}
      />
    </Layout>
  );
}
