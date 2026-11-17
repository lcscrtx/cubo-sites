import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout.jsx";
import Icone from "../../ds/Icone.jsx";
import { useInView } from "../../ds/motion.js";
import { CONTATO } from "../../ds/contato.js";
import { Pendencias } from "../cidade-conectada/pages/partes.jsx";
import { MapaNordeste } from "./Sobre.jsx";
import { Topo, Cabeca } from "./paginas/partes.jsx";
import "./cubo.css";

// Contato, com o texto do documento de conteúdo (conteudo-site-cubo-tecnologia.md): formulário, canais e endereço.
// O site ainda não tem servidor para receber o formulário: ao enviar, ele abre o e-mail de quem preenche
// com a mensagem pronta para comercial@. Quando houver um endpoint, troque só a função enviar().

const ASSUNTOS = ["Conhecer as soluções", "Digitalizar serviços e processos", "Integrações e necessidades técnicas", "Parcerias", "Imprensa", "Outro assunto"];

const CAMPOS = [
  { id: "nome", rotulo: "Nome completo", obrig: true, ph: "Como você gostaria de ser chamado?", erro: "Informe seu nome." },
  { id: "email", rotulo: "E-mail profissional", obrig: true, tipo: "email", ph: "Ex.: nome@organizacao.gov.br", erro: "Informe um e-mail para retorno." },
  { id: "telefone", rotulo: "Telefone ou WhatsApp", tipo: "tel", ph: "Ex.: (83) 99999-9999", apoio: "Inclua o DDD." },
  { id: "orgao", rotulo: "Órgão ou organização", obrig: true, ph: "Ex.: Prefeitura de João Pessoa", erro: "Informe o nome do órgão ou da organização." },
  { id: "cargo", rotulo: "Cargo ou área", ph: "Ex.: Secretaria de Administração, TI ou Parcerias" },
  { id: "municipio", rotulo: "Município e UF", obrig: true, ph: "Ex.: João Pessoa – PB", erro: "Informe o município e a UF da sua organização." },
];

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(v) {
  const e = {};
  for (const c of CAMPOS) if (c.obrig && !v[c.id]?.trim()) e[c.id] = c.erro;
  if (!e.email && !EMAIL_OK.test(v.email.trim())) e.email = "Confira o e-mail. Exemplo: nome@organizacao.gov.br.";
  if (v.telefone.trim() && v.telefone.replace(/\D/g, "").length < 10) e.telefone = "Confira o número e inclua o DDD.";
  if (!v.assunto) e.assunto = "Selecione o assunto da sua mensagem.";
  if (!v.mensagem.trim()) e.mensagem = "Descreva o assunto que deseja conversar com a Cubo.";
  return e;
}

function enviar(v) {
  const corpo = [
    `Nome: ${v.nome}`,
    `E-mail: ${v.email}`,
    v.telefone ? `Telefone: ${v.telefone}` : null,
    `Órgão: ${v.orgao}`,
    v.cargo ? `Cargo ou área: ${v.cargo}` : null,
    `Município: ${v.municipio}`,
    "",
    v.mensagem,
  ].filter((l) => l !== null).join("\n");
  window.location.href = `mailto:${CONTATO.email}?subject=${encodeURIComponent(`${v.assunto} · ${v.orgao}`)}&body=${encodeURIComponent(corpo)}`;
}

function Formulario() {
  const vazio = { nome: "", email: "", telefone: "", orgao: "", cargo: "", municipio: "", assunto: "", mensagem: "" };
  const [v, setV] = useState(vazio);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);
  const muda = (id) => (ev) => {
    setV((x) => ({ ...x, [id]: ev.target.value }));
    if (erros[id]) setErros((x) => ({ ...x, [id]: undefined }));
  };

  const submeter = (ev) => {
    ev.preventDefault();
    const e = validar(v);
    setErros(e);
    if (Object.keys(e).length) {
      ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    enviar(v);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="co-form co-form--ok" role="status">
        <span className="co-ok"><Icone nome="check" size={22} /></span>
        <h3>Mensagem pronta para envio.</h3>
        <p>Abrimos o seu e-mail com a mensagem preenchida para {CONTATO.email}. É só enviar por lá. A equipe da Cubo retorna pelo e-mail informado.</p>
        <p>Se o e-mail não abriu, fale pelo <a href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp {CONTATO.whatsapp.numero}</a>.</p>
        <button type="button" className="pg-btn" onClick={() => { setV(vazio); setEnviado(false); }}>Escrever outra mensagem</button>
      </div>
    );
  }

  const temErro = Object.values(erros).some(Boolean);
  return (
    <form className="co-form" noValidate onSubmit={submeter}>
      {temErro && <p className="co-form__alerta" role="alert">Revise os campos indicados para enviar sua mensagem.</p>}
      <div className="co-grid">
        {CAMPOS.map((c) => (
          <label key={c.id} className={`co-campo ${erros[c.id] ? "is-erro" : ""}`}>
            <span>{c.rotulo}{c.obrig ? <b aria-hidden="true"> *</b> : <i> (opcional)</i>}</span>
            <input
              name={c.id}
              type={c.tipo ?? "text"}
              value={v[c.id]}
              onChange={muda(c.id)}
              placeholder={c.ph}
              required={c.obrig}
              aria-invalid={!!erros[c.id]}
              autoComplete={{ nome: "name", email: "email", telefone: "tel", orgao: "organization", cargo: "organization-title" }[c.id]}
            />
            {erros[c.id] ? <small className="co-erro">{erros[c.id]}</small> : c.apoio && <small>{c.apoio}</small>}
          </label>
        ))}
        <label className={`co-campo co-campo--cheio ${erros.assunto ? "is-erro" : ""}`}>
          <span>Assunto<b aria-hidden="true"> *</b></span>
          <select name="assunto" value={v.assunto} onChange={muda("assunto")} required aria-invalid={!!erros.assunto}>
            <option value="" disabled>Selecione o assunto</option>
            {ASSUNTOS.map((a) => <option key={a}>{a}</option>)}
          </select>
          {erros.assunto && <small className="co-erro">{erros.assunto}</small>}
        </label>
        <label className={`co-campo co-campo--cheio ${erros.mensagem ? "is-erro" : ""}`}>
          <span>O que sua organização precisa resolver?<b aria-hidden="true"> *</b></span>
          <textarea name="mensagem" rows="5" value={v.mensagem} onChange={muda("mensagem")} placeholder="Conte o desafio, os serviços envolvidos e o que você espera melhorar." required aria-invalid={!!erros.mensagem} />
          {erros.mensagem ? <small className="co-erro">{erros.mensagem}</small> : <small>Não inclua senhas, documentos pessoais ou informações sensíveis de cidadãos.</small>}
        </label>
      </div>
      <div className="co-form__pe">
        <button type="submit" className="st__btn">Enviar mensagem</button>
        <p>Seus dados são usados para tratar esta solicitação e permitir nosso retorno. <span className="ph">Link da Política de Privacidade</span></p>
      </div>
    </form>
  );
}

