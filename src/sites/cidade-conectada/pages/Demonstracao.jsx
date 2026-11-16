import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE, Brand } from "../Layout.jsx";
import Icone from "../../../ds/Icone.jsx";
import { CONTATO } from "../../../ds/contato.js";
import { PRODUTOS } from "../data/produtos.js";
import "../Layout.css";
import "./pages.css";
import "./internas.css";

// Agendar demonstração (quadro "Cidade Conectada · Agendar demonstração").
// Página de conversão com menu reduzido. Sem backend por enquanto: ao enviar, abre o e-mail
// comercial da Cubo já preenchido. Produtos escolhidos em outras páginas chegam por ?produtos=.

const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const CARGOS = ["Prefeito(a)", "Secretário(a)", "Servidor(a)", "TI", "Compras e licitações", "Outro"];
const AREAS = ["Saúde", "Infraestrutura", "Meio Ambiente", "Administração", "Outra"];
const CIDADES = ["João Pessoa", "Campina Grande", "Cabedelo", "Feira de Santana"];

export default function Demonstracao() {
  const [params] = useSearchParams();
  const vindos = (params.get("produtos") || "").split(",").filter(Boolean);
  const inicial = vindos.includes("completa") || vindos.length > 1 ? "Solução completa" : PRODUTOS.find((p) => p.slug === vindos[0])?.curto || "";
  const escolhidos = useMemo(() => PRODUTOS.filter((p) => vindos.includes(p.slug)), [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const [f, setF] = useState({ nome: "", email: "", fone: "", cargo: "", uf: "", cidade: "", busca: inicial, area: "", msg: "" });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setF((a) => ({ ...a, [k]: e.target.value }));

  useEffect(() => {
    document.title = "Agendar demonstração · Cidade Conectada";
    window.scrollTo(0, 0);
  }, []);

  const enviar = (e) => {
    e.preventDefault();
    const corpo = [
      `Nome: ${f.nome}`, `E-mail: ${f.email}`, `Telefone/WhatsApp: ${f.fone}`, `Cargo: ${f.cargo}`,
      `Cidade: ${f.cidade} - ${f.uf}`, `O que busca: ${f.busca || "Não informado"}`,
      escolhidos.length > 1 ? `Produtos selecionados no site: ${escolhidos.map((p) => p.curto).join(", ")}` : null,
      `Secretaria ou área: ${f.area || "Não informada"}`, "", f.msg,
    ].filter((l) => l !== null).join("\n");
    window.location.href = `mailto:${CONTATO.email}?subject=${encodeURIComponent(`Demonstração Cidade Conectada · ${f.cidade}-${f.uf}`)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
  };

  return (
    <div data-site="cidade-conectada" className="dm">
      <header className="dm-top">
        <div className="container dm-top__row">
          <Brand />
          <Link className="pg-back" to={BASE}><Icone nome="seta" size={14} className="pg-back__ico" /> Voltar ao site</Link>
        </div>
      </header>

      <main className="container dm-body">
        <div className="dm-copy">
          <h1>Veja o Cidade Conectada funcionando na prática</h1>
          <p className="pg-hero__lead">Conte um pouco sobre sua prefeitura. Um especialista prepara a demonstração de acordo com as prioridades da sua cidade.</p>

          <h2>Como funciona</h2>
          <ol className="dm-steps">
            <li><span>1</span>Você envia seus dados.</li>
            <li><span>2</span>Um especialista retorna em <span className="ph">[prazo]</span>.</li>
            <li><span>3</span>Vocês definem os produtos prioritários.</li>
          </ol>

          {escolhidos.length > 0 && (
            <div className="dm-picked">
              <span>Você selecionou</span>
              <ul>{escolhidos.map((p) => <li key={p.slug}><Icone nome={p.icone} size={14} />{p.curto}</li>)}</ul>
            </div>
          )}

          <div className="dm-cities">
            <span>Cidades que já se conectaram</span>
            <ul>{CIDADES.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>

        <div className="dm-card">
          {enviado ? (
            <div className="dm-done" role="status">
              <span className="dm-done__ico"><Icone nome="os" size={28} /></span>
              <h2>Pedido pronto para envio</h2>
              <p>Abrimos o seu e-mail com os dados preenchidos para <strong>{CONTATO.email}</strong>. É só enviar.</p>
              <p className="dm-alt">Se o e-mail não abriu, fale pelo <a href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp {CONTATO.whatsapp.numero}</a>.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setEnviado(false)}>Editar dados</button>
            </div>
          ) : (
            <form onSubmit={enviar} className="dm-form">
              <h2>Agendar demonstração</h2>
              <label className="dm-f dm-f--full"><span>Nome*</span><input required value={f.nome} onChange={set("nome")} autoComplete="name" /></label>
              <label className="dm-f"><span>E-mail institucional*</span><input required type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
              <label className="dm-f"><span>Telefone ou WhatsApp*</span><input required type="tel" value={f.fone} onChange={set("fone")} autoComplete="tel" /></label>
              <label className="dm-f dm-f--full"><span>Cargo*</span>
                <select required value={f.cargo} onChange={set("cargo")}><option value="">Selecione</option>{CARGOS.map((c) => <option key={c}>{c}</option>)}</select>
              </label>
              <label className="dm-f dm-f--uf"><span>UF*</span>
                <select required value={f.uf} onChange={set("uf")}><option value="">UF</option>{UFS.map((u) => <option key={u}>{u}</option>)}</select>
              </label>
              <label className="dm-f dm-f--city"><span>Cidade*</span>
                <input required value={f.cidade} onChange={set("cidade")} disabled={!f.uf} placeholder={f.uf ? "Nome da cidade" : "Selecione a UF primeiro"} />
              </label>
              <label className="dm-f"><span>O que você busca?</span>
                <select value={f.busca} onChange={set("busca")}>
                  <option value="">Selecione</option>
                  <option>Solução completa</option>
                  {PRODUTOS.map((p) => <option key={p.slug}>{p.curto}</option>)}
                  <option>Ainda não sei</option>
                </select>
              </label>
              <label className="dm-f"><span>Secretaria ou área</span>
                <select value={f.area} onChange={set("area")}><option value="">Selecione</option>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
              </label>
              <label className="dm-f dm-f--full"><span>Mensagem</span><textarea rows={3} value={f.msg} onChange={set("msg")} /></label>
              <button type="submit" className="btn btn--primary dm-submit">Solicitar demonstração</button>
              <p className="dm-legal">Ao enviar, você concorda com a <a href="#privacidade">Política de Privacidade</a>.</p>
            </form>
          )}
        </div>
      </main>

      <section className="container dm-channels">
        <div><Icone nome="chat" /><div><strong>WhatsApp comercial</strong><a href={CONTATO.whatsapp.href} target="_blank" rel="noreferrer">{CONTATO.whatsapp.numero}</a></div></div>
        <div><Icone nome="blog" /><div><strong>E-mail</strong><a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></div></div>
        <div><Icone nome="predio" /><div><strong>Endereço</strong><span>{CONTATO.endereco.slice(0, 3).join(", ")}</span></div></div>
      </section>
    </div>
  );
}
