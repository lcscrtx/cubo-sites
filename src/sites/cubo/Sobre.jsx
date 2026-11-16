import Layout, { FALE, VAGAS } from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { HeroCor, Secao, Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { Cartoes, OutrosProdutos } from "../comum/Blocos.jsx";
import { Ecossistema } from "../comum/Cenas.jsx";
import CtaFinal from "../cidade-conectada/sections/CtaFinal.jsx";
import { CONTATO } from "../../ds/contato.js";
import "./cubo.css";

// Sobre a Cubo (quadro "Cubo Tecnologia · Sobre" do wireframe).
// Só entra o que é real; o resto fica nas notas "A confirmar pela Cubo".

const MARCOS = [
  { ano: "Setembro de 2023", t: "João Pessoa na Palma da Mão entra no ar", d: "O aplicativo de serviços da capital paraibana, feito com o Cidade Conectada." },
  { ano: "2025", t: "Mais de 188 mil demandas em um ano", d: "Quase 80% concluídas, com mais de 600 serviços disponíveis." },
  { ano: "Abril de 2026", t: "Mais de 450 mil usuários", d: "O app se consolida como um dos principais canais de atendimento da cidade." },
  { ano: null, t: "Cidade Zero Papel e Legislativo Conectado", d: "O portfólio cresce para processos internos e para o Legislativo." },
];

const CONFORMIDADE = [
  { icone: "cadeado", t: "Proteção de dados", d: "Tratamento de dados pessoais orientado pela LGPD, do aplicativo ao processo interno." },
  { icone: "balanca", t: "Ética e conduta", d: "Relação com o poder público pautada pela legislação de contratações e pela transparência." },
  { icone: "check", t: "Certificações", d: "Selos e certificações comprovados, publicados aqui assim que disponíveis." },
];

const LUGARES = [
  { c: "João Pessoa", uf: "PB", sede: true },
  { c: "Campina Grande", uf: "PB" },
  { c: "Cabedelo", uf: "PB" },
  { c: "Feira de Santana", uf: "BA" },
];

/** Nordeste em quadradinhos: Paraíba e Bahia acesas, sede pulsando. Esquema, não mapa em escala. */
function MapaNordeste() {
  // grade 9x8; 1 = estado do Nordeste, 2 = PB, 3 = BA
  const G = [
    "000111110",
    "001111111",
    "011111112",
    "011111122",
    "001133311",
    "001333310",
    "000333300",
    "000033000",
  ];
  return (
    <svg viewBox="0 0 270 240" role="img" aria-label="Paraíba e Bahia destacadas no mapa do Nordeste">
      {G.flatMap((row, y) => row.split("").map((v, x) => v !== "0" && (
        <rect key={`${x}-${y}`} x={x * 30 + 2} y={y * 30 + 2} width="26" height="26" rx="6"
          fill={v === "1" ? "var(--white)" : "var(--blue)"} />
      )))}
      <circle cx={8 * 30 + 15} cy={2 * 30 + 15} r="7" fill="var(--white)" />
      <circle cx={8 * 30 + 15} cy={2 * 30 + 15} r="7" fill="none" stroke="var(--white)" strokeWidth="2" className="cb-pulse" />
    </svg>
  );
}

export default function Sobre() {
  return (
    <Layout titulo="Sobre" headerOverlay>
      <HeroCor
        crumbs={[{ label: "Início", to: "/" }, { label: "Sobre a Cubo" }]}
        rotulo="Entre a prefeitura e o cidadão, a gente."
        titulo="Transformamos desafios em inovação para as cidades."
        texto="Unimos tecnologia e eficiência para descomplicar a gestão pública e melhorar a vida dos cidadãos."
        acoes={<>
          <a className="btn btn--primary" href="/#produtos">Conhecer produtos</a>
          <a className="btn btn--ghost" href="#historia">Nossa história</a>
        </>}
        arte={<Ecossistema />}
      />

      <Secao id="historia" titulo={<>Nossa<br />história.</>} texto="Marcos de quem coloca a prefeitura na palma da mão do cidadão.">
        <ol className="cb-line">
          {MARCOS.map((m) => (
            <li key={m.t}>
              <span className={`cb-line__ano ${m.ano ? "" : "cb-line__ano--ph"}`}>{m.ano ?? "Em breve"}</span>
              <div><strong>{m.t}</strong><p>{m.d}</p></div>
            </li>
          ))}
        </ol>
        <Pendencias itens={["Ano e história da fundação da Cubo", "Ano de lançamento do Cidade Conectada, do Cidade Zero Papel e do Legislativo Conectado", "Próximo ciclo: expansão e visão de futuro"]} />
      </Secao>

      <Secao titulo={<>O que<br />nos move.</>} texto="Propósito e missão que orientam cada produto da Cubo.">
        <div className="cb-id">
          <article><small>Propósito</small><p>Trazer o governo para a era digital e descomplicar a vida das pessoas.</p></article>
          <article><small>Missão</small><p>Descomplicar problemas e facilitar processos.</p></article>
        </div>
        <Pendencias itens={["Visão", "Valores da Cubo"]} />
      </Secao>

      <Secao titulo={<>Onde a<br />Cubo está.</>} texto="Sede em João Pessoa (PB) e cidades atendidas no Nordeste.">
        <div className="cb-map">
          <div className="cb-map__art"><MapaNordeste /></div>
          <div className="cb-map__list">
            <ul>
              {LUGARES.map((l) => (
                <li key={l.c} className={l.sede ? "is-sede" : ""}>
                  <span className="cx-card__ico" style={{ marginBottom: 0, width: 36, height: 36 }}><Icone nome={l.sede ? "mapa" : "predio"} size={18} /></span>
                  <strong>{l.c}</strong>
                  <small>{l.sede ? `Sede · ${l.uf}` : l.uf}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Pendencias itens={["Lista completa de cidades e estados atendidos", "Parceiros regionais, se houver"]} />
      </Secao>

      <Secao id="conformidade" titulo={<>Ética, segurança<br />e transparência.</>} texto="Compromissos de quem trabalha com dados e serviços públicos.">
        <Cartoes itens={CONFORMIDADE} />
        <Pendencias itens={["Política de privacidade e contato do encarregado de dados", "Código de conduta e canal de denúncias, se houver", "Certificações comprovadas", "Liderança: fotos, nomes e cargos"]} />
      </Secao>

      <OutrosProdutos titulo={<>Conheça nossos<br />produtos.</>} texto="Cidade Conectada, Cidade Zero Papel e Legislativo Conectado." />

      <Secao>
        <div className="cx-faixa cb-careers">
          <div>
            <h2>Trabalhe na Cubo.</h2>
            <p>Faça parte do time que constrói cidades mais inteligentes.</p>
            {VAGAS && <a className="btn btn--primary" href={VAGAS} target="_blank" rel="noreferrer">Ver vagas</a>}
          </div>
          <div className="cb-careers__card">
            <span className="cx-card__ico"><Icone nome="pessoas" size={22} /></span>
            <strong>Equipe em João Pessoa (PB)</strong>
            <address>{CONTATO.endereco[0]}<br />{CONTATO.endereco[3]}</address>
          </div>
        </div>
      </Secao>

      <CtaFinal id="contato" titulo="Vamos transformar a gestão da sua cidade?" texto={null} acoes={<a className="btn btn--light" href={FALE}>Falar com nossa equipe</a>} />
    </Layout>
  );
}
