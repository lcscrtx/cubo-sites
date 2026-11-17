import { useState } from "react";
import { Link } from "react-router-dom";
import Icone from "../../../ds/Icone.jsx";
import { PRODUTOS_CUBO, CC_HOME } from "../../comum/marcas.jsx";
import "./HeroMind.css";

// Hero da Cubo na linha do mindcloud.co: degradê do preto ao azul da Cubo que se dissolve no cinza claro,
// selo com a prova de João Pessoa, título em dois tons e, no lugar de uma ilustração, a pergunta
// "Por onde sua instituição quer começar?" com as três respostas levando ao produto certo.
// Embaixo, a faixa com as cidades atendidas, no lugar dos logos de clientes.

const CIDADES = [["João Pessoa", "PB"], ["Campina Grande", "PB"], ["Cabedelo", "PB"], ["Feira de Santana", "BA"]];

export default function HeroMind() {
  const [ativo, setAtivo] = useState(0);
  const p = PRODUTOS_CUBO[ativo];
  return (
    <>
      <section className="hm">
        <div className="hm__bg" aria-hidden="true" />
        <div className="container hm__inner">
          <Link className="hm__badge" to={`${CC_HOME}/clientes/joao-pessoa`}>
            <span>João Pessoa na Palma da Mão: +188 mil demandas em 2025</span>
            <b>Ver história</b>
          </Link>
          <h1>Entre a prefeitura e o cidadão,<br /><span>a gente.</span></h1>
          <p className="hm__lead">
            A Cubo desenvolve soluções digitais que descomplicam a gestão e melhoram a vida dos cidadãos,
            unindo tecnologia e eficiência.
          </p>

          <div className="hm__box">
            <p className="hm__ask">Por onde sua instituição quer começar?</p>
            <div className="hm__opts" role="tablist" aria-label="Objetivos">
              {PRODUTOS_CUBO.map((x, i) => (
                <button key={x.id} type="button" role="tab" aria-selected={i === ativo} className={i === ativo ? "is-on" : ""} onClick={() => setAtivo(i)}>
                  <Icone nome={x.icone} size={15} />{x.objetivo}
                </button>
              ))}
            </div>
            <a className="hm__answer" href={p.href} key={p.id}>
              <span><strong>{p.nome}</strong><small>{p.objetivoTexto}</small></span>
              <i aria-hidden="true"><Icone nome="seta" size={16} /></i>
            </a>
          </div>
        </div>
      </section>

      <section className="hm-strip" aria-label="Cidades atendidas">
        <div className="container hm-strip__inner">
          <p>Tecnologia presente na gestão de cidades como</p>
          <ul>{CIDADES.map(([c, uf]) => <li key={c}>{c}<small>{uf}</small></li>)}</ul>
        </div>
      </section>
    </>
  );
}