function Canais() {
  const itens = [
    { ic: "chat", t: "E-mail comercial", v: CONTATO.email, href: `mailto:${CONTATO.email}` },
    { ic: "chat", t: "WhatsApp", v: CONTATO.whatsapp.numero, href: CONTATO.whatsapp.href, fora: true },
    ...CONTATO.redes.map((r) => ({ ic: "megafone", t: r.label, v: r.label === "Instagram" ? "@cubotecnologiabr" : "/company/cubo-tecnologia-br", href: r.href, fora: true })),
  ];
  return (
    <aside className="co-canais">
      <span className="sb-selo">Fale com a Cubo</span>
      <h2>Escolha como começar a conversa.</h2>
      <p>Nossa equipe recebe contatos de gestores, equipes técnicas, parceiros e imprensa.</p>
      <ul>
        {itens.map((x) => (
          <li key={x.t}>
            <a href={x.href} {...(x.fora ? { target: "_blank", rel: "noreferrer" } : {})}>
              <span className="sp__ico"><Icone nome={x.ic} size={16} /></span>
              <span><small>{x.t}</small><strong>{x.v}</strong></span>
              <Icone nome="seta" size={14} />
            </a>
          </li>
        ))}
      </ul>
      <p className="co-canais__hora">Horário de atendimento: <span className="ph">A confirmar</span></p>
      <p className="co-canais__vagas">Quer trabalhar na Cubo? <Link to="/carreiras">Conheça as oportunidades</Link>.</p>
    </aside>
  );
}

function Endereco() {
  const [ref, on] = useInView({ threshold: 0.25 });
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Duo Corporate Towers, R. Empresário Clovis Rolim, 2051, João Pessoa - PB")}`;
  return (
    <section ref={ref} className={`sp js-reveal ${on ? "is-in" : ""}`}>
      <div className="container sp__inner">
        <div className="reveal">
          <span className="sb-selo">Nossa sede</span>
          <h2>Nossa casa fica em João Pessoa.</h2>
          <address className="co-end">
            <strong>Cubo Tecnologia</strong>
            {CONTATO.endereco.map((l) => <span key={l}>{l}</span>)}
          </address>
          <div className="pg-acoes">
            <a className="st__btn" href={mapa} target="_blank" rel="noreferrer">Ver no mapa</a>
          </div>
          <Pendencias itens={["Condições de atendimento presencial e agendamento de visitas"]} />
        </div>
        <div className="sp__mapa reveal" style={{ "--rd": "120ms" }}><MapaNordeste /></div>
      </div>
    </section>
  );
}

export default function Contato() {
  const [ref, on] = useInView({ threshold: 0.1 });
  return (
    <Layout titulo="Contato">
      <Topo
        selo="Vamos conversar"
        titulo="O próximo passo da sua gestão começa com uma conversa."
        texto="Quer conhecer nossas soluções, avaliar uma necessidade do seu órgão ou propor uma parceria? Conte um pouco do contexto e nossa equipe orienta a conversa a partir das prioridades da sua organização."
        acoes={<>
          <a className="st__btn" href="#formulario">Agendar uma conversa</a>
          <a className="pg-btn" href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer"><Icone nome="chat" size={15} />WhatsApp</a>
        </>}
      />
      <section ref={ref} id="formulario" className={`co js-reveal ${on ? "is-in" : ""}`}>
        <div className="container co__inner">
          <div className="reveal">
            <Cabeca selo="Seu próximo passo" titulo="Como podemos ajudar sua organização?" />
            <Formulario />
          </div>
          <div className="reveal" style={{ "--rd": "120ms" }}><Canais /></div>
        </div>
      </section>
      <Endereco />
    </Layout>
  );
}
