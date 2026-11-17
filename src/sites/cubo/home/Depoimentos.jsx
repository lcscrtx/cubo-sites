import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import { useInView } from "../../../ds/motion.js";
import { CC_HOME } from "../../comum/marcas.jsx";
import { Pendencias } from "../../cidade-conectada/pages/partes.jsx";
import "./Depoimentos.css";

// Depoimentos seguindo a seção "Leaders trust us. Operators depend on us." do mindcloud.co:
// título numa linha (forte + cinza), cartões cinza claro com o nome da cidade no lugar do logo,
// a fala no meio e quem disse embaixo; o destaque é um cartão escuro de duas colunas.
// Nas laterais, cartões cortados e apagados sugerem que há mais histórias.
// Sem fotos ainda: as iniciais ficam no lugar do retrato.

const DESTAQUE = {
  cidade: "João Pessoa",
  texto: "O aplicativo facilitou a vida de todos os cidadãos. Vinte e quatro horas por dia, qualquer pessoa tem acesso aos serviços da Prefeitura para fazer sua demanda.",
  nome: "Valdo Alves",
  cargo: "Secretário de Administração (jan/2026)",
};

// [CONFIRMAR antes de publicar] fonte, data, cargo à época e autorização de uso destas duas falas
const CICERO = { cidade: "João Pessoa", texto: "“Um marco para a gestão.”", nome: "Cícero Lucena", cargo: "Prefeito de João Pessoa" };
const VITOR = { cidade: "Cabedelo", texto: "Destacou a agilidade nos processos e o alívio para as secretarias de maior demanda.", nome: "Vitor Hugo Castelliano", cargo: "Ex-prefeito de Cabedelo" };

const iniciais = (nome) => nome.split(" ").filter((p) => p.length > 2).slice(0, 2).map((p) => p[0]).join("");

function Cartao({ cidade, texto, nome, cargo, rd }) {
  return (
    <figure className="dp-card reveal" style={{ "--rd": rd }}>
      <span className="dp-card__logo">{cidade}</span>
      <blockquote><p>{texto}</p></blockquote>
      <figcaption className="dp-quem">
        <span className="dp-quem__av" aria-hidden="true">{iniciais(nome)}</span>
        <span><strong>{nome}</strong><small>{cargo}</small></span>
      </figcaption>
    </figure>
  );
}

export default function Depoimentos() {
  const [ref, on] = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} className={`dp js-reveal ${on ? "is-in" : ""}`}>
      <div className="container">
        <div className="dp__head reveal">
          <span className="dp__selo">Depoimentos</span>
          <h2 className="dp__title"><b>Quem usa, recomenda.</b><br />Quem decide, confia.</h2>
        </div>

        <div className="dp__grid">
          <span className="dp__ghost dp__ghost--l" aria-hidden="true" />
          <span className="dp__ghost dp__ghost--r" aria-hidden="true" />

          <Cartao {...CICERO} rd="80ms" />

          <figure className="dp-card dp-card--destaque reveal" style={{ "--rd": "140ms" }}>
            <span className="dp-card__logo">{DESTAQUE.cidade}</span>
            <blockquote><p>“{DESTAQUE.texto}”</p></blockquote>
            <figcaption className="dp-card__assina"><strong>{DESTAQUE.nome}</strong><i>/</i>{DESTAQUE.cargo}</figcaption>
          </figure>

          <Cartao {...VITOR} rd="200ms" />

          <Link className="dp-card dp-card--link reveal" style={{ "--rd": "260ms" }} to={`${CC_HOME}/clientes/joao-pessoa`}>
            <span className="dp-card__logo">João Pessoa na Palma da Mão</span>
            <p className="dp-card__num">+450 mil</p>
            <p className="dp-card__sub">usuários do aplicativo de serviços em abril de 2026, com mais de 600 serviços da prefeitura no celular.</p>
            <span className="dp-card__go">Ler a história <Icone nome="seta" size={14} /></span>
          </Link>

          <a className="dp-card dp-card--link reveal" style={{ "--rd": "320ms" }} href="#contato">
            <span className="dp-card__logo">Sua cidade</span>
            <p className="dp-card__sub dp-card__sub--grande">Sua cidade pode ser a próxima história. Fale com a equipe da Cubo e descubra por onde começar.</p>
            <span className="dp-card__go">Falar com a equipe <Icone nome="seta" size={14} /></span>
          </a>
        </div>

        <Pendencias itens={["Fonte, data e autorização das falas de Cícero Lucena e Vitor Hugo Castelliano", "Fotos dos depoentes"]} />
      </div>
    </section>
  );
}
